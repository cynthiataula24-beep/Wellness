import React, { useState, useRef, useEffect } from "react";
import { FaUndo, FaRedo, FaAdjust, FaTextHeight, FaSave, FaChevronDown, FaChevronUp, FaTrash, FaHistory, FaLightbulb, FaTimes, FaBookOpen } from "react-icons/fa";

export default function JournalPage() {
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);
    const [isPromptsOpen, setIsPromptsOpen] = useState(true);
    const [collapsedEntries, setCollapsedEntries] = useState({});
    const [darkMode, setDarkMode] = useState(false);
    const [viewingEntry, setViewingEntry] = useState(null);
    const editorRef = useRef(null);

    const theme = {
        bg: darkMode ? "#0f172a" : "#ffffff",
        editorBg: darkMode ? "#1e293b" : "#ffffff",
        sidebarBg: darkMode ? "#111827" : "#f8fafc", 
        text: darkMode ? "#94a3b8" : "#1e293b", // Muted gray for history text in dark mode
        heading: darkMode ? "#f1f5f9" : "#1e293b",
        border: darkMode ? "#334155" : "#cbd5e1",
        toolbarBg: darkMode ? "#1a2634" : "#f1f5f9", 
        toolbarText: darkMode ? "#ffffff" : "#475569",
        accent: "#3b82f6",
        deleteIcon: darkMode ? "#64748b" : "#94a3b8",
        collapsibleBg: darkMode ? "#1e293b" : "#ffffff",
        overlayBg: darkMode ? "#0f172a" : "#ffffff"
    };

    const navHeight = "70px"; 
    const contentHeight = `calc(100vh - ${navHeight})`;

    useEffect(() => {
        const fetchEntries = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) return;
            setIsLoading(true);
            try {
                const response = await fetch("http://192.168.1.132:5000/get_journal", {
                    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
                });
                if (response.ok) {
                    const data = await response.json();
                    setEntries(data);
                }
            } catch (error) { console.error(error); } finally { setIsLoading(false); }
        };
        fetchEntries();
    }, []);

    const saveEntry = async () => {
        const text = editorRef.current.innerHTML;
        if (!text.trim() || text === "<br>") return;
        const token = localStorage.getItem("access_token");
        const dateString = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        try {
            const response = await fetch("http://192.168.1.132:5000/save_journal", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ text, date: dateString })
            });
            if (response.ok) {
                const savedData = await response.json();
                setEntries([savedData, ...entries]);
                editorRef.current.innerHTML = "";
            }
        } catch (error) { console.error(error); }
    };

    const deleteEntry = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm("Delete this entry?")) return;
        const token = localStorage.getItem("access_token");
        try {
            const response = await fetch(`http://192.168.1.132:5000/delete_journal/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                setEntries(entries.filter(entry => entry.id !== id));
                if (viewingEntry?.id === id) setViewingEntry(null);
            }
        } catch (error) { console.error(error); }
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
        } catch (error) { console.error(error); }
    };

    const applyFormat = (command) => document.execCommand(command, false, null);

    const categories = {
        "Letters From Me": ["Write a letter to your 5-year-old self...", "Write to yourself one year ago...", "Write to yourself at age 16..."],
        "Knowing Who I Am": ["Important values you live by?", "When do you feel most like yourself?", "What is your 'why'?"],
        "Self Love": ["Three things you love about your personality.", "Thank-you note to your body."]
    };

    return (
        <div style={{ 
            display: "flex", width: "100vw", height: contentHeight, position: "relative",
            left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw",
            backgroundColor: theme.bg, color: theme.heading, overflow: "hidden"
        }}>
            
            {/* READING MODE OVERLAY */}
            {viewingEntry && (
                <div style={{
                    position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                    backgroundColor: theme.overlayBg, zIndex: 1000, display: "flex", flexDirection: "column"
                }}>
                    <div className="d-flex justify-content-between align-items-center p-4 border-bottom" style={{ borderColor: theme.border }}>
                        <div className="d-flex align-items-center gap-3">
                            <FaBookOpen size={20} color={theme.accent} />
                            <h4 className="m-0 fw-bold" style={{ color: theme.heading }}>{viewingEntry.date}</h4>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary rounded-pill px-4" onClick={() => setViewingEntry(null)}>
                            <FaTimes /> Close
                        </button>
                    </div>
                    <div style={{ 
                        flex: 1, overflowY: "auto", padding: "60px 15%", fontSize: "21px", 
                        lineHeight: "2", fontFamily: "'Georgia', serif", color: theme.heading 
                    }}>
                        <div dangerouslySetInnerHTML={{ __html: viewingEntry.text }} />
                    </div>
                </div>
            )}

            {/* LEFT: Writing Area (70%) */}
            <div style={{ flex: "0 0 70%", display: "flex", flexDirection: "column", borderRight: `1px solid ${theme.border}` }}>
                <div className="d-flex align-items-center justify-content-between p-3" 
                     style={{ backgroundColor: theme.toolbarBg, color: theme.toolbarText, borderBottom: `1px solid ${theme.border}` }}>
                    <div className="d-flex gap-4 px-3">
                        <FaUndo className="btn-icon" onClick={() => applyFormat("undo")} />
                        <FaRedo className="btn-icon" onClick={() => applyFormat("redo")} />
                        <FaAdjust className="btn-icon" onClick={() => setDarkMode(!darkMode)} />
                        <FaTextHeight className="btn-icon" onClick={() => document.execCommand("fontSize", false, "4")} />
                    </div>
                    <button className="btn btn-success btn-sm px-4 fw-bold" onClick={saveEntry} style={{ borderRadius: "20px" }}>
                        <FaSave className="me-2" /> Save Entry
                    </button>
                </div>

                <div ref={editorRef} contentEditable 
                    style={{ 
                        flex: 1, padding: "50px 10%", fontSize: "19px", lineHeight: "1.8", 
                        fontFamily: "'Georgia', serif", outline: "none", overflowY: "auto", color: theme.heading,
                        backgroundColor: theme.editorBg
                    }}
                    placeholder="Deep dive into your thoughts..."
                ></div>
            </div>

            {/* RIGHT: Sidebar (30%) */}
            <div style={{ flex: "0 0 30%", display: "flex", flexDirection: "column", backgroundColor: theme.sidebarBg, height: "100%" }}>
                
                {/* Prompts Section */}
                <div className="p-4" style={{ borderBottom: `1px solid ${theme.border}` }}>
                    <div className="d-flex justify-content-between align-items-center mb-3" 
                         style={{ cursor: "pointer" }} onClick={() => setIsPromptsOpen(!isPromptsOpen)}>
                        <h5 className="m-0 d-flex align-items-center gap-2 fw-bold" style={{ color: theme.heading }}>
                            <FaLightbulb color={theme.accent} /> Prompts
                        </h5>
                        {isPromptsOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                    </div>
                    {isPromptsOpen && (
                        <div className="d-flex flex-column gap-2" style={{ maxHeight: "25vh", overflowY: "auto" }}>
                            {Object.keys(categories).map((cat) => (
                                <div key={cat}>
                                    <div onClick={() => setOpenCategory(openCategory === cat ? null : cat)}
                                         className="p-2 px-3 rounded shadow-sm d-flex justify-content-between align-items-center"
                                         style={{ background: theme.collapsibleBg, border: `1px solid ${theme.border}`, cursor: "pointer", fontSize: "14px", fontWeight: "600", color: theme.heading }}>
                                        {cat} {openCategory === cat ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                                    </div>
                                    {openCategory === cat && (
                                        <div className="ps-2 mt-2">
                                            {categories[cat].map((p, idx) => (
                                                <div key={idx} className="p-2 mb-1 small rounded border" 
                                                     style={{ cursor: "pointer", background: darkMode ? "rgba(255,255,255,0.05)" : "#fff", borderColor: theme.border, fontSize: "13px", color: theme.text }}
                                                     onClick={() => editorRef.current.innerHTML = p}>
                                                    {p}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* History Section */}
                <div className="p-4" style={{ flex: 1, overflowY: "auto" }}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold m-0 d-flex align-items-center gap-2" style={{ color: theme.heading }}>
                            <FaHistory color={theme.accent} /> History
                        </h5>
                        {entries.length > 0 && (
                            <button onClick={clearHistory} className="btn btn-link btn-sm text-danger p-0 text-decoration-none" style={{ fontSize: "0.75rem" }}>
                                Clear All
                            </button>
                        )}
                    </div>
                    
                    <div className="d-flex flex-column gap-3">
                        {entries.map((entry) => (
                            <div key={entry.id} style={{ borderBottom: `1px solid ${theme.border}`, paddingBottom: "12px" }}>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }} onClick={() => setViewingEntry(entry)}>
                                        <span style={{ fontSize: "12px", fontWeight: "700", color: theme.accent }}>{entry.date}</span>
                                        <FaBookOpen size={12} className="text-muted" title="Open Reading Mode" />
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <FaTrash size={13} style={{ color: theme.deleteIcon, cursor: "pointer" }} onClick={(e) => deleteEntry(entry.id, e)} />
                                        <div style={{ cursor: "pointer" }} onClick={() => setCollapsedEntries(prev => ({...prev, [entry.id]: !prev[entry.id]}))}>
                                            {collapsedEntries[entry.id] ? <FaChevronDown size={12} /> : <FaChevronUp size={12} />}
                                        </div>
                                    </div>
                                </div>
                                {!collapsedEntries[entry.id] && (
                                    <div style={{ fontSize: "14px", color: theme.text, lineHeight: "1.5", cursor: "pointer" }} 
                                         onClick={() => setViewingEntry(entry)}
                                         dangerouslySetInnerHTML={{ __html: entry.text.length > 100 ? entry.text.substring(0, 100) + "..." : entry.text }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .btn-icon:hover { transform: scale(1.1); color: ${theme.accent}; }
                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 10px; }
            `}</style>
        </div>
    );
}