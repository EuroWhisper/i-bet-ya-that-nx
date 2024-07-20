import { LayoutSheet, Text } from '@i-bet-ya-that-nx/ui-common';
import { Prediction } from '@prisma/client';
import { SessionProvider } from 'next-auth/react';

import { PredictionsList } from '../../../components/shared/PredictionsList/PredictionsList';
import { MainNavigationBar } from '../../home/MainNavigationBar/MainNavigationBar';

type Props = {
  predictions?: Prediction[];
};

export const PredictionsOverviewContent = ({ predictions }: Props) => {
  return (
    <div>
      <SessionProvider>
        <MainNavigationBar />
      </SessionProvider>
      <LayoutSheet>
        <Text className="mt-8 text-center" variant="h1">
          Predictions overview
        </Text>
        {predictions && (
          <section className="my-8">
            <PredictionsList predictions={predictions} />
          </section>
        )}
      </LayoutSheet>
    </div>
  );
};
