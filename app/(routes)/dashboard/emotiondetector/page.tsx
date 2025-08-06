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



const Page = () => {
  const [emotion, setEmotion] = useState<string>("neutral");
  const [thought, setThought] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState<
    { emotion: string; thought: string; response: string }[]
  >([]);
  const [step, setStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const clearAll = () => {
    setEmotion("neutral");
    setThought("");
    setResponse("");
    setLoading(false);
    setSubmitted(false);
    setStep(0);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const savemood = async () => {
    await fetch("/api/moodsave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emotion, thought, response }),
    });
    setHistory((prev) => [...prev, { emotion, thought, response }]);
  };

  const onSubmit = async () => {
    if (!thought.trim()) return;
    setLoading(true);
    setResponse("");

    const InputPrompt = `
The user is currently feeling "${emotion}" and has shared: "${thought}".
Craft a short, uplifting response in under 100 words with empathy.
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
    nextStep();
  };

  return (
    <div>
      {/* Background based on emotion */}
     

      {/* Slide Container */}
      <div className="overflow-hidden w-full max-w-4xl mx-auto mt-10 px-4">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${step * 100}%)` }}
        >
          {/* STEP 1: Detect Emotion */}
          <div className="min-w-full flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold text-purple-800">
              Detect Your Emotion
            </h1>
            <EmotionDetector emotion={emotion} setEmotion={setEmotion} />
            <Button onClick={nextStep} className="bg-purple-600 text-white">
              Next ➡
            </Button>
          </div>

          {/* STEP 2: Share Thoughts */}
          <div className="min-w-full flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold text-purple-800">
              Share Your Thoughts
            </h1>
            <textarea
              className="p-4 text-purple-800 placeholder-purple-400 bg-white border-2 border-purple-400 h-64 w-full max-w-md rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="What's on your mind?"
              onChange={(e) => setThought(e.target.value)}
              value={thought}
            />
            <div className="flex gap-2">
              <Button onClick={prevStep} variant="secondary">
                ⬅ Back
              </Button>
              <Button
                onClick={onSubmit}
                className="bg-purple-600 text-white"
                disabled={loading || !thought.trim()}
              >
                {loading ? "Thinking..." : "Next ➡"}
              </Button>
            </div>
          </div>

          {/* STEP 3: AI Response */}
          <div className="min-w-full flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold text-purple-800">
              Here's something for you:
            </h1>
            {response && (
              <p className="bg-white p-4 rounded-xl shadow-lg max-w-md text-purple-800 text-center">
                <Typewriter
                  words={[response]}
                  loop={1}
                  cursor={true}
                  typeSpeed={20}
                />
              </p>
            )}
            <div className="flex gap-2">
              <Button onClick={prevStep} variant="secondary">
                ⬅ Back
              </Button>
              <Button
                onClick={savemood}
                className="bg-green-500 text-white"
                disabled={!response}
              >
                Save
              </Button>
              <Button onClick={nextStep} className="bg-purple-600 text-white">
                Next ➡
              </Button>
            </div>
          </div>

          {/* STEP 4: History */}
          <div className="min-w-full flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold text-purple-800">History</h1>
            {history.length === 0 ? (
              <p className="text-gray-600">No history yet.</p>
            ) : (
              <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-lg space-y-3">
                {history.map((item, idx) => (
                  <div key={idx} className="border-b pb-2">
                    <p className="font-semibold">
                      {emojiMap[item.emotion]} {item.emotion}
                    </p>
                    <p className="text-sm italic">"{item.thought}"</p>
                    <p className="text-purple-700">{item.response}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={prevStep} variant="secondary">
                ⬅ Back
              </Button>
              <Button onClick={clearAll} className="bg-gray-300">
                Start Over
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
