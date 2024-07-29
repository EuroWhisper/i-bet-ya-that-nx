'use client';

import { LayoutSheet, Text } from '@i-bet-ya-that-nx/ui-common';

import { SharedLayout } from '../../components/shared/SharedLayout/SharedLayout';

export const AboutContent = () => {
  return (
    <SharedLayout>
      <LayoutSheet>
        <Text className="mt-8 text-center" variant="h1">
          About
        </Text>
        <Text className="mt-4 " variant="body">
          This application is built and maintained as a learning project, with
          the goal of expanding my knowledge of full-stack development. I am
          using it to learn more about NodeJS, Redis, Priisma and Postgres. I am
          also using it to learn the latest approach to using NextJS, as it has
          been several years since I last worked with it professionally.
        </Text>
      </LayoutSheet>
    </SharedLayout>
  );
};
