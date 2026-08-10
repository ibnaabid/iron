import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma-client"; // আপনার prisma client-এর সঠিক পাথ নিশ্চিত করুন

const router = Router();

// POST: Add new workout plan
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description, level, duration, category, price } = req.body;

    // Basic Validation
    if (!title || !level || !duration) {
      return res.status(400).json({
        success: false,
        message: "Title, Level, and Duration are required fields.",
      });
    }

    const newPlan = await prisma.workoutPlan.create({
      data: {
        title,
        description: description || "",
        level,
        duration,
        category: category || "General",
        price: price ? parseFloat(price) : 0,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Workout plan created successfully!",
      data: newPlan,
    });
  } catch (error: any) {
    console.error("Create Plan Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create workout plan",
    });
  }
});

// GET: Fetch all workout plans
router.get("/", async (_req: Request, res: Response) => {
  try {
    const plans = await prisma.workoutPlan.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error: any) {
    console.error("Get Plans Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch workout plans",
    });
  }
});

export default router;