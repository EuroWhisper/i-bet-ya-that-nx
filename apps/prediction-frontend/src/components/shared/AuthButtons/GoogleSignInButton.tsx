'use client';

import { Button, Text } from '@i-bet-ya-that-nx/ui-common';
import { signIn } from 'next-auth/react';

import { GoogleIcon } from '../../custom-icons/GoogleIcon/GoogleIcon';

type Props = {
  className?: string;
};

export const GoogleSignInButton = ({ className }: Props) => {
  return (
    <Button
      className={className}
      variant="secondary"
      onClick={() => signIn('google')}
    >
      <GoogleIcon size={16} />
      <Text className="ml-2">Sign in with Google</Text>
    </Button>
  );
};
