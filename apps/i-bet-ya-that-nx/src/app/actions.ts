'use server';

import { revalidateTag } from 'next/cache';
import { PrismaClient, VerificationStatus } from '@prisma/client';

import {
  predictionSchema,
  verificationSchema,
} from '../modules/home/predictionSchema';

import { actionClient, CustomError } from './utils';

export const createPrediction = actionClient
  .schema(predictionSchema)
  .action(async ({ parsedInput: { prediction, confirmationDate, email } }) => {
    const prisma = new PrismaClient();

    await prisma.prediction.create({
      data: {
        prediction: prediction,
        email: email,
        reminderDate: confirmationDate,
      },
    });
    revalidateTag('predictions');

    prisma.$disconnect();
  });

export const verifyPrediction = actionClient
  .schema(verificationSchema)
  .action(async ({ parsedInput: { id, isCorrect } }) => {
    const prisma = new PrismaClient();

    const verificationStatus = isCorrect
      ? VerificationStatus.VERIFIED_CORRECT
      : VerificationStatus.VERIFIED_INCORRECT;

    const targetPrediction = await prisma.prediction.findUnique({
      where: { id: id },
    });

    if (!targetPrediction) {
      throw new CustomError('Prediction not found', 'PREDICTION_NOT_FOUND');
    }

    if (
      targetPrediction?.verificationStatus === 'VERIFIED_CORRECT' ||
      targetPrediction?.verificationStatus === 'VERIFIED_INCORRECT'
    ) {
      throw new CustomError(
        'Prediction already verified',
        'PREDICTION_ALREADY_VERIFIED'
      );
    }

    await prisma.prediction.update({
      where: { id: id },
      data: {
        verificationStatus,
      },
    });
    revalidateTag('predictions');
    prisma.$disconnect();
    return { success: 'Prediction verified' };
  });
