import { prisma } from "../app/lib/prisma-client";


export const reviewService = {
  // ১. নতুন রিভিউ তৈরি করা
  async createReview(userId: string, rating: number, comment?: string) {
    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    return await prisma.review.create({
      data: {
        userId,
        rating,
        comment: comment || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  },

  // ২. সকল রিভিউ আনা
  async getAllReviews() {
    return await prisma.review.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  // ৩. নির্দিষ্ট ইউজারের রিভিউ পাওয়া
  async getReviewsByUser(userId: string) {
    return await prisma.review.findMany({
      where: {
        userId,
        isDeleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  // ৪. রিভিউ ডিলিট করা (Soft Delete)
  async deleteReview(reviewId: string, userId: string) {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new Error("Review not found");
    }

    if (review.userId !== userId) {
      throw new Error("You can only delete your own review");
    }

    return await prisma.review.update({
      where: { id: reviewId },
      data: { isDeleted: true },
    });
  },
};