'use client';

import * as RadixToast from '@radix-ui/react-toast';
import { ThemeProvider } from 'next-themes';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RadixToast.Provider swipeDirection="right">
        {children}
      </RadixToast.Provider>
    </ThemeProvider>
  );
};

export { Providers };
