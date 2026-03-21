import React, { useState } from "react";
import './MoodForm.css';
export default function MoodForm({ onAnalyze }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    onAnalyze(text);

    // Clear textbox after analyze
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mood-form">
      <textarea
      className="MoodTextArea"
        placeholder="How are you feeling today?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit" className="analyze-btn">
        Analyze Mood
      </button>
    </form>
  );
}
