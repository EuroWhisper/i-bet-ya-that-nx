'use server';

import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export const generateRandomNickname = async (email: string) => {
  const prisma = new PrismaClient();

  let randomNickname = '';
  let isNicknameUnique = false;

  try {
    while (!isNicknameUnique) {
      randomNickname = faker.internet.userName();

      const user = await prisma.user.findUnique({
        where: { nickname: randomNickname },
      });

      if (!user) {
        isNicknameUnique = true;
      }
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { nickname: randomNickname },
    });

    return updatedUser;
  } catch {
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
