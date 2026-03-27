import React, { useEffect, useState, useRef } from "react";
import { FaPaperPlane, FaEllipsisV, FaCamera, FaEdit, FaCheck, FaMoon, FaSun } from "react-icons/fa";
import defaultProfile from "../assets/profile.png";

export default function ChatAssistant({ token }) {
  const [assistantName, setAssistantName] = useState("Haven");
  const [assistantPic, setAssistantPic] = useState(defaultProfile);
  const [isEditingName, setIsEditingName] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const validToken = token && token !== "null" && token !== "undefined" ? token : null;

  const theme = {
    header: "#1a2634", 
    bg: darkMode ? "#0f172a" : "#e2e8f0", 
    userBubble: darkMode ? "#1e40af" : "#dbeafe", 
    aiBubble: darkMode ? "#1e293b" : "#ffffff",
    text: darkMode ? "#f8fafc" : "#1e293b",
    secondaryText: darkMode ? "#94a3b8" : "#64748b",
    accent: "#3b82f6"
  };

  useEffect(() => {
    if (!validToken) return;
    fetch("http://localhost:5000/assistant_settings", {
      headers: { Authorization: `Bearer ${validToken}` }
    })
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (data) {
        setAssistantName(data.assistantName || "Haven");
        setAssistantPic(data.assistantPic || defaultProfile);
      }
    });

    fetch("http://localhost:5000/chat_history", {
      headers: { Authorization: `Bearer ${validToken}` }
    })
    .then(res => res.ok ? res.json() : [])
    .then(data => {
      if (Array.isArray(data)) setMessages(data);
    });
  }, [validToken]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file && validToken) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        setAssistantPic(base64String);
        try {
          await fetch("http://localhost:5000/assistant_settings", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${validToken}` },
            body: JSON.stringify({ assistantName, assistantPic: base64String })
          });
        } catch (err) { console.error(err); }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveToDatabase = async (msgObj) => {
    if (!validToken) return;
    try {
      await fetch("http://localhost:5000/chat_history", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${validToken}` },
        body: JSON.stringify(msgObj)
      });
    } catch (err) { console.error(err); }
  };

  const sendMessage = async () => {
    if (!input.trim() || !validToken) return;
    const userMessage = { text: input, sender: "user", timestamp: Date.now(), dateGroup: new Date().toDateString() };
    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    await saveToDatabase(userMessage);
    generateAIReply(updatedHistory);
  };

  const generateAIReply = async (historyForAI) => {
    try {
      setIsTyping(true);
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${validToken}` },
        body: JSON.stringify({ messages: historyForAI }),
      });
      const data = await response.json();
      const aiMessage = { text: data.reply || "...", sender: "ai", timestamp: Date.now(), dateGroup: new Date().toDateString() };
      setMessages(prev => [...prev, aiMessage]);
      await saveToDatabase(aiMessage);
    } catch (err) { console.error(err); } finally { setIsTyping(false); }
  };

  const clearChat = async () => {
    if (window.confirm("Clear all messages?") && validToken) {
      await fetch("http://localhost:5000/chat_history", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${validToken}` }
      });
      setMessages([]);
      setMenuOpen(false);
    }
  };

  const groupedMessages = messages.reduce((groups, msg) => {
    const date = msg.dateGroup;
    if (!groups[date]) groups[date] = [];
    groups[date].push(msg);
    return groups;
  }, {});

  return (
    <div className="container-fluid p-0" style={{ maxWidth: "1200px", marginTop: "-24px" }}>
      
      {/* Top bar */}
      <div className="d-flex justify-content-between align-items-center p-3 shadow-sm"
           style={{ backgroundColor: theme.header, color: "white", borderRadius: "0" }}>
        <div className="d-flex align-items-center gap-3">
          <div className="position-relative">
            <img src={assistantPic} alt="avatar"
              style={{ width: "45px", height: "45px", borderRadius: "50%", cursor: "pointer", objectFit: "cover", border: "1px solid rgba(255,255,255,0.2)" }}
              onClick={() => setMenuOpen("avatar")}
            />
            <div onClick={() => fileInputRef.current.click()}
                 className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                 style={{ width: "20px", height: "20px", cursor: "pointer", border: "2px solid #1a2634" }}>
              <FaCamera style={{ fontSize: "10px" }} />
            </div>
            <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handlePicChange} />
          </div>

          <div className="d-flex flex-column">
            {isEditingName ? (
              <div className="d-flex align-items-center gap-2">
                <input type="text" value={assistantName} onChange={(e) => setAssistantName(e.target.value)}
                       className="form-control form-control-sm bg-dark text-white border-secondary" style={{ width: "120px" }} autoFocus />
                <FaCheck style={{ cursor: "pointer" }} onClick={() => setIsEditingName(false)} />
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <h6 className="mb-0 fw-bold">{assistantName}</h6>
                <FaEdit style={{ fontSize: "12px", cursor: "pointer", opacity: 0.8 }} onClick={() => setIsEditingName(true)} />
              </div>
            )}
            <small style={{ color: "#4ade80", fontSize: "0.75rem" }}>online</small>
          </div>
        </div>

        <div className="position-relative">
          <FaEllipsisV style={{ cursor: "pointer" }} onClick={() => setMenuOpen(menuOpen === "menu" ? null : "menu")} />
          {menuOpen === "menu" && (
            <div className="position-absolute end-0 mt-2 p-1 bg-white border rounded shadow-lg" style={{ zIndex: 10, minWidth: "180px" }}>
              <button className="btn btn-sm w-100 text-start py-2 border-0" 
                      style={{ color: "#333", backgroundColor: "transparent" }} 
                      onClick={clearChat}>
                Clear Chat
              </button>
              <button className="btn btn-sm w-100 text-start py-2 border-0 d-flex align-items-center gap-2" 
                      style={{ color: "#333", backgroundColor: "transparent" }}
                      onClick={() => {setDarkMode(!darkMode); setMenuOpen(false);}}>
                {darkMode ? <><FaSun/> Light Mode</> : <><FaMoon/> Dark Mode</>}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enlarged Avatar */}
      {menuOpen === "avatar" && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
             style={{ backgroundColor: "rgba(0,0,0,0.9)", zIndex: 2000 }} onClick={() => setMenuOpen(null)}>
          <img src={assistantPic} alt="enlarged" style={{ maxWidth: "90vw", maxHeight: "80vh", borderRadius: "10px", border: "2px solid white" }} />
        </div>
      )}

      {/* Chat Area */}
      <div ref={chatContainerRef}
        style={{
          height: "75vh",
          overflowY: "auto",
          background: theme.bg,
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          transition: "all 0.3s ease"
        }}>
        {Object.keys(groupedMessages).map((date) => (
          <div key={date} className="d-flex flex-column gap-3">
            <p className="text-center my-3">
                <small style={{ backgroundColor: darkMode ? "#1e293b" : "#cbd5e1", color: darkMode ? "#fff" : "#475569", padding: "6px 12px", borderRadius: "12px", fontSize: "0.7rem", fontWeight: "600" }}>
                    {date}
                </small>
            </p>
            {groupedMessages[date].map((msg, i) => (
              <div key={i} className={`d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
                <div style={{
                  position: "relative",
                  maxWidth: "85%",
                  padding: "10px 14px",
                  backgroundColor: msg.sender === "user" ? theme.userBubble : theme.aiBubble,
                  color: msg.sender === "user" ? (darkMode ? "#fff" : "#1e3a8a") : theme.text,
                  borderRadius: "12px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  borderTopRightRadius: msg.sender === "user" ? "2px" : "12px",
                  borderTopLeftRadius: msg.sender === "ai" ? "2px" : "12px"
                }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    width: "12px",
                    height: "12px",
                    backgroundColor: msg.sender === "user" ? theme.userBubble : theme.aiBubble,
                    [msg.sender === "user" ? "right" : "left"]: "-4px",
                    clipPath: msg.sender === "user" ? "polygon(0 0, 0 100%, 100% 0)" : "polygon(100% 0, 100% 100%, 0 0)"
                  }}></div>

                  <div style={{ wordBreak: "break-word", fontSize: "1rem", paddingRight: "55px", minHeight: "24px" }}>
                    {msg.text}
                    <span style={{
                      position: "absolute",
                      bottom: "6px",
                      right: "10px",
                      fontSize: "0.65rem",
                      color: msg.sender === "user" ? (darkMode ? "#93c5fd" : "#60a5fa") : theme.secondaryText,
                    }}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* --- ADDED: Typing Indicator Bubble --- */}
        {isTyping && (
          <div className="d-flex justify-content-start">
            <div style={{
              position: "relative",
              padding: "10px 14px",
              backgroundColor: theme.aiBubble,
              color: theme.secondaryText,
              borderRadius: "12px",
              borderTopLeftRadius: "2px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: "-4px",
                width: "12px",
                height: "12px",
                backgroundColor: theme.aiBubble,
                clipPath: "polygon(100% 0, 100% 100%, 0 0)"
              }}></div>
              <div className="d-flex align-items-center gap-2">
                <span className="spinner-grow spinner-grow-sm text-primary" role="status" style={{ width: "8px", height: "8px" }}></span>
                <small className="fw-medium" style={{ fontSize: "0.85rem" }}>{assistantName} is typing...</small>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="d-flex align-items-center p-3 gap-3" style={{ backgroundColor: darkMode ? "#1e293b" : "#f1f5f9", borderRadius: "0 0 12px 12px" }}>
        <textarea
          ref={textareaRef}
          className="form-control border-0 shadow-none"
          /* FIXED: Dynamic Placeholder */
          placeholder={`Message ${assistantName}...`}
          value={input}
          onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; }}
          rows={1}
          style={{ 
            resize: "none", borderRadius: "24px", padding: "12px 20px",
            backgroundColor: darkMode ? "#0f172a" : "#ffffff", color: theme.text,
            maxHeight: "150px"
          }}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
        />
        <button onClick={sendMessage} className="btn shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "50px", height: "50px", backgroundColor: theme.accent, color: "white" }}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}