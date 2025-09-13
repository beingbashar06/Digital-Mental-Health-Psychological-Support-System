import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Mood from "../models/Mood.js";

const router = express.Router();

// ADD Mood
router.post("/", authMiddleware, async (req, res) => {
  try {
    const mood = new Mood({ user: req.user._id, mood: req.body.mood });
    await mood.save();
    res.status(201).json(mood);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all moods for user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// routes/moodRoutes.js me add karo
router.get("/summary", authMiddleware, async (req, res) => {
  try {
    const moods = await Mood.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: "$mood", count: { $sum: 1 } } }
    ]);
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET mood summary (group by mood)
router.get("/summary", authMiddleware, async (req, res) => {
  try {
    const moods = await Mood.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: "$mood", count: { $sum: 1 } } }
    ]);
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
