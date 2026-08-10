// import { prisma } from "../app/lib/prisma-client"; // path ঠিক করে নিও

import { prisma } from "../app/lib/prisma-client";

export const workoutService = {
  async createWorkout(data: {
    title: string;
    description: string;
    level: string;
    duration: string;
    category: string;
    price?: number;
  }) {
    return await prisma.workoutPlan.create({
      data: {
        title: data.title,
        description: data.description,
        level: data.level,
        duration: data.duration,
        category: data.category,
        price: data.price ? Number(data.price) : 0,
      },
    });
  },

  async getAllWorkouts() {
    return await prisma.workoutPlan.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  async getWorkoutById(id: string) {
    return await prisma.workoutPlan.findUnique({
      where: { id },
    });
  },

  async deleteWorkout(id: string) {
    return await prisma.workoutPlan.delete({
      where: { id },
    });
  },
};