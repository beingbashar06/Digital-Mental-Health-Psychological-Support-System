import { useState, useEffect } from "react";
import API from "../services/api";
import MoodChart from "../components/MoodChart.jsx";

export default function MoodTracker() {
  const [moods, setMoods] = useState([]);
  const [newMood, setNewMood] = useState("");

  // Fetch moods on page load
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await API.get("/mood");   // ✅ moods fetch
        setMoods(res.data);
      } catch (err) {
        console.error("Error fetching moods:", err);
      }
    };
    fetchMoods();
  }, []);

  // Add new mood
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/mood", { mood: newMood }); // ✅ add mood
      setMoods([...moods, res.data]);
      setNewMood("");
    } catch (err) {
      console.error("Error adding mood:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Mood Tracker 🧠</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newMood}
          onChange={(e) => setNewMood(e.target.value)}
          placeholder="How are you feeling today?"
          required
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button type="submit">Add Mood</button>
      </form>

      <h3>Your Moods</h3>
      <ul>
        {moods.map((m, i) => (
          <li key={i}>
            <b>{m.mood}</b>{" "}
            <small>({new Date(m.createdAt).toLocaleString()})</small>
          </li>
        ))}
      </ul>

      {/* ✅ Mood Summary Chart */}
      <MoodChart />
    </div>
  );
}
