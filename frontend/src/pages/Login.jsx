import React, { useState } from "react";
import axios from "axios";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  // Using the IP address instead of localhost so web and mobile both work
  const API_BASE = "http://192.168.1.132:5000";

  const handleAction = async (e, type) => {
    e.preventDefault();
    const endpoint = type === "login" ? "/auth/login" : "/auth/register";
    
    // We use the full IP address to ensure consistency
    const API_URL = `http://192.168.1.132:5000${endpoint}`;
    
    const payload = type === "login" 
      ? { email, password } 
      : { email: regEmail, password: regPassword, display_name: displayName };

    console.log(`Attempting ${type} at: ${API_URL}`); // Debug log

    try {
      const res = await axios.post(API_URL, payload);
      
      console.log("Server Response:", res.data); // Debug log

      if (type === "login") {
        if (res.data.access_token) {
          // Store the token with the correct name for Journal.jsx
          localStorage.setItem("access_token", res.data.access_token);
          console.log("Token saved successfully!");
          
          // Redirect to home
          window.location.href = "/";
        } else {
          alert("Login failed: Server did not return a token.");
        }
      } else {
        alert("Registration successful! Please sign in.");
        setIsLogin(true); 
      }
    } catch (err) {
      console.error("Login Error Object:", err);
      const errorMsg = err.response?.data?.msg || "Cannot connect to server. Is Flask running?";
      alert(errorMsg);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.splitBox}>
        
        {/* SIGN UP SECTION */}
        <div className={`${styles.section} ${styles.signUpSide} ${!isLogin ? styles.active : ""}`}>
          {isLogin && <div className={styles.overlay} onClick={() => setIsLogin(false)} />}
          <div className={styles.content}>
            <h2>Sign Up</h2>
            <form onSubmit={(e) => handleAction(e, "register")} className={styles.form}>
              <input type="text" placeholder="Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
              <input type="email" placeholder="Email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>

        {/* SIGN IN SECTION */}
        <div className={`${styles.section} ${styles.signInSide} ${isLogin ? styles.active : ""}`}>
          {!isLogin && <div className={styles.overlay} onClick={() => setIsLogin(true)} />}
          <div className={styles.content}>
            <h2>Sign In</h2>
            <form onSubmit={(e) => handleAction(e, "login")} className={styles.form}>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;