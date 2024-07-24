import { unstable_cache as cache } from 'next/cache';
import { PrismaClient, VerificationStatus } from '@prisma/client';

import { type DateRangeType, getDateRange } from '../utils';

export const getLeaderboard = cache(
  async (rangeType: DateRangeType, verificationStatus: VerificationStatus) => {
    const { startDate, endDate } = getDateRange(rangeType);

    const prisma = new PrismaClient();

    const rawLeaderboard = await prisma.prediction.groupBy({
      by: ['email'],
      where: {
        verificationStatus: verificationStatus,
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      _count: {
        prediction: true,
      },
      orderBy: {
        _count: {
          prediction: 'desc',
        },
      },
    });

    const leaderboard = rawLeaderboard.map((item) => ({
      email: item.email.replace(
        /^(.)(.*)(.@.*)$/,
        (_, first, middle, last) =>
          `${first}${middle.replace(/./g, '*')}${last}`
      ),
      count: item._count.prediction,
    }));

    return leaderboard;
  },
  undefined,
  {
    tags: ['daily-most-correct-leaderboard'],
  }
);
