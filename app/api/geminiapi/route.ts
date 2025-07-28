// app/api/gemini/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    "HTTP-Referer": "https://your-site-url.com", // replace with your actual site
    "X-Title": "Heal.ai", // replace with your app name
  },
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { InputPrompt }: { InputPrompt: string } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-lite",
      messages: [
        {
          role: "user",
          content: InputPrompt,
        },
      ],
      temperature: 1,
      top_p: 0.95,
      // top_k: 64,
      max_tokens: 8192,
    });

    const responseText = completion.choices[0]?.message?.content || "No response";

    return NextResponse.json({ result: responseText });
  } catch (error) {
    console.error("Error in Gemini API route:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
