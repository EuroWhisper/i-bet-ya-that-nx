'use client';

import { usePathname } from 'next/navigation';

import { MainNavigationBar } from '../../../modules/home/MainNavigationBar/MainNavigationBar';
import { Footer } from '../Footer/Footer';

type Props = {
  children: React.ReactNode;
};

export const SharedLayout = ({ children }: Props) => {
  const shouldShowNavigationBar = usePathname() !== '/';

  return (
    <div className="flex flex-col h-full">
      {shouldShowNavigationBar && <MainNavigationBar />}
      <main className="flex-1">{children}</main>
      <footer className="flex-shrink-0">
        <Footer />
      </footer>
    </div>
  );
};
