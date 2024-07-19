'use client';

import * as React from 'react';
import { Button } from '@i-bet-ya-that-nx/ui-common';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      size="icon"
      variant="link"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden stroke-white hover:stroke-gray-200" />
      <Moon className="hidden h-5 w-5 dark:block stroke-white hover:stroke-gray-200" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
