'use client';

import Link from 'next/link';
import {
  Button,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  Sheet,
  Stack,
  Text,
} from '@i-bet-ya-that-nx/ui-common';
import clsx from 'clsx';
import { LogOutIcon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

import { GoogleIcon } from '../../components/custom-icons/GoogleIcon/GoogleIcon';

export const HomeNavbar = () => {
  const session = useSession();
  const isSignedIn = !!session.data;

  return (
    <section className="p-2 flex justify-end bg-white bg-opacity-10">
      <Sheet>
        <NavigationMenu displayFrom="right">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(
                    navigationMenuTriggerStyle(),
                    'bg-transparent  text-white'
                  )}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(
                    navigationMenuTriggerStyle(),
                    'bg-transparent  text-white'
                  )}
                >
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {isSignedIn ? (
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={clsx(
                    navigationMenuTriggerStyle(),
                    'cursor-pointer'
                  )}
                  onClick={() => signOut()}
                >
                  <LogOutIcon className="mr-2" size={16} />
                  Sign out
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuTrigger>Sign in</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-6 w-96">
                    <Stack
                      gap={4}
                      horizontalAlign="center"
                      verticalAlign="center"
                    >
                      <Text>Username/Password sign-in coming soon...</Text>
                      <Button
                        variant="secondary"
                        onClick={() => signIn('google')}
                      >
                        <GoogleIcon size={16} />
                        <Text className="ml-2">Sign in with Google</Text>
                      </Button>
                    </Stack>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </Sheet>
    </section>
  );
};
