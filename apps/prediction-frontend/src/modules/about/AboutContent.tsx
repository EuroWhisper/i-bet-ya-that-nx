'use client';

import { SessionProvider } from 'next-auth/react';

import { HomeNavbar } from '../home/HomeNavbar/HomeNavbar';

export const AboutContent = () => {
  return (
    <SessionProvider>
      <HomeNavbar />
    </SessionProvider>
  );
};