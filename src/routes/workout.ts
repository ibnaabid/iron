import { Router, Request, Response } from "express";
import { workoutService } from "../services/workout-plan";
import { prisma } from "../app/lib/prisma-client";
// import { workoutService } from "../services/workout.service";

const router = Router();
// প্ল্যান আপডেট
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { title, description, level, duration, category, price } = req.body;

    const workout = await prisma.workoutPlan.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        level,
        duration,
        category,
        price: price !== undefined ? Number(price) : undefined,
      },
    });

    res.status(200).json({
      success: true,
      data: workout,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update workout",
    });
  }
});


// সব workout
router.get("/", async (req: Request, res: Response) => {
  try {
    const workouts = await workoutService.getAllWorkouts();
    res.status(200).json({
      success: true,
      data: workouts,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch workouts",
    });
  }
});

// নতুন workout অ্যাড
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description, level, duration, category, price } = req.body;

    if (!title || !description || !level || !duration || !category) {
      return res.status(400).json({
        success: false,
        message: "title, description, level, duration and category are required",
      });
    }

    const workout = await workoutService.createWorkout({
      title,
      description,
      level,
      duration,
      category,
      price,
    });

    res.status(201).json({
      success: true,
      data: workout,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create workout plan",
    });
  }
});

// একটা workout
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const workout = await workoutService.getWorkoutById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: "Workout plan not found",
      });
    }

    res.status(200).json({
      success: true,
      data: workout,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch workout",
    });
  }
});

// ডিলিট
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await workoutService.deleteWorkout(req.params.id);

    res.status(200).json({
      success: true,
      message: "Workout plan deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete workout",
    });
  }
});

export default router;