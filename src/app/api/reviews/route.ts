import { NextResponse } from "next/server";
import { reviewService } from "../../../services/reviews";
// import { reviewService } from "@/services/reviews";

// GET: All Reviews Fetch
export async function GET() {
  try {
    const reviews = await reviewService.getAllReviews();

    return NextResponse.json({
      success: true,
      data: reviews,
    });
  } catch (error: any) {
    console.error("GET Reviews Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// POST: Create Review
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, rating, comment } = body;

    if (!userId || !rating) {
      return NextResponse.json(
        { success: false, message: "userId and rating are required" },
        { status: 400 }
      );
    }

    const review = await reviewService.createReview(userId, rating, comment);

    return NextResponse.json(
      { success: true, data: review },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST Review Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}