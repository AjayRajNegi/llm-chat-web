"use client";

import { useState } from "react";

export default function Model() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setReply("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    setReply(data.reply); // ← show in UI
    setLoading(false);
  };

  return (
    <>
      <h3>Model</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          placeholder="Enter prompt..."
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {loading && <p>Loading...</p>}
        {reply && (
          <p>
            <strong>Response:</strong> {reply}
          </p>
        )}
      </div>
    </>
  );
}
