'use client';

import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import { ToastProvider } from './ToastContext';

type Props = {
  session: Session | null;
  children: React.ReactNode;
};

const Providers = ({ session, children }: Props) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export { Providers };
