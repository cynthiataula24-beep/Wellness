import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import MoodTracker from "./pages/MoodTracker";
import WellnessTips from "./pages/WellnessTips";
import ChatAssistant from "./pages/ChatAssistant";
import Journal from "./pages/Journal";
import Goals from "./pages/Goals";
import SelfLove from "./pages/SelfLove";
import Login from "./pages/Login";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// --- PrivateRoute wrapper ---
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  // Check for both existence and the string "null" which can happen with localStorage
  const isAuthenticated = token && token !== "null";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// --- Internal component to use useLocation() ---
const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  // Grab the token from storage to pass to components that need it
  const token = localStorage.getItem("access_token");

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      
      {/* Main takes available space pushing footer down */}
      <main style={{ flex: 1 }}>
        {/* We keep the container for content alignment, except on Login if needed */}
        <div className={isLoginPage ? "" : "container py-4"}>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/mood" element={<PrivateRoute><MoodTracker /></PrivateRoute>} />
            <Route path="/tips" element={<PrivateRoute><WellnessTips /></PrivateRoute>} />
            
            {/* CRITICAL FIX: Passed the token prop to ChatAssistant 
                so it can authorize its API calls.
            */}
            <Route 
              path="/chat" 
              element={
                <PrivateRoute>
                  <ChatAssistant token={token} />
                </PrivateRoute>
              } 
            />
            
            <Route path="/journal" element={<PrivateRoute><Journal /></PrivateRoute>} />
            <Route path="/goals" element={<PrivateRoute><Goals /></PrivateRoute>} />
            <Route path="/selfLove" element={<PrivateRoute><SelfLove /></PrivateRoute>} />
            
            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>

      {/* Footer is now at the root level, so it spans 100% width */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}