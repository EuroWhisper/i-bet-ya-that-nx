'use client';

import { SessionProvider } from 'next-auth/react';

import { MainNavigationBar } from '../home/MainNavigationBar/MainNavigationBar';

export const AboutContent = () => {
  return (
    <SessionProvider>
      <MainNavigationBar />
    </SessionProvider>
  );
};
