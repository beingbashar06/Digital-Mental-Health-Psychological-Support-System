import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        setMsg("Session expired, please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    loadProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out 🚪");
    navigate("/login");
  };

  if (msg) return <p>{msg}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Profile</h2>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          background: "red",
          color: "white",
          border: "none",
          padding: "8px 16px",
          cursor: "pointer",
          borderRadius: "6px"
        }}
      >
        Logout
      </button>
    </div>
  );
}
