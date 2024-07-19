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

export const MobileNavbar = () => {
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
        </Stack>
      </SheetContent>
    </Sheet>
  );
};
