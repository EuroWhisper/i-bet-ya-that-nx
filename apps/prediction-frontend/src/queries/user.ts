import { unstable_cache as cache } from 'next/cache';

import { prisma } from '../utils/db';

export const getUserById = cache(
  async (userId: string) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });

      return user;
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      prisma.$disconnect();
    }
  },
  undefined,
  { tags: ['user'] }
);
