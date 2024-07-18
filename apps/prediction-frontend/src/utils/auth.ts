import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import Google from 'next-auth/providers/google';

const prisma = new PrismaClient();

const config = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [Google],
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
