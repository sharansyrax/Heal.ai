"use client";
import React, { useEffect, useRef, useState } from "react";
import EmotionDetector from "../_components/MoodDetector";
import { Typewriter } from "react-simple-typewriter";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  RefreshCw,
  Save,
} from "lucide-react";

// Map emotion to emoji and background gradients
const emojiMap: Record<string, string> = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  surprised: "😲",
  disgusted: "🤢",
  neutral: "😐",
};

const bgMap: Record<string, string> = {
  happy: "from-yellow-100 via-orange-100 to-rose-100",
  sad: "from-blue-50 via-indigo-50 to-purple-50",
  angry: "from-red-50 via-amber-50 to-yellow-50",
  surprised: "from-fuchsia-50 via-pink-50 to-purple-50",
  disgusted: "from-green-50 via-emerald-50 to-slate-50",
  neutral: "from-white via-slate-50 to-purple-50",
};

// Small helper button (now accepts className for responsive layout)
function UIButton({
  children,
  onClick,
  disabled,
  variant = "primary",
  type = "button",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "success" | "muted";
  type?: "button" | "submit";
  className?: string;
}) {
  const variants: Record<string, string> = {
    primary:
      "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-400",
    secondary:
      "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50",
    ghost: "bg-transparent text-purple-700 hover:bg-purple-50",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-400",
    muted: "bg-slate-100 text-slate-700 hover:bg-slate-200",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default function Page() {
  const [emotion, setEmotion] = useState<string>("neutral");
  const [thought, setThought] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const [history, setHistory] = useState<
    { emotion: string; thought: string; response: string }[]
  >([]);
  const [pasthistory, setPastHistory] = useState<
    { emotion: string; thought: string; response: string;created_at:Date; }[]
  >([]);
  const [step, setStep] = useState(0); // 0..3
  const containerRef = useRef<HTMLDivElement | null>(null);

  const nextStep = () => setStep((p) => Math.min(p + 1, 3));
  const prevStep = () => setStep((p) => Math.max(p - 1, 0));

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextStep();
      if (e.key === "ArrowLeft") prevStep();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const clearAll = () => {
    setEmotion("neutral");
    setThought("");
    setResponse("");
    setLoading(false);
    setSavedTick(false);
    setStep(0);
  };

  const [saving, setSaving] = useState(false); // optional: to disable Save while posting

const savemood = async () => {
  try {
    if (!response) return; // guard
    setSaving(true);

    // 1) Save the current entry
    const postRes = await fetch("/api/moodsave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emotion, thought, response }),
    });
    if (!postRes.ok) {
      const err = await postRes.json().catch(() => ({}));
      throw new Error(err?.error || "Failed to save mood");
    }

    // 2) Refresh history from server (use your actual GET route)
    const res = await fetch("/api/moodsave/getmoodofuser?limit=20", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch history");
    const data = await res.json();

    // 3) Update states
    setHistory((prev) => [...prev, { emotion, thought, response }]); // local session list (optional)
    setPastHistory(data.data || []); // <-- make sure your type uses createdAt: string

    // 4) UX tick
    setSavedTick(true);
    setTimeout(() => setSavedTick(false), 1600);
  } catch (e) {
    console.error(e);
  } finally {
    setSaving(false);
  }
};


  const onSubmit = async () => {
    if (!thought.trim()) return;
    setLoading(true);
    setResponse("");
const InputPrompt = `
Role: You are a kind, upbeat micro-coach. Do not say you're an AI.

Emotion: "${emotion}"
Note: "${thought}"

OUTPUT FORMAT (strict — EXACTLY 5 separate paras lines, each on a new line):
• Empathy + light reframe (≤18 words, max 2 emoji).
• Tiny action (20–30s) tailored to the emotion (imperative voice).
• One simple psych fact tied to the emotion (plain language, no citations).
• One 1-line hook question inviting a quick reply and say what you would do.

Rules:
- <90 words total. Warm, conversational, non-clinical. Vary phrasing each time.
- Use at most 1–2 emojis across the whole reply.
- If crisis or self-harm intent appears, skip bullets and give a brief, caring message urging immediate help from trusted people or local services.
`;

    try {
      const res = await fetch("/api/geminiapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ InputPrompt }),
      });
      const data = await res.json();
      setResponse(data.result || "I'm here for you.");
      setLoading(false);
      nextStep();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const steps = [
    { title: "Detect", subtitle: "Capture your current mood" },
    { title: "Reflect", subtitle: "Write what's on your mind" },
    { title: "Support", subtitle: "Get a gentle AI note" },
    { title: "History", subtitle: "Your saved moments" },
  ];

  return (
    <div
      className={`min-h-[100dvh] w-full bg-gradient-to-br ${bgMap[emotion]} transition-colors`}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/40 bg-white/60 border-b border-purple-100">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-8 sm:h-9 sm:w-9 grid place-items-center rounded-xl bg-purple-600 text-white text-base sm:text-lg">
              {emojiMap[emotion]}
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-semibold text-purple-900 leading-tight">
                Heal AI
              </h1>
              <p className="text-[10px] sm:text-xs text-purple-600/80">Emotion Journal</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <UIButton variant="muted" onClick={clearAll} className="w-auto">
              <RefreshCw className="h-4 w-4" /> Reset
            </UIButton>
          </div>
        </div>
      </header>

      {/* Stepper */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6">
        <ol className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {steps.map((s, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <li
                key={s.title}
                className={`rounded-xl sm:rounded-2xl border p-2 sm:p-3 transition shadow-sm ${
                  active
                    ? "border-purple-300 bg-white"
                    : done
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-white/70"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`h-5 w-5 sm:h-6 sm:w-6 grid place-items-center rounded-full text-[10px] sm:text-xs font-semibold ${
                      active
                        ? "bg-purple-600 text-white"
                        : done
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {done ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : i + 1}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-slate-900">{s.title}</p>
                    <p className="text-[10px] sm:text-xs text-slate-500">{s.subtitle}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Slider */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 mt-4 sm:mt-6">
        <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur border border-purple-100 shadow-lg">
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${step * 100}%)` }}
          >
            {/* STEP 1: Detect Emotion */}
            <section className="min-w-full p-4 sm:p-6 lg:p-10 grid place-items-center">
              <div className="w-full max-w-xl text-center space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-purple-900">Detect your emotion</h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Let the camera or your selection help set the mood.
                </p>
                <div className="rounded-xl sm:rounded-2xl border bg-white shadow-sm p-3 sm:p-4">
                  <EmotionDetector emotion={emotion} setEmotion={setEmotion} />
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3">
                  <UIButton variant="secondary" disabled className="w-full sm:w-auto">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </UIButton>
                  <UIButton onClick={nextStep} className="w-full sm:w-auto">
                    Next <ArrowRight className="h-4 w-4" />
                  </UIButton>
                </div>
              </div>
            </section>

            {/* STEP 2: Share Thoughts */}
            <section className="min-w-full p-4 sm:p-6 lg:p-10 grid place-items-center">
              <div className="w-full max-w-xl space-y-3 sm:space-y-4 text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-purple-900">Share your thoughts</h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  A few lines are enough. This is your private space.
                </p>
                <textarea
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  placeholder="What's on your mind today?"
                  className="h-36 sm:h-40 md:h-48 w-full rounded-2xl border-2 border-purple-200 bg-white p-3 sm:p-4 text-slate-900 placeholder-slate-400 shadow-inner focus:outline-none focus:ring-4 focus:ring-purple-200"
                />
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3">
                  <UIButton variant="secondary" onClick={prevStep} className="w-full sm:w-auto">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </UIButton>
                  <UIButton onClick={onSubmit} disabled={loading || !thought.trim()} className="w-full sm:w-auto">
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Thinking
                      </>
                    ) : (
                      <>
                        Next <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </UIButton>
                </div>
              </div>
            </section>

            {/* STEP 3: AI Response */}
            <section className="min-w-full p-4 sm:p-6 lg:p-10 grid place-items-center">
              <div className="w-full max-w-xl space-y-4 sm:space-y-6 text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-purple-900">A note for you</h2>
                <div className="rounded-2xl border bg-white p-4 sm:p-5 shadow-sm min-h-24 sm:min-h-28 grid place-items-center">
                  {response ? (
                    <p className="text-purple-900 leading-relaxed whitespace-pre-line" aria-live="polite">
                      <Typewriter words={[response]} loop={1} cursor typeSpeed={20} />
                    </p>
                  ) : (
                    <p className="text-slate-500 text-xs sm:text-sm">No response yet.</p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 flex-wrap">
                  <UIButton variant="secondary" onClick={prevStep} className="w-full sm:w-auto">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </UIButton>
                  <UIButton variant="success" onClick={savemood} disabled={!response} className="w-full sm:w-auto">
                    <Save className="h-4 w-4" /> Save
                  </UIButton>
                  <UIButton onClick={nextStep} disabled={!response} className="w-full sm:w-auto">
                    Next <ArrowRight className="h-4 w-4" />
                  </UIButton>
                  {savedTick && (
                    <span className="inline-flex items-center justify-center gap-1 text-emerald-700 text-sm">
                      <Check className="h-4 w-4" /> Saved
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* STEP 4: History */}
            <section className="min-w-full p-4 sm:p-6 lg:p-10">
              <div className="mx-auto w-full max-w-3xl">
                <h2 className="text-xl sm:text-2xl font-bold text-purple-900 text-center">History</h2>
                {pasthistory.length === 0 ? (
                  <p className="mt-3 sm:mt-4 text-center text-slate-600">No entries yet.</p>
                ) : (
                  <ul className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                    {pasthistory.map((item, idx) => (
                      <li
                        key={idx}
                        className="rounded-2xl border border-purple-100 bg-white p-3 sm:p-4 shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-base sm:text-lg">
                            {emojiMap[item.emotion]} {item.emotion}
                          </div>
                          <time className="text-[10px] sm:text-xs text-slate-500">
                           {item.created_at
                                ? new Date(item.created_at).toLocaleString([], {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : ""}
                          </time>
                        </div>
                        <p className="mt-2 text-xs sm:text-sm italic text-slate-700">“{item.thought}”</p>
                        <p className="mt-2 text-xs sm:text-sm text-purple-800">{item.response}</p>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3">
                  <UIButton variant="secondary" onClick={prevStep} className="w-full sm:w-auto">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </UIButton>
                  <UIButton variant="muted" onClick={clearAll} className="w-full sm:w-auto">
                    <RefreshCw className="h-4 w-4" /> Start Over
                  </UIButton>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Nav */}
        <div className="hidden sm:flex items-center justify-between py-6 text-xs text-slate-500">
          <span>
            Tip: Use <kbd className="px-1 py-0.5 rounded border bg-white">←</kbd> /
            <kbd className="px-1 py-0.5 rounded border bg-white">→</kbd> to move
            between steps
          </span>
          <span>
            Current emotion: <b className="text-purple-900">{emotion}</b>
          </span>
        </div>
      </main>
    </div>
  );
}
