'use server';

import { revalidateTag } from 'next/cache';
import { PrismaClient } from '@prisma/client';

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
