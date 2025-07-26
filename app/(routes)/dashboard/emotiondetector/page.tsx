"use client";
import React, { useRef, useState } from "react";
import EmotionDetector from "../_components/MoodDetector";
import { Button } from "@/components/ui/button";
import { Typewriter } from "react-simple-typewriter";

const emojiMap: Record<string, string> = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  surprised: "😲",
  disgusted: "🤢",
  neutral: "😐",
};

const moodColorMap: Record<string, string> = {
  happy: "from-yellow-200 to-orange-300",
  sad: "from-blue-200 to-purple-300",
  angry: "from-red-300 to-yellow-400",
  surprised: "from-pink-200 to-purple-200",
  fearful: "from-gray-300 to-blue-200",
  disgusted: "from-green-300 to-gray-100",
  neutral: "from-white to-purple-100",
};

const Page = () => {
  const [emotion, setEmotion] = useState<string>("neutral");
  const [response, setResponse] = useState<string>("");
  const [thought, setThought] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isCaptured, setIsCaptured] = useState<boolean>(false);
  const [cameraOn, setCameraOn] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!thought.trim()) return;
    setLoading(true);
    setResponse("");

    const InputPrompt = `
The user is currently feeling "${emotion}" and has shared the following thoughts: "${thought}".

Based on their emotional state and message, craft a thoughtful and uplifting response that includes either:
- a heartwarming fact,
- a gentle suggestion to improve their mood,
- or a light-hearted, clean joke.

Make sure the tone is friendly, empathetic, and human-like. Keep the response under 100 words and avoid sounding robotic.
`;

    const res = await fetch("/api/geminiapi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ InputPrompt }),
    });

    const data = await res.json();
    setResponse(data.result);
    setLoading(false);
    setSubmitted(true);


 

    
  };

  const clearAll = () => {
    setEmotion("neutral");
    setThought("");
    setResponse("");
    setLoading(false);
    setIsCaptured(false);
    setCameraOn(false);
    setSubmitted(false);
    setDisabled(false);
  };
const savemood=async()=>{
  await fetch("/api/moodsave", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              emotion,
              thought,
              response: response,
            }),
          });
}
  return (
    <div>
      <div
        className={`fixed inset-0 -z-10 w-full min-h-[100dvh] bg-gradient-to-b ${
          moodColorMap[emotion] || "from-white to-purple-100"
        } transition-all duration-700`}
      />

      <div className="px-6 py-8 max-w-7xl mx-auto">
        <h1 className="text-center text-3xl font-extrabold text-purple-800 mb-10">
          Let AI detect your mood and uplift you ✨
        </h1>

        <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
          <EmotionDetector
            emotion={emotion}
            setEmotion={setEmotion}
            cameraOn={cameraOn}
            setCameraOn={setCameraOn}
            isCaptured={isCaptured}
            setIsCaptured={setIsCaptured}
            disabled={disabled}
            setDisabled={setDisabled}
          />

          {!submitted && (
            <form
              onSubmit={onSubmit}
              className="bg-white bg-opacity-70 p-6 rounded-3xl shadow-lg w-[300px] md:w-[320px]"
            >
              <div className="flex flex-col gap-4 items-center">
                <div className="text-5xl animate-pulse">
                  {emojiMap[emotion]}
                </div>
                <textarea
                  className="p-4 text-purple-800 placeholder-purple-400 bg-white border-2 border-purple-400 h-64 w-full rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  placeholder="Type how you feel or what's on your mind..."
                  onChange={(e) => setThought(e.target.value)}
                  value={thought}
                  disabled={loading}
                ></textarea>
                <Button
                  type="submit"
                  className="bg-purple-600 text-white w-full disabled:opacity-50"
                  disabled={loading || !thought.trim()}
                >
                  {loading ? "Thinking..." : "Submit Emotion"}
                </Button>
                <Button
                  type="button"
                  className="w-full bg-gray-200 hover:bg-gray-300 text-purple-800"
                  onClick={clearAll}
                  disabled={loading && !response}
                >
                  Clear
                </Button>
              </div>
            </form>
          )}

          {response && (
            <div className="bg-white bg-opacity-80 p-6 rounded-3xl shadow-lg text-purple-800 max-w-md w-full backdrop-blur-md transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">
                Here's something for you:
              </h3>
              <p className="whitespace-pre-line leading-relaxed text-md">
                <Typewriter
                  words={[response]}
                  loop={1}
                  cursor={true}
                  typeSpeed={20}
                />
              </p>
              <div className="mt-4 flex justify-end">
                <Button className="bg-purple-500 text-white" onClick={clearAll}>
                  Try Again 🔁
                </Button>
                 <Button className="bg-purple-500 text-white" onClick={savemood}>
                  save               </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
 