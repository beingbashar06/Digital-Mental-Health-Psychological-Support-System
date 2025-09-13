// src/pages/Dashboard.jsx
import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">🌸 MindCare</h1>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/profile">Profile</a>
          <a href="/mood">Mood Tracker</a>
        </nav>
        <button className="logout-btn">Logout</button>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <img
          src="https://i.pravatar.cc/120"
          alt="User Avatar"
          className="avatar"
        />
        <h2 className="welcome">Welcome back 👋</h2>
        <p className="subtitle">
          Take a deep breath 🌿. You're doing great. Let's check your progress.
        </p>
      </section>

      {/* Stats Section */}
      <main className="main-content">
        <div className="stats-grid">
          <div className="card calm">
            <h3>Total Moods Logged</h3>
            <p className="number">24</p>
          </div>
          <div className="card positive">
            <h3>Positive Days</h3>
            <p className="number">15</p>
          </div>
          <div className="card negative">
            <h3>Negative Days</h3>
            <p className="number">9</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions">
            <a href="/mood" className="btn primary">
              ✍️ Track Your Mood
            </a>
            <a href="/profile" className="btn secondary">
              👤 View Profile
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
