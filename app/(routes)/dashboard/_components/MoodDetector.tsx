"use client"
import React, { useRef, useEffect, useState } from "react"
import * as faceapi from "face-api.js"
import { Button } from "@/components/ui/button"

type Props = {
  emotion: string;
  setEmotion: (value: string) => void;
};

const SelfieEmotionDetector = ({ emotion, setEmotion }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [cameraOn, setCameraOn] = useState(false)
  const [selfie, setSelfie] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ])
    }
    loadModels()
    return () => stopVideo()
  }, [])

  const startVideo = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setCameraOn(true)
        setEmotion("")
        setSelfie(null)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const stopVideo = (): void => {
    const stream = videoRef.current?.srcObject as MediaStream | null
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      if (videoRef.current) videoRef.current.srcObject = null
    }
    setCameraOn(false)
  }

  const captureSelfie = async () => {
    if (!videoRef.current || !canvasRef.current) return
    setLoading(true)

    const canvas = canvasRef.current
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const ctx = canvas.getContext("2d")
    ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

    const imageData = canvas.toDataURL("image/png")
    setSelfie(imageData)

    // Stop the video after capture
    stopVideo()

    // Detect emotion from the captured selfie
    const detections = await faceapi
      .detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()

    if (detections?.expressions) {
      const topExpression = Object.entries(detections.expressions).reduce(
        (a, b) => (a[1] > b[1] ? a : b)
      )[0]
      setEmotion(topExpression)
    } else {
      setEmotion("No face/emotion detected")
    }

    setLoading(false)
  }

  const retakeSelfie = () => {
    setSelfie(null)
    setEmotion("")
    startVideo()
  }

  return (
    <div className="flex flex-col items-center mt-8 gap-4">
      {/* Video or Selfie Display */}
      <div className="relative   md:w-[520px] md:h-[360px] rounded-xl overflow-hidden shadow " >
        {selfie ? (
          <img src={selfie} alt="Selfie" className="w-full h-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full"
          />
        )}
        {!cameraOn && !selfie && (
          <div className="absolute inset-0 flex justify-center items-center bg-white/70 text-black font-semibold text-lg rounded-xl">
            Camera is OFF
          </div>
        )}
      </div>

      {/* Hidden Canvas for Capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Buttons */}
      <div className="flex gap-3 mt-3 flex-wrap justify-center">
        {!cameraOn && !selfie && (
          <Button
            onClick={startVideo}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
          >
            Start Camera
          </Button>
        )}

        {cameraOn && (
          <>
            <Button
              onClick={captureSelfie}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              {loading ? "Processing..." : "Take Selfie"}
            </Button>

            <Button
              onClick={stopVideo}
              className="bg-purple-900 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
            >
              Turn Off Camera
            </Button>
          </>
        )}

        {selfie && (
          <Button
            onClick={retakeSelfie}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Retake Selfie
          </Button>
        )}
      </div>

      {/* Emotion Output */}
      {emotion && (
        <div className="text-xl font-semibold text-purple-700 mt-4">
          Detected Emotion: <span className="capitalize">{emotion}</span>
        </div>
      )}
    </div>
  )
}

export default SelfieEmotionDetector
