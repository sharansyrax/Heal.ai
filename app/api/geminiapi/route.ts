import { GoogleGenerativeAI, GenerationConfig } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { InputPrompt }: { InputPrompt: string } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig: GenerationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({ generationConfig });

    const result = await chatSession.sendMessage(InputPrompt);
    const text = await result.response.text();

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Error in Gemini API route:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
