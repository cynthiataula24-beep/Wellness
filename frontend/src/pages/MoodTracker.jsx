import React, { useState, useEffect } from "react";
import MoodForm from "../components/MoodForm";
import { Chart, registerables } from "chart.js";
import './MoodTracker.css';
Chart.register(...registerables);

export default function MoodTracker() {
  const [suggestions, setSuggestions] = useState(null);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("moodHistory")) || []);

  // Map emotion to a color
  const getEmotionColor = (emotion) => {
    switch (emotion) {
      case 'happy': return '#4ade80';
      case 'sad': return '#60a5fa';
      case 'angry': return '#f87171';
      case 'neutral': return '#a3a3a3';
      default: return '#d4d4d4';
    }
  };

  // Format date: "24 Nov" if current year, otherwise "24 Nov 2024"
  const formatMoodDate = (isoString) => {
    const now = new Date();
    const d = new Date(isoString);
    const day = d.getDate();
    const month = d.toLocaleString('default', { month: 'short' });
    const year = d.getFullYear();
    return year === now.getFullYear() ? `${day} ${month}` : `${day} ${month} ${year}`;
  };

  // Save mood to history
  const saveToHistory = (entry) => {
    const updated = [entry, ...history];
    setHistory(updated);
    localStorage.setItem("moodHistory", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("moodHistory");
  };

  // Analyze mood
  const analyzeMood = async (text) => {
    if (!text.trim()) return;
    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();

      // If backend does not return emotion or recommendation, set defaults
      const emotion = data.emotion || "neutral";
      const recommendation = data.recommendation || "Keep tracking your mood!";

      setSuggestions({ ...data, emotion, recommendation });

      saveToHistory({
        text,
        compound: data.compound ?? 0,
        emotion,
        recommendation,
        date: new Date().toISOString(), // store ISO string
      });
    } catch (err) {
      console.error("Error analyzing mood:", err);
    }
  };

  // Chart.js mood trend
  useEffect(() => {
    if (!history.length) return;

    const existing = Chart.getChart("moodChart");
    if (existing) existing.destroy();

    const ctx = document.getElementById("moodChart");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: history.map((h) => formatMoodDate(h.date)),
        datasets: [
          {
            label: "Mood (sentiment score)",
            data: history.map((h) => h.compound),
            borderWidth: 3,
            tension: 0.3,
            borderColor: "#4a8cff",
            backgroundColor: "rgba(74, 140, 255, 0.2)",
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: "#4a8cff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { min: -1, max: 1 } },
      },
    });
  }, [history]);

  return (
    <div className="container my-4">

      {/* TOP ROW: Mood Tracker + Mood Trend */}
      <div className="row gx-5 gy-4">
        <div className="col-lg-5 col-12 mb-4 mb-lg-0">
          <h2 className="section-title">Mood Tracker</h2>
          <MoodForm onAnalyze={analyzeMood} />
          {suggestions && (
            <div className="alert alert-info mt-3">
              <h5>Sentiment Score: {suggestions.compound}</h5>
              {suggestions.compound >= 0.3 && <p>You're feeling positive ✨</p>}
              {suggestions.compound <= -0.3 && <p>Feeling down? 💙 Try a breathing exercise</p>}
              {suggestions.compound > -0.3 && suggestions.compound < 0.3 && <p>Feeling neutral 📝</p>}
              <p><strong>Emotion:</strong> {suggestions.emotion}</p>
              <p><strong>Tip:</strong> {suggestions.recommendation}</p>
            </div>
          )}
        </div>

        <div className="col-lg-7 col-12">
          <h2 className="section-title text-center">Mood Trend</h2>
          <div style={{ height: "400px" }}>
            {history.length > 0 ? (
              <canvas id="moodChart" className="w-100"></canvas>
            ) : (
              <p className="text-center">No data yet.</p>
            )}
          </div>
          <p className="mt-2 text-center text-muted">
            The chart above shows how your mood has changed over time. Positive values indicate good moods, negative values indicate low moods.
          </p>
        </div>
      </div>

      {/* FULL-WIDTH MOOD HISTORY */}
      <div className="row mt-5">
        <div className="col-12">
          <h2 className="section-title text-center mb-4">Mood History</h2>

          {history.length > 0 && (
            <div className="d-flex justify-content-end mb-4">
              <button className="btn btn-danger btn-sm" onClick={clearHistory}>
                Clear History
              </button>
            </div>
          )}

          <div className="row g-3">
            {history.length === 0 && <p className="text-center">No mood logs yet.</p>}
            {history.map((item, idx) => (
              <div key={idx} className="col-lg-4 col-md-6 col-12">
                <div className="card position-relative h-100 history-card">
                  <div
                    className="position-absolute top-0 start-0 h-100"
                    style={{
                      width: '8px',
                      backgroundColor: getEmotionColor(item.emotion),
                      borderRadius: '8px 0 0 8px'
                    }}
                  ></div>
                  <div className="card-body ms-3">
                    <p><strong>Date:</strong> {formatMoodDate(item.date)}</p>
                    <p><strong>Sentiment:</strong> {item.compound}</p>
                    <p><strong>Emotion:</strong> {item.emotion}</p>
                    <p><strong>Text:</strong> {item.text}</p>
                    <p><strong>Tip:</strong> {item.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
