import React, { useEffect, useState, useRef } from "react";
import { FaPaperPlane, FaEllipsisV, FaCamera, FaEdit, FaCheck } from "react-icons/fa";
import defaultProfile from "../assets/profile.png"; 

export default function ChatAssistant({ token }) {
  const [assistantName, setAssistantName] = useState("Haven");
  const [assistantPic, setAssistantPic] = useState(defaultProfile);
  const [isEditingName, setIsEditingName] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // --- Helper to normalize token ---
  const validToken = token && token !== "null" && token !== "undefined" ? token : null;

  // --- Load settings & chat history ---
  useEffect(() => {
    if (!validToken) return;

    // Load Settings
    fetch("http://localhost:5000/assistant_settings", {
      headers: { Authorization: `Bearer ${validToken}` }
    })
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (data) {
        setAssistantName(data.assistantName || "Haven");
        setAssistantPic(data.assistantPic || defaultProfile);
      }
    })
    .catch(err => console.error("Settings Load Error:", err));

    // Load History
    fetch("http://localhost:5000/chat_history", {
      headers: { Authorization: `Bearer ${validToken}` }
    })
    .then(res => res.ok ? res.json() : [])
    .then(data => {
      if (Array.isArray(data)) setMessages(data);
      else setMessages([]);
    })
    .catch(err => {
      console.error("History Load Error:", err);
      setMessages([]);
    });
  }, [validToken]);

  // --- Scroll Logic ---
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // --- SAVE TO DATABASE HELPER ---
  const saveToDatabase = async (msgObj) => {
    if (!validToken) return;
    try {
      await fetch("http://localhost:5000/chat_history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${validToken}`
        },
        body: JSON.stringify(msgObj)
      });
    } catch (err) {
      console.error("Failed to persist message:", err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    // If no token, we still show the message in UI but alert the console
    if (!validToken) {
      console.error("Cannot send: No valid token found.");
      return;
    }

    const userMessage = {
      text: input,
      sender: "user",
      timestamp: Date.now(),
      dateGroup: new Date().toDateString(),
    };

    // 1. Update UI immediately
    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    // 2. SAVE user message to DB
    await saveToDatabase(userMessage);

    // 3. Get AI Reply
    generateAIReply(updatedHistory);
  };

  const generateAIReply = async (historyForAI) => {
    try {
      setIsTyping(true);
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${validToken}` // Added header for /chat
        },
        body: JSON.stringify({ messages: historyForAI }),
      });
      
      const data = await response.json();
      const aiMessage = {
        text: data.reply || "I'm here.",
        sender: "ai",
        timestamp: Date.now(),
        dateGroup: new Date().toDateString(),
      };

      // 4. Update UI with AI message
      setMessages(prev => [...prev, aiMessage]);

      // 5. SAVE AI message to DB
      await saveToDatabase(aiMessage);

    } catch (err) {
      console.error("AI Error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  // --- Other Handlers ---
  const handleNameChange = async () => {
    if (!validToken) return;
    await fetch("http://localhost:5000/assistant_settings", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${validToken}` 
      },
      body: JSON.stringify({ assistantName, assistantPic })
    });
    setIsEditingName(false);
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file && validToken) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base = reader.result;
        setAssistantPic(base);
        await fetch("http://localhost:5000/assistant_settings", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json", 
            Authorization: `Bearer ${validToken}` 
          },
          body: JSON.stringify({ assistantName, assistantPic: base })
        });
      };
      reader.readAsDataURL(file);
    }
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

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  const groupedMessages = Array.isArray(messages) ? messages.reduce((groups, msg) => {
    const date = msg.dateGroup;
    if (!groups[date]) groups[date] = [];
    groups[date].push(msg);
    return groups;
  }, {}) : {};

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      {/* Top bar */}
      <div className="d-flex justify-content-between align-items-center p-2 mb-2 shadow-sm"
           style={{ backgroundColor: "#343a40", color: "white", borderRadius: "12px 12px 0 0" }}>
        <div className="d-flex align-items-center gap-2">
          <div className="position-relative">
            <img
              src={assistantPic}
              alt="avatar"
              style={{ width: "45px", height: "45px", borderRadius: "50%", border: "2px solid white", cursor: "pointer", objectFit: "cover" }}
              onClick={() => setMenuOpen("avatar")}
            />
            <div onClick={() => fileInputRef.current.click()}
                 className="position-absolute bottom-0 end-0 bg-primary rounded-circle d-flex align-items-center justify-content-center"
                 style={{ width: "18px", height: "18px", cursor: "pointer", border: "1px solid white" }}>
              <FaCamera style={{ fontSize: "10px" }} />
            </div>
            <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handlePicChange} />
          </div>

          <div className="d-flex align-items-center gap-2">
            {isEditingName ? (
              <>
                <input type="text" value={assistantName} onChange={(e) => setAssistantName(e.target.value)}
                       className="form-control form-control-sm" style={{ width: "120px" }} autoFocus />
                <FaCheck style={{ cursor: "pointer" }} onClick={handleNameChange} />
              </>
            ) : (
              <>
                <h5 className="mb-0 fw-bold">{assistantName}</h5>
                <FaEdit style={{ fontSize: "14px", cursor: "pointer", opacity: 0.7 }} onClick={() => setIsEditingName(true)} />
              </>
            )}
          </div>
        </div>

        <div className="position-relative">
          <FaEllipsisV style={{ cursor: "pointer" }} onClick={() => setMenuOpen(menuOpen === "menu" ? null : "menu")} />
          {menuOpen === "menu" && (
            <div className="position-absolute end-0 mt-2 p-1 bg-white border rounded shadow" style={{ zIndex: 10, minWidth: "130px" }}>
              <button className="btn btn-sm btn-outline-danger w-100 border-0" onClick={clearChat}>Clear Chat</button>
            </div>
          )}
        </div>
      </div>

      {/* Enlarged Image Modal */}
      {menuOpen === "avatar" && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
             style={{ backgroundColor: "rgba(0,0,0,0.85)", zIndex: 2000 }} onClick={() => setMenuOpen(null)}>
          <img src={assistantPic} alt="enlarged"
               style={{ maxWidth: "85vw", maxHeight: "85vh", borderRadius: "20px", border: "4px solid white" }} />
        </div>
      )}

      {/* Chat Area */}
      <div
        ref={chatContainerRef}
        style={{
          height: "60vh",
          overflowY: "auto",
          background: "#fdfdfd",
          padding: "20px",
          borderRadius: "0 0 12px 12px",
          border: "1px solid #eee",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}
      >
        {Object.keys(groupedMessages).map((date) => (
          <div key={date}>
            <p className="text-center text-muted my-3"><small className="bg-light px-2 py-1 rounded">{date}</small></p>
            {groupedMessages[date].map((msg, i) => (
              <div
                key={i}
                className={`p-2 my-1 rounded shadow-sm ${msg.sender === "user" ? "bg-primary text-white ms-auto" : "bg-white border text-dark me-auto"}`}
                style={{ maxWidth: "80%", borderRadius: msg.sender === "user" ? "15px 15px 0 15px" : "15px 15px 15px 0" }}
              >
                <div style={{ wordBreak: "break-word" }}>{msg.text}</div>
                <div className={msg.sender === "user" ? "text-white-50" : "text-muted"} style={{ fontSize: "0.65rem", textAlign: "right", marginTop: "4px" }}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        ))}
        {isTyping && (
          <div className="p-2 my-1 rounded bg-light text-muted me-auto border" style={{ maxWidth: "75%", borderRadius: "15px 15px 15px 0" }}>
            <span className="spinner-grow spinner-grow-sm me-2" role="status"></span>
            <small>{assistantName} is typing...</small>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="d-flex align-items-end mt-3 position-relative">
        <textarea
          ref={textareaRef}
          className="form-control shadow-sm"
          placeholder={`Message ${assistantName}...`}
          value={input}
          onChange={handleInputChange}
          rows={1}
          style={{ resize: "none", paddingRight: "45px", borderRadius: "25px", border: "1px solid #ddd", maxHeight: "150px" }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <FaPaperPlane
          className="text-primary position-absolute"
          style={{ right: "15px", bottom: "12px", cursor: "pointer", fontSize: "1.3rem" }}
          onClick={sendMessage}
        />
      </div>
    </div>
  );
}