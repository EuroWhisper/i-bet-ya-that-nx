import { unstable_cache as cache } from 'next/cache';
import { PrismaClient } from '@prisma/client';

export const getPredictionsByEmail = cache(
  async (userEmail: string) => {
    const prisma = new PrismaClient();

    try {
      const predictions = await prisma.prediction.findMany({
        where: { email: userEmail },
      });

      return predictions;
    } catch {
      return;
    }
  },
  undefined,
  { tags: ['predictions'] }
);

export const getPredictionById = cache(
  async (predictionId: string) => {
    const prisma = new PrismaClient();
    try {
      const prediction = await prisma.prediction.findUnique({
        where: {
          id: parseInt(predictionId),
        },
      });
      return prediction;
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      prisma.$disconnect();
    }
  },
  undefined,
  { tags: ['predictions'] }
);
