'use client';

import { ThemeProvider } from 'next-themes';

import { ToastProvider } from '../context/ToastContext';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
};

export { Providers };
