'use client';

import { useCallback, useState } from 'react';
import { PredictionWithUser } from '@i-bet-ya-that-nx/prisma-shared';
import {
  ConfirmationDialog,
  LayoutSheet,
  Text,
} from '@i-bet-ya-that-nx/ui-common';
import { useAction } from 'next-safe-action/hooks';

import { deletePrediction, verifyPrediction } from '../../..//actions';
import { useNotification } from '../../..//hooks';
import { PredictionsList } from '../../../components/shared/PredictionsList/PredictionsList';
import { MainNavigationBar } from '../../home/MainNavigationBar/MainNavigationBar';

type Props = {
  predictions?: PredictionWithUser[];
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

  const {
    executeAsync: executeVerifyPredictionCorrect,
    isExecuting: isVerifyCorrectLoading,
  } = useAction(verifyPrediction, {
    onSuccess: () => {
      notify({
        description: 'Your prediction has been verified successfully',
        type: 'success',
      });
    },
    onError: (e) => {
      notify({
        description: `An error occurred while verifying your prediction: ${e.error.serverError}`,
        type: 'error',
      });
    },
    onSettled: () => {
      setIsVerifyConfirmationDialogOpen(false);
    },
  });

  const {
    executeAsync: executeVerifyPredictionIncorrect,
    isExecuting: isVerifyIncorrectLoading,
  } = useAction(verifyPrediction, {
    onSuccess: () => {
      notify({
        description: 'Your prediction has been verified successfully',
        type: 'success',
      });
    },
    onError: (e) => {
      notify({
        description: `An error occurred while verifying your prediction: ${e.error.serverError}`,
        type: 'error',
      });
    },
    onSettled: () => {
      setIsVerifyConfirmationDialogOpen(false);
    },
  });

  const [predictionDeletionTargetId, setPredictionDeletionTargetId] =
    useState<number>();
  const [predictionVerificationTargetId, setPredictionVerificationTargetId] =
    useState<number>();

  const [isVerifyConfirmationDialogOpen, setIsVerifyConfirmationDialogOpen] =
    useState(false);

  const handleDeletePrediction = useCallback(
    async (id: number) => {
      setPredictionDeletionTargetId(id);
      await executeAsync({ id });
      setPredictionDeletionTargetId(undefined);
    },
    [executeAsync]
  );

  const handleConfirmVerifyPrediction = async (isCorrect: boolean) => {
    if (!predictionVerificationTargetId) return;

    if (isCorrect) {
      executeVerifyPredictionCorrect({
        id: predictionVerificationTargetId,
        isCorrect,
      });
      return;
    }

    executeVerifyPredictionIncorrect({
      id: predictionVerificationTargetId,
      isCorrect,
    });
  };

  return (
    <>
      <MainNavigationBar />
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
              onVerify={(id) => {
                setPredictionVerificationTargetId(id);
                setIsVerifyConfirmationDialogOpen(true);
              }}
            />
          </section>
        )}
      </LayoutSheet>
      <ConfirmationDialog
        description="If you were correct in your prediction, verify it as correct to earn points"
        isPrimaryLoading={isVerifyCorrectLoading}
        isSecondaryLoading={isVerifyIncorrectLoading}
        open={isVerifyConfirmationDialogOpen}
        primaryAction={() => handleConfirmVerifyPrediction(true)}
        primaryActionLabel="Correct"
        secondaryAction={() => handleConfirmVerifyPrediction(false)}
        secondaryActionLabel="Incorrect"
        title="Was your prediction correct?"
        onClose={() => setIsVerifyConfirmationDialogOpen(false)}
      />
    </>
  );
};
