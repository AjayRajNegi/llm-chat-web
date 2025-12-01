// app/api/chat/route.js
import ollama from "ollama";

export async function POST(req) {
  const { prompt } = await req.json();

  const response = await ollama.chat({
    model: "llama3.1:8b",
    messages: [{ role: "user", content: prompt }],
  });

  return Response.json({ reply: response.message.content });
}
