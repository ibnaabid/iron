import { Router } from "express";
import { reviewService } from "./reviews";

const router = Router();

// GET: All Reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error: any) {
    console.error("GET Reviews Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
});

// POST: Create Review
router.post("/", async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;

    if (!userId || !rating) {
      return res.status(400).json({
        success: false,
        message: "userId and rating are required",
      });
    }

    const review = await reviewService.createReview(userId, rating, comment);

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error: any) {
    console.error("POST Review Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
});

export default router;