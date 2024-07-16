'use server';

import { revalidateTag } from 'next/cache';
import { PrismaClient, VerificationStatus } from '@prisma/client';

import { predictionSchema } from '../modules/home/predictionSchema';

export const createPrediction = async (
  prediction: string,
  confirmationDate: Date,
  email: string
) => {
  const validation = predictionSchema.safeParse({
    prediction,
    confirmationDate,
    email,
  });

  if (!validation.success) {
    return { message: 'Validation failed', errors: validation.error.errors };
  }

  const prisma = new PrismaClient();

  try {
    await prisma.prediction.create({
      data: {
        prediction: prediction,
        email: email,
        reminderDate: confirmationDate,
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

export const verifyPrediction = async (id: number, isCorrect: boolean) => {
  const prisma = new PrismaClient();

  const verificationStatus = isCorrect
    ? VerificationStatus.VERIFIED_CORRECT
    : VerificationStatus.VERIFIED_INCORRECT;

  const targetPrediction = await prisma.prediction.findUnique({
    where: { id: id },
  });

  if (!targetPrediction) {
    throw new Error('PREDICTION_NOT_FOUND');
  }

  if (
    targetPrediction?.verificationStatus === 'VERIFIED_CORRECT' ||
    targetPrediction?.verificationStatus === 'VERIFIED_INCORRECT'
  ) {
    throw new Error('PREDICTION_ALREADY_VERIFIED');
  }

  await prisma.prediction.update({
    where: { id: id },
    data: {
      verificationStatus,
    },
  });
  revalidateTag('predictions');
  prisma.$disconnect();
  return { message: 'Prediction verified' };
};
