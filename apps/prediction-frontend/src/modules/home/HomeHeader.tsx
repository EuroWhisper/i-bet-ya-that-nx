'use client';

import Image from 'next/image';
import { Sheet, Text } from '@i-bet-ya-that-nx/ui-common';
import { SessionProvider } from 'next-auth/react';

import { HomeForm } from './HomeForm';
import { HomeNavbar } from './HomeNavbar/HomeNavbar';

type Props = {
  predictionSuggestion: string;
};

export const HomeHeader = ({ predictionSuggestion }: Props) => {
  return (
    <SessionProvider>
      <section className="h-screen bg-gradient-to-br	from-[#FF4B12] to-[#4200FF] dark:from-gray-700 dark:to-gray-900">
        <HomeNavbar />
        <div className="h-full flex flex-col items-center md:justify-center ">
          <Image
            alt="Gambling doberman"
            height={320}
            src="/mascot.svg"
            width={320}
            priority
          />
          <Text className="font-fugaz md:text-6xl text-white mt-4" variant="h1">
            I bet ya that...
          </Text>
          <Sheet className="mt-8 w-full md:w-[40rem]">
            <HomeForm predictionSuggestion={predictionSuggestion} />
          </Sheet>
        </div>
      </section>
    </SessionProvider>
  );
};
