import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  async function handleAnalyze(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/analyze", { text });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (result) {
      const history = JSON.parse(localStorage.getItem("moodHistory") || "[]");
      history.push({ text, ...result, timestamp: Date.now() });
      localStorage.setItem("moodHistory", JSON.stringify(history));
    }
  }, [result]);

  return (
    <div className="container">
      <h1>Mood Check-in</h1>
      <form onSubmit={handleAnalyze}>
        <textarea
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How are you feeling today?"
        />
        <button type="submit">Analyze Mood</button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Emotion Detected:</strong> {result.emotion}</p>
          <p><strong>Exercise:</strong> {result.recommendations.exercise}</p>
          <p><strong>Journaling Prompt:</strong> {result.recommendations.prompt}</p>
        </div>
      )}

      <button
        onClick={() => alert(localStorage.getItem("moodHistory"))}
        style={{ marginTop: "10px", backgroundColor: "transparent", color: "blue", textDecoration: "underline", padding: 0, border: "none", cursor: "pointer" }}
      >
        View Mood History
      </button>
    </div>
  );
}

export default App;
