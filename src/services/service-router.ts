import { Router, Request, Response } from "express";
import { reviewService } from "../app/api/reviews/route";
// import { reviewService } from "./reviews"; // ✅ সঠিক লোকাল সার্ভিস ইমপোর্ট

const router = Router();

// POST: Create a new review
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, rating, comment } = req.body || {};

    if (!userId || !rating) {
      return res.status(400).json({
        success: false,
        message: "userId and rating are required fields.",
      });
    }

    const review = await reviewService.createReview(
      String(userId),
      Number(rating),
      comment
    );

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error: any) {
    console.error("POST Review Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create review",
    });
  }
});

// GET: Fetch all reviews
router.get("/", async (_req: Request, res: Response) => {
  try {
    const reviews = await reviewService.getAllReviews();
    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error: any) {
    console.error("GET Reviews Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
});

export default router;