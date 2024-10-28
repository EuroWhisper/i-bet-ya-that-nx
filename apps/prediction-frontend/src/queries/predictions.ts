import { unstable_cache as cache } from 'next/cache';

import { Filters } from '../modules/filters/FiltersPredictionsProvider';
import { prisma } from '../utils/db';

export const getPredictionsByEmail = cache(
  async (userEmail: string, filters: Filters) => {
    try {
      const predictions = await prisma.prediction.findMany({
        where: {
          email: userEmail,
          verificationStatus: filters.verificationStatus,
        },
        orderBy: { createdAt: 'desc' },
        include: { user: true },
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
