import { Router } from "express";
import { prisma } from "../lib/prisma-client";

const router = Router();

// POST: Add new workout plan
router.post("/", async (req, res) => {
  try {
    const { title, description, level, duration, category, price } = req.body;

    if (!title || !level || !duration) {
      return res.status(400).json({
        success: false,
        message: "Title, Level, and Duration are required",
      });
    }

    const newPlan = await prisma.workoutPlan.create({
      data: {
        title,
        description,
        level,
        duration,
        category: category || "General",
        price: price ? parseFloat(price) : 0,
      },
    });

    res.status(201).json({
      success: true,
      data: newPlan,
    });
  } catch (error: any) {
    console.error("Create Workout Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create workout plan",
    });
  }
});

// GET: Fetch all workout plans for users
router.get("/", async (req, res) => {
  try {
    const plans = await prisma.workoutPlan.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error: any) {
    console.error("Get Workouts Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch workout plans",
    });
  }
});

export default router;