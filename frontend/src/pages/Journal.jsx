import React, { useState, useRef, useEffect } from "react";
import { FaUndo, FaRedo, FaAdjust, FaTextHeight, FaSave, FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";

export default function JournalPage() {
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openCategory, setOpenCategory] = useState(null); 
    const [checkedPrompts, setCheckedPrompts] = useState({});
    const editorRef = useRef(null);

    // --- 1. Fetch Logic ---
    useEffect(() => {
        const fetchEntries = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                console.error("No token found in localStorage");
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch("http://192.168.1.132:5000/get_journal", {
                    headers: { 
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setEntries(data);
                }
            } catch (error) {
                console.error("Network error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEntries();
    }, []);

    // --- 2. Save Logic ---
    const saveEntry = async () => {
        const text = editorRef.current.innerHTML;
        const token = localStorage.getItem("access_token");

        if (!token) {
            alert("You must be logged in to save.");
            return;
        }

        const dateString = new Date().toLocaleDateString('en-US', {
            month: 'short', day: '2-digit', year: 'numeric'
        });

        try {
            const response = await fetch("http://192.168.1.132:5000/save_journal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ text: text, date: dateString })
            });

            if (response.ok) {
                const savedData = await response.json();
                setEntries([savedData, ...entries]);
                editorRef.current.innerHTML = "";
            }
        } catch (error) {
            console.error("Failed to save:", error);
        }
    };

    // --- 3. Delete Logic ---
    const deleteEntry = async (id) => {
        if (!window.confirm("Delete this entry?")) return;
        const token = localStorage.getItem("access_token");
        try {
            const response = await fetch(`http://192.168.1.132:5000/delete_journal/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                setEntries(entries.filter(entry => entry.id !== id));
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const clearHistory = async () => {
        if (!window.confirm("Permanently delete ALL entries?")) return;
        const token = localStorage.getItem("access_token");
        try {
            const response = await fetch("http://192.168.1.132:5000/clear_journal", {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) setEntries([]);
        } catch (error) {
            console.error("Clear error:", error);
        }
    };

    // --- 4. Toolbar & Formatting ---
    const applyFormat = (command) => document.execCommand(command, false, null);
    
    const changePageColor = () => {
        const current = editorRef.current.style.backgroundColor;
        editorRef.current.style.backgroundColor = current === "rgb(253, 246, 227)" ? "#fff" : "#fdf6e3";
    };

    const changeFontSize = () => {
        document.execCommand("fontSize", false, "4");
    };

    const toggleCategory = (cat) => {
        setOpenCategory(openCategory === cat ? null : cat);
    };

    const togglePrompt = (cat, idx) => {
        const key = `${cat}-${idx}`;
        setCheckedPrompts((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const categories = {
        "Letters From Me": [
            "Write a letter to your 5-year-old self about what their life looks like now.",
            "Write a letter to yourself one year ago thanking yourself for getting through a specific challenge.",
            "Write to yourself at age 16. What advice do you have about love?",
            "Write a letter to yourself in 10 years. What do you hope you haven't forgotten?"
        ],
        "Knowing Who I Am": [
            "What are the three most important values you live by?",
            "When do you feel the most like yourself?",
            "What is your 'why'—the thing that keeps you going when things get hard?",
            "If you had to describe yourself in only five words, what would they be?"
        ],
        "Self Love": [
            "What are three things you love about your personality today?",
            "Write a thank-you note to your body for its strength and resilience.",
            "What does your soul need most right now?"
        ]
    };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
            <h1 className="section-title mb-3">Journal</h1>

            <div className="d-flex align-items-center justify-content-between p-2 mb-0" style={{ backgroundColor: "#007bff", borderRadius: "6px 6px 0 0", width: "100%", display: "flex" }}>
                <div style={{ display: "flex", gap: "15px", color: "white", paddingLeft: "10px" }}>
                    <FaUndo style={{ cursor: "pointer" }} onClick={() => applyFormat("undo")} />
                    <FaRedo style={{ cursor: "pointer" }} onClick={() => applyFormat("redo")} />
                    <FaAdjust style={{ cursor: "pointer" }} onClick={changePageColor} />
                    <FaTextHeight style={{ cursor: "pointer" }} onClick={changeFontSize} />
                </div>
                <button className="btn btn-success btn-sm" onClick={saveEntry} style={{ backgroundColor: "#28a745", border: "none", color: "white", padding: "5px 15px", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px",zIndex:"9999",position:"relative" }}>
                    <FaSave /> Save Entry
                </button>
            </div>

            <div ref={editorRef} contentEditable className="form-control mb-4" style={{ minHeight: "350px", backgroundColor: "#fdf6e3", fontFamily: "Georgia, serif", lineHeight: "1.6", fontSize: "17px", border: "1px solid #ccc", padding: "20px", borderRadius: "0 0 4px 4px", outline: "none", marginBottom: "30px" }}></div>

            <div className="my-4">
                <h3 className="section-title mb-3">Journal Prompts</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {Object.keys(categories).map((cat) => (
                        <div key={cat} style={{ width: "100%" }}>
                            <div className="card shadow-sm" style={{ cursor: "pointer", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" }} onClick={() => toggleCategory(cat)}>
                                <div className="card-body" style={{ padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <h5 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#333" }}>{cat}</h5>
                                    {openCategory === cat ? <FaChevronUp color="#007bff" /> : <FaChevronDown color="#888" />}
                                </div>
                            </div>
                            {openCategory === cat && (
                                <div className="mt-1 shadow-sm" style={{ maxHeight: "300px", overflowY: "auto", backgroundColor: "#fcfcfc", border: "1px solid #eee", borderRadius: "8px", padding: "15px" }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        {categories[cat].map((prompt, idx) => (
                                            <li key={idx} style={{ display: "flex", alignItems: "flex-start", marginBottom: "12px", borderBottom: "1px solid #f0f0f0", paddingBottom: "8px" }}>
                                                <input type="checkbox" style={{ marginRight: "12px", marginTop: "4px", transform: "scale(1.1)" }} checked={checkedPrompts[`${cat}-${idx}`] || false} onChange={() => togglePrompt(cat, idx)} />
                                                <span style={{ cursor: "pointer", fontSize: "14.5px", color: "#444", lineHeight: "1.4" }} onClick={() => editorRef.current.innerHTML = prompt}>{prompt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="section-title m-0">Journal History</h2>
                {entries.length > 0 && (
                    <button onClick={clearHistory} className="btn btn-outline-danger btn-sm" style={{ borderRadius: "20px", padding: "5px 15px" }}>
                        Clear All
                    </button>
                )}
            </div>

            {isLoading ? <p>Loading history...</p> : (
                <div style={{ marginTop: "20px" }}>
                    {entries.map((entry) => (
                        <div key={entry.id} style={{ background: "#f8fafc", padding: "20px", borderRadius: "10px", marginBottom: "15px", position: "relative", border: "1px solid #e2e8f0" }}>
                            <small style={{ color: "#94a3b8", fontWeight: "600" }}>{entry.date}</small>
                            <div dangerouslySetInnerHTML={{ __html: entry.text }} style={{ marginTop: "10px", color: "#334155", lineHeight: "1.5" }} />
                            <button 
                                onClick={() => deleteEntry(entry.id)}
                                style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", color: "#cbd5e1", cursor: "pointer" }}
                                onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"}
                                onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}