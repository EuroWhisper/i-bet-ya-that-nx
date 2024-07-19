'use client';

import { Button } from '@i-bet-ya-that-nx/ui-common';
import clsx from 'clsx';
import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';

type Props = {
  className?: string;
};

export const SignOutButton = ({ className }: Props) => {
  return (
    <Button
      className={clsx('cursor-pointer', className)}
      variant="secondary"
      onClick={() => signOut()}
    >
      <LogOutIcon className="mr-2" size={16} />
      Sign out
    </Button>
  );
};
