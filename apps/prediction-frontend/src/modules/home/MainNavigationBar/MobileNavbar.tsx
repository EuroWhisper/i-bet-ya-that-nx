'use client';

import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Stack,
} from '@i-bet-ya-that-nx/ui-common';
import { SquareMenu } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { ThemeToggle } from '../../..//components/shared/ThemeToggle/ThemeToggle';
import { GoogleSignInButton } from '../../../components/shared/AuthButtons/GoogleSignInButton';
import { SignOutButton } from '../../../components/shared/AuthButtons/SignOutButton';

export const MobileNavbar = () => {
  const session = useSession();
  const isSignedIn = !!session.data;

  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <SquareMenu className="stroke-white" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <Stack className="mt-4" gap={4}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <ThemeToggle />
        </Stack>
        <div className="mt-4">
          {!isSignedIn && <GoogleSignInButton className="w-full" />}
          {isSignedIn && <SignOutButton className="w-full" />}
        </div>
      </SheetContent>
    </Sheet>
  );
};
