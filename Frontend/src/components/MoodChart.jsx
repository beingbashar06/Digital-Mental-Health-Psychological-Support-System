import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import API from "../services/api";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

export default function MoodChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await API.get("/mood"); // ✅ moods fetch
        const moodCounts = {};

        res.data.forEach((m) => {
          moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1;
        });

        const chartData = Object.entries(moodCounts).map(([mood, count]) => ({
          name: mood,
          value: count,
        }));

        setData(chartData);
      } catch (err) {
        console.error("Error fetching moods for chart:", err);
      }
    };
    fetchMoods();
  }, []);

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Mood Summary 📊</h3>
      {data.length === 0 ? (
        <p>No moods recorded yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
