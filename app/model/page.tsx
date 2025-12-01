"use client";

import { useState } from "react";

export default function Model() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setReply("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt }),
    });

    const data = await res.json();
    console.log(reply);

    setReply(data.reply);
    setLoading(false);
  };

  return (
    <main className="p-10 text-center">
      <form onSubmit={handleSubmit}>
        <h3>Set local model:</h3>
        <input
          className="my-5 border-white border rounded-md p-2"
          type="text"
          value={model}
          placeholder="Enter model..."
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          className="my-5 border-white border rounded-md p-2"
          type="text"
          value={prompt}
          placeholder="Enter prompt..."
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          type="submit"
          className="bg-neutral-600 border border-neutral-600 ml-2 rounded-md p-2"
        >
          Send
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {loading && <p>Loading...</p>}
        {reply && (
          <p>
            <strong>Response:</strong> {reply}
          </p>
        )}
      </div>
    </main>
  );
}
