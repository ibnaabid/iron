import { prisma } from "../../lib/prisma-client";

export const reviewService = {
  // ১. নতুন রিভিউ তৈরি করা
  async createReview(userId: string, rating: number, comment?: string) {
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid or missing userId.");
    }

    if (!rating || rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5.");
    }

    // ১. ইউজার অস্তিত্ব যাচাই করার সময় select ব্যবহার করা হলো
    // এতে password বাদে শুধু প্রয়োজনীয় ফিল্ডগুলো ফেচ হবে, যা এরর প্রতিরোধ করবে
    const existingUser = await prisma.user.findUnique({
      where: { id: userId.trim() },
      select: { id: true },
    });

    if (!existingUser) {
      throw new Error("User not found in database. Invalid userId.");
    }

    return await prisma.review.create({
      data: {
        userId: userId.trim(),
        rating: Number(rating),
        comment: comment ? comment.trim() : null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  },

  // ২. সকল অ্যাক্টিভ রিভিউ ফেচ করা
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
};