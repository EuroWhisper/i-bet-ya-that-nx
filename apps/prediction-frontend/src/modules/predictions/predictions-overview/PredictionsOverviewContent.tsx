'use client';

import { useState } from 'react';
import { LayoutSheet, Text } from '@i-bet-ya-that-nx/ui-common';
import { Prediction } from '@prisma/client';
import { SessionProvider } from 'next-auth/react';
import { useAction } from 'next-safe-action/hooks';

import { deletePrediction } from '../../..//actions';
import { useNotification } from '../../..//hooks';
import { PredictionsList } from '../../../components/shared/PredictionsList/PredictionsList';
import { MainNavigationBar } from '../../home/MainNavigationBar/MainNavigationBar';

type Props = {
  predictions?: Prediction[];
};

export const PredictionsOverviewContent = ({ predictions }: Props) => {
  const notify = useNotification();
  const { executeAsync } = useAction(deletePrediction, {
    onSuccess: ({ data }) => {
      notify({ description: data?.success || '', type: 'success' });
    },
    onError: () =>
      notify({ description: 'Prediction could not be deleted', type: 'error' }),
  });

  const [predictionDeletionTargetId, setPredictionDeletionTargetId] =
    useState<number>();

  const handleDeletePrediction = async (id: number) => {
    setPredictionDeletionTargetId(id);
    await executeAsync({ id });
    setPredictionDeletionTargetId(undefined);
  };

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
            <PredictionsList
              predictionDeletionTargetId={predictionDeletionTargetId}
              predictions={predictions}
              onDelete={handleDeletePrediction}
            />
          </section>
        )}
      </LayoutSheet>
    </div>
  );
};
