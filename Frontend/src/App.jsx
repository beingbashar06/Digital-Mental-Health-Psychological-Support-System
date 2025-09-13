import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MoodTracker from "./pages/MoodTracker";
import Dashboard from "./pages/Dashboard";   // ✅ Import Dashboard

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);   // ✅ true if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      {/* Navbar */}
      <div
        style={{
          padding: "12px",
          display: "flex",
          gap: "12px",
          borderBottom: "1px solid #eee"
        }}
      >
        {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}   {/* ✅ Added */}
        {isLoggedIn && <Link to="/profile">Profile</Link>}
        {isLoggedIn && <Link to="/mood">Mood Tracker</Link>}

        <span style={{ marginLeft: "auto" }}>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              style={{
                background: "crimson",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: 8 }}>
                Login
              </Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </span>
      </div>

      {/* Routes */}
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} /> {/* ✅ New route */}
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/mood" element={<RequireAuth><MoodTracker /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Default Route */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
