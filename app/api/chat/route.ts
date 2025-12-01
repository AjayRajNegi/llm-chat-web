// app/api/chat/route.js
import { NextRequest } from "next/server";
import ollama from "ollama";

export async function POST(req: NextRequest) {
  const { model, prompt } = await req.json();

  const response = await ollama.chat({
    model: `${model}`,
    messages: [{ role: "user", content: prompt }],
  });

  console.log(response);

  return Response.json({ reply: response.message.content });
}
