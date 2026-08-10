import { prisma } from "../app/lib/prisma-client";


export const classService = {
  // ১. নতুন ক্লাস তৈরি
  async createClass(data: {
    title: string;
    description?: string;
    duration: number; // minutes
    capacity: number;
    startTime: Date | string;
    trainerId: string;
  }) {
    // Basic validations
    if (!data.title || !data.duration || !data.capacity || !data.startTime || !data.trainerId) {
      throw new Error("Required fields missing: title, duration, capacity, startTime, trainerId");
    }

    // Check if trainer exists and has TRAINER or ADMIN role
    const trainer = await prisma.user.findUnique({
      where: { id: data.trainerId.trim() },
      select: { id: true, role: true },
    });

    if (!trainer) {
      throw new Error("Trainer not found");
    }

    return await prisma.class.create({
      data: {
        title: data.title.trim(),
        description: data.description ? data.description.trim() : null,
        duration: Number(data.duration),
        capacity: Number(data.capacity),
        startTime: new Date(data.startTime),
        trainerId: data.trainerId.trim(),
      },
      include: {
        trainer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  },

  // ২. ট্রেইনারদের লিস্ট পাওয়া (Dropdown এর জন্য)
  async getTrainers() {
    return await prisma.user.findMany({
      where: {
        role: "TRAINER",
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  },

  // ৩. সকল ক্লাসের তালিকা Fech করা
  async getAllClasses() {
    return await prisma.class.findMany({
      where: { isDeleted: false },
      include: {
        trainer: {
          select: { id: true, name: true },
        },
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: { startTime: "asc" },
    });
  },
};