import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentToken = localStorage.getItem("access_token"); // ✅ unified key
      if (!currentToken) return;

      try {
        const res = await fetch("http://192.168.1.132:5000/auth/me", {
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${currentToken}`, 
            "Content-Type": "application/json"
          },
        });
        
        const data = await res.json();
        if (res.ok && data.user) {
          setUser(data.user);
        } else {
          handleLogout(); 
        }
      } catch (err) {
        console.error("Network error:", err);
      }
    };

    fetchUser();
  }, [token]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;

      try {
        const res = await fetch("http://192.168.1.132:5000/auth/update", {
          method: "PUT",
          headers: { 
            "Authorization": `Bearer ${token}`, // ✅ uses access_token
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ profile_pic: base64String })
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        }
      } catch (err) {
        alert("Failed to upload image");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // ✅ unified key
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand me-3" to="/">Wellness App</Link>

          <div className="dropdown">
            <button
              className="btn btn-light rounded-circle p-0 overflow-hidden shadow-sm"
              style={{ width: "42px", height: "42px", border: "2px solid white" }}
              type="button"
              id="profileMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user?.profile_pic ? (
                <img src={user.profile_pic} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <i className="bi bi-person-circle" style={{ fontSize: "24px" }}></i>
              )}
            </button>
            
            <ul className="dropdown-menu dropdown-menu-start shadow-lg border-0" 
                style={{ minWidth: "260px", borderRadius: "20px", marginTop: "10px" }}>
              
              {!token ? (
                <li>
                  <NavLink className="dropdown-item py-2" to="/login">Login / Sign Up</NavLink>
                </li>
              ) : (
                <li className="p-4 text-center">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: "none" }} 
                    accept="image/*"
                    onChange={handleFileChange}
                  />

                  <div className="position-relative mx-auto mb-3" style={{ width: "90px", height: "90px" }}>
                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm h-100 w-100 overflow-hidden"
                         style={{ border: "3px solid #f8f9fa" }}>
                      {user?.profile_pic ? (
                        <img 
                          src={user.profile_pic} 
                          alt="Profile" 
                          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                        />
                      ) : (
                        <i className="bi bi-person-fill text-primary" style={{ fontSize: "50px" }}></i>
                      )}
                    </div>

                    <button 
                      onClick={() => fileInputRef.current.click()}
                      className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center shadow"
                      style={{ width: "28px", height: "28px", border: "2px solid white", zIndex: 10 }}
                    >
                      <i className="bi bi-camera-fill" style={{ fontSize: "14px" }}></i>
                    </button>
                  </div>

                  <h5 className="mb-1 fw-bold text-dark">Hi, {user?.display_name || "User"}</h5>
                  <p className="text-muted small mb-4 text-truncate">{user?.email || "Loading..."}</p>
                  
                  <button className="btn btn-danger w-100 rounded-pill fw-bold" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {token && (
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/mood">Mood Tracker</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/chat">Chat</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/journal">Journal</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/goals">Goals</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/selfLove">Self Love</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/tips">Wellness Tips</NavLink></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
