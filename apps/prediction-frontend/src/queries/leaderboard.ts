import { unstable_cache as cache } from 'next/cache';
import { VerificationStatus } from '@prisma/client';

import { type DateRangeType, getDateRange } from '../utils';
import { prisma } from '../utils/db';

export const getLeaderboard = cache(
  async (rangeType: DateRangeType, verificationStatus: VerificationStatus) => {
    const { startDate, endDate } = getDateRange(rangeType);

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

    const userEmails = rawLeaderboard.map((item) => item.email) ?? [];

    const users = await prisma.user.findMany({
      where: {
        email: {
          in: userEmails,
        },
      },
      select: {
        email: true,
        nickname: true,
      },
    });

    const userMap = users.reduce((acc: { [key: string]: string }, user) => {
      acc[user.email] = user.nickname;
      return acc;
    }, {});

    const leaderboard = rawLeaderboard.map((item) => ({
      nickname: userMap[item.email],
      count: item._count.prediction,
    }));

    return leaderboard;
  },
  undefined,
  {
    tags: ['daily-most-correct-leaderboard'],
  }
);
