import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { User } from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import Google from 'next-auth/providers/google';

import { generateRandomNickname } from '../actions/user';

import { prisma } from './db';

const config = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [Google],
  events: {
    createUser: async (message: { user: User }) => {
      if (!message.user.email) {
        return;
      }

      generateRandomNickname(message.user.email);
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
