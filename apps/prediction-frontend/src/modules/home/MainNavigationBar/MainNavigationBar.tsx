'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@i-bet-ya-that-nx/ui-common';

import { DesktopNavbar } from './DesktopNavbar';
import { MobileNavbar } from './MobileNavbar';

const getBackgroundStyles = (pathName: string) => {
  if (pathName === '/') {
    return 'bg-white bg-opacity-10';
  }

  return 'bg-gradient-to-r	from-[#FF4B12] to-[#4200FF] dark:from-gray-700 dark:to-gray-900';
};

export const MainNavigationBar = () => {
  const pathName = usePathname();

  return (
    <section
      className={cn('p-2 flex justify-end', getBackgroundStyles(pathName))}
    >
      <DesktopNavbar />
      <MobileNavbar />
    </section>
  );
};
