'use client';

import Link from 'next/link';
import {
  Button,
  LayoutSheet,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  Stack,
  Text,
} from '@i-bet-ya-that-nx/ui-common';
import clsx from 'clsx';
import { LogOutIcon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

import { GoogleIcon } from '../../../components/custom-icons/GoogleIcon/GoogleIcon';
import { ThemeToggle } from '../../../components/shared/ThemeToggle/ThemeToggle';

const homeNavbarItemStyles =
  'bg-transparent hover:bg-transparent  text-white hover:text-gray-200';

export const DesktopNavbar = () => {
  const session = useSession();
  const isSignedIn = !!session.data;

  return (
    <LayoutSheet className="hidden md:block w-full">
      <div className="w-full flex flex-row justify-between">
        <NavigationMenu displayFrom="right">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(
                    navigationMenuTriggerStyle(),
                    homeNavbarItemStyles
                  )}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {isSignedIn && (
              <>
                <NavigationMenuItem>
                  <Link href="/profile" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={clsx(
                        navigationMenuTriggerStyle(),
                        homeNavbarItemStyles
                      )}
                    >
                      Profile
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/predictions" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={clsx(
                        navigationMenuTriggerStyle(),
                        homeNavbarItemStyles
                      )}
                    >
                      Predictions
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            )}
            <NavigationMenuItem>
              <Link href="/leaderboard" legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(
                    navigationMenuTriggerStyle(),
                    homeNavbarItemStyles
                  )}
                >
                  Leaderboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(
                    navigationMenuTriggerStyle(),
                    homeNavbarItemStyles
                  )}
                >
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu displayFrom="right">
          <NavigationMenuList>
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
            <NavigationMenuItem>
              <ThemeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </LayoutSheet>
  );
};
