'use server';

import { PrismaClient } from '@prisma/client';
import { revalidateTag } from 'next/cache';

export const createPrediction = async (
  prediction: string,
  reminderDate: Date,
  email: string
) => {
  const prisma = new PrismaClient();

  try {
    await prisma.prediction.create({
      data: {
        prediction: prediction,
        email: email,
        reminderDate: reminderDate,
        reminderSent: false,
      },
    });
    revalidateTag('predictions');
    return { message: 'Prediction created' };
  } catch {
    return { message: 'Internal server error' };
  } finally {
    prisma.$disconnect();
  }
};
