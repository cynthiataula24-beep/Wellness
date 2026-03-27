import React, { useState, useRef, useEffect } from "react";
import { FaUndo, FaRedo, FaAdjust, FaTextHeight, FaSave, FaChevronDown, FaChevronUp, FaTrash, FaHistory, FaLightbulb } from "react-icons/fa";

export default function JournalPage() {
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);
    const [isPromptsOpen, setIsPromptsOpen] = useState(true);
    const [collapsedEntries, setCollapsedEntries] = useState({});
    const [darkMode, setDarkMode] = useState(false);
    const editorRef = useRef(null);

    const theme = {
        bg: darkMode ? "#0f172a" : "#ffffff",
        editorBg: darkMode ? "#1e293b" : "#ffffff",
        sidebarBg: darkMode ? "#111827" : "#f1f5f9", 
        text: darkMode ? "#f1f5f9" : "#1e293b",
        border: darkMode ? "#334155" : "#e2e8f0",
        toolbarBg: darkMode ? "#1a2634" : "#e2e8f0", 
        toolbarText: darkMode ? "#ffffff" : "#475569",
        accent: "#3b82f6",
        deleteIcon: darkMode ? "#94a3b8" : "#64748b",
        collapsibleBg: darkMode ? "#1e293b" : "#ffffff"
    };

    // Adjust '70px' to match your Navbar's exact height to remove the gap
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
            if (response.ok) setEntries(entries.filter(entry => entry.id !== id));
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
            display: "flex", 
            width: "100%", 
            height: contentHeight, 
            marginTop: 0, 
            backgroundColor: theme.bg, 
            color: theme.text, 
            overflow: "hidden",
            position: "relative"
        }}>
            
            {/* LEFT: Writing Area (70%) */}
            <div style={{ flex: "0 0 70%", display: "flex", flexDirection: "column", borderRight: `1px solid ${theme.border}` }}>
                {/* Toolbar - Touches Navbar */}
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
                        flex: 1, padding: "50px 12%", fontSize: "19px", lineHeight: "1.8", 
                        fontFamily: "'Georgia', serif", outline: "none", overflowY: "auto", color: theme.text,
                        backgroundColor: theme.editorBg
                    }}
                    placeholder="Deep dive into your thoughts..."
                ></div>
            </div>

            {/* RIGHT: Sidebar (30%) - Scrollable History */}
            <div style={{ 
                flex: "0 0 30%", 
                display: "flex", 
                flexDirection: "column", 
                backgroundColor: theme.sidebarBg, 
                borderLeft: `1px solid ${theme.border}`,
                height: "100%"
            }}>
                
                {/* Fixed Top Section: Prompts */}
                <div className="p-4" style={{ borderBottom: `1px solid ${theme.border}` }}>
                    <div className="d-flex justify-content-between align-items-center mb-3" 
                         style={{ cursor: "pointer" }} onClick={() => setIsPromptsOpen(!isPromptsOpen)}>
                        <h5 className="m-0 d-flex align-items-center gap-2 fw-bold">
                            <FaLightbulb color={theme.accent} /> Prompts
                        </h5>
                        {isPromptsOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                    </div>
                    
                    {isPromptsOpen && (
                        <div className="d-flex flex-column gap-2" style={{ maxHeight: "250px", overflowY: "auto" }}>
                            {Object.keys(categories).map((cat) => (
                                <div key={cat}>
                                    <div onClick={() => setOpenCategory(openCategory === cat ? null : cat)}
                                         className="p-2 px-3 rounded shadow-sm d-flex justify-content-between align-items-center"
                                         style={{ background: theme.collapsibleBg, border: `1px solid ${theme.border}`, cursor: "pointer", fontSize: "14px" }}>
                                        {cat} {openCategory === cat ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                                    </div>
                                    {openCategory === cat && (
                                        <div className="ps-2 mt-2">
                                            {categories[cat].map((p, idx) => (
                                                <div key={idx} className="p-2 mb-1 small rounded border" 
                                                     style={{ cursor: "pointer", background: theme.bg, borderColor: theme.border, fontSize: "13px" }}
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

                {/* Scrollable Bottom Section: History */}
                <div className="p-4" style={{ flex: 1, overflowY: "auto" }}>
                    <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                        <FaHistory color={theme.accent} /> History
                    </h5>
                    <div className="d-flex flex-column gap-3">
                        {entries.map((entry) => (
                            <div key={entry.id} style={{ 
                                borderBottom: `1px solid ${theme.border}`, 
                                paddingBottom: "12px",
                                background: darkMode ? "rgba(255,255,255,0.02)" : "transparent",
                                borderRadius: "4px"
                            }}>
                                <div className="d-flex justify-content-between align-items-center px-1" 
                                     style={{ cursor: "pointer" }}
                                     onClick={() => setCollapsedEntries(prev => ({...prev, [entry.id]: !prev[entry.id]}))}>
                                    <span style={{ fontSize: "12px", fontWeight: "700", color: theme.accent }}>{entry.date}</span>
                                    <div className="d-flex gap-3 align-items-center">
                                        <FaTrash size={14} 
                                            style={{ color: theme.deleteIcon, cursor: "pointer" }} 
                                            onClick={(e) => deleteEntry(entry.id, e)} 
                                            onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"}
                                            onMouseLeave={(e) => e.currentTarget.style.color = theme.deleteIcon}
                                        />
                                        {collapsedEntries[entry.id] ? <FaChevronDown size={11} /> : <FaChevronUp size={11} />}
                                    </div>
                                </div>
                                {!collapsedEntries[entry.id] && (
                                    <div className="mt-2 px-1" style={{ fontSize: "14px", color: theme.text, opacity: 0.8 }} 
                                         dangerouslySetInnerHTML={{ __html: entry.text }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .btn-icon { cursor: pointer; transition: opacity 0.2s; }
                .btn-icon:hover { opacity: 0.7; }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 10px; }
            `}</style>
        </div>
    );
}