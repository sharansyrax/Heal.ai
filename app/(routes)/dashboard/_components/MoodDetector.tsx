"use client"
import React, { useRef, useEffect, useState } from "react"
import * as faceapi from "face-api.js"
import { Button } from "@/components/ui/button"
type Props = {
  emotion: string;
  setEmotion: (value: string) => void;
   isCaptured: boolean;
  setIsCaptured: (value: boolean) => void;
    cameraOn: boolean;
  setCameraOn: (value: boolean) => void;
  disabled: boolean;
  setDisabled: (value: boolean) => void;

};


const EmotionDetector=({emotion,setEmotion,isCaptured,setIsCaptured,cameraOn,setCameraOn,disabled,setDisabled}:Props)=> {
  const videoRef = useRef<HTMLVideoElement | null>(null)
 
 
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
        setIsCaptured(false)
        setEmotion("")
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
    setIsCaptured(false)
    setEmotion("")
  }

  const handleToggleCamera = (): void => {
    cameraOn ? stopVideo() : startVideo()
  }

  const handleCapture = async (): Promise<void> => {
    setDisabled(!disabled)
    const video = videoRef.current
    if (!video) return

    video.pause()
    setIsCaptured(true)

    const detections = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
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
  }

  const handleReset = (): void => {
    setEmotion("")
    setIsCaptured(false)
    videoRef.current?.play()
  }

  return (
    <div className="flex flex-col items-center mt-8 gap-4">
      {/* Video + Overlay */}
      <div className="relative w-[520px] h-[360px]">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full rounded-xl shadow z-10 relative"
        />
        {!cameraOn && (
          <div className="absolute -z-10 top-0 left-0 w-full h-full pointer-events-none flex justify-center items-center bg-white/60 text-black font-semibold text-lg rounded-xl">
            Camera is OFF
          </div>
        )}
      </div>

      {/* Camera Controls */}
      <div className="flex flex-row justify-center items-center gap-2">
            <Button onClick={handleToggleCamera}
            disabled={disabled}
            className="mt-2 bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">
        {cameraOn ? "Off Camera" : "Resume"}
      </Button>

      {cameraOn && !isCaptured && (
        <Button
          onClick={handleCapture}
          className="mt-2 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          Capture Emotion
        </Button>
      )}
 {cameraOn && isCaptured && (
        <Button
          onClick={handleReset}
          disabled={disabled}
          className="mt-2 bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          Resume Video
        </Button>
      )}

        
      </div>
    
     
      {/* Emotion Output */}
      {emotion && (
        <div className="text-xl font-semibold text-purple-700">
          Detected Emotion: <span className="capitalize">{emotion}</span>
        </div>
      )}
    </div>
  )
}
function setCameraOn(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setIsCaptured(arg0: boolean) {
  throw new Error("Function not implemented.");
}

export default EmotionDetector 