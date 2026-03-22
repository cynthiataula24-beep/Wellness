import React, { useState, useEffect } from "react";
import MoodForm from "../components/MoodForm";
import { Chart, registerables } from "chart.js";
import './MoodTracker.css';
Chart.register(...registerables);

export default function MoodTracker() {
  const [suggestions, setSuggestions] = useState(null);
  const [history, setHistory] = useState([]); // Initial state is empty
  const token = localStorage.getItem("access_token");

  // --- 1. Fetch History from Backend on Load ---
  useEffect(() => {
    if (!token) return;
    fetch("http://127.0.0.1:5000/mood_history", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(err => console.error("Error loading history:", err));
  }, [token]);

  const getEmotionColor = (emotion) => {
    switch (emotion) {
      case 'happy': return '#4ade80';
      case 'sad': return '#60a5fa';
      case 'angry': return '#f87171';
      case 'neutral': return '#a3a3a3';
      default: return '#d4d4d4';
    }
  };

  const formatMoodDate = (isoString) => {
    const now = new Date();
    const d = new Date(isoString);
    const day = d.getDate();
    const month = d.toLocaleString('default', { month: 'short' });
    const year = d.getFullYear();
    return year === now.getFullYear() ? `${day} ${month}` : `${day} ${month} ${year}`;
  };

  // --- 2. Clear History on Backend ---
  const clearHistory = async () => {
    if (!window.confirm("Clear all mood logs?")) return;
    try {
      await fetch("http://127.0.0.1:5000/mood_history", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory([]);
    } catch (err) {
      console.error("Error clearing history:", err);
    }
  };

  // --- 3. Analyze and Save to Database ---
  const analyzeMood = async (text) => {
    const token = localStorage.getItem("access_token"); // Ensure this is fresh
    if (!text.trim()) return;
    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Pass token so backend knows WHO is saving
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();

      const emotion = data.emotion || "neutral";
      const recommendation = data.recommendation || "Keep tracking your mood!";

      setSuggestions({ ...data, emotion, recommendation });

      // Add the new entry to the top of the history list
      const newEntry = {
        text,
        compound: data.compound ?? 0,
        emotion,
        recommendation,
        date: new Date().toISOString(),
      };
      setHistory([newEntry, ...history]);

    } catch (err) {
      console.error("Error analyzing mood:", err);
    }
  };

  // Chart.js mood trend (remains largely the same, just reverse history for chronological order)
  useEffect(() => {
    if (!history.length) return;

    const existing = Chart.getChart("moodChart");
    if (existing) existing.destroy();

    const chartData = [...history].reverse(); // Chart looks better oldest -> newest

    const ctx = document.getElementById("moodChart");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.map((h) => formatMoodDate(h.date)),
        datasets: [
          {
            label: "Mood (sentiment score)",
            data: chartData.map((h) => h.compound),
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
      {/* (Rest of your JSX remains identical to preserve styling) */}
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
            The chart above shows how your mood has changed over time.
          </p>
        </div>
      </div>

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