'use client';

import { Button, Card, Stack, Text } from '@i-bet-ya-that-nx/ui-common';
import { Prediction } from '@prisma/client';
import { useAction } from 'next-safe-action/hooks';

import { verifyPrediction } from '../../../actions';
import { useNotification } from '../../../hooks';

type Props = {
  prediction: Prediction;
};

export const VerifyPredictionContent = ({ prediction }: Props) => {
  const notify = useNotification();

  const { execute: executeVerifyPrediction, isExecuting } = useAction(
    verifyPrediction,
    {
      onSuccess: () => {
        notify({
          description: 'Your prediction has been verified successfully',
          type: 'success',
        });
      },
      onError: (e) => {
        console.log(e);
        notify({
          description: `An error occurred while verifying your prediction: ${e.error.serverError}`,
          type: 'error',
        });
      },
    }
  );

  return (
    <Stack
      className="h-screen text-center"
      horizontalAlign="center"
      verticalAlign="center"
    >
      <Card className="min-w-[32rem]">
        <Stack gap={2}>
          <Text variant="h3">Was your prediction correct?</Text>
          <Text italic>{prediction.prediction}</Text>
        </Stack>
        <Stack className="mt-8" gap={4} horizontal>
          <Button
            isLoading={isExecuting}
            onClick={() => {
              executeVerifyPrediction({ id: prediction.id, isCorrect: true });
            }}
          >
            Yes
          </Button>
          <Button
            isLoading={isExecuting}
            onClick={() => {
              executeVerifyPrediction({ id: prediction.id, isCorrect: false });
            }}
          >
            No
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
};
