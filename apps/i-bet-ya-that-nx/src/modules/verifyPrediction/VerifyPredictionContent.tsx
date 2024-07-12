'use client';

import { useEffect } from 'react';
import { Button, Card, Stack } from '@i-bet-ya-that-nx/ui-common';
import { Prediction } from '@prisma/client';

import { verifyPrediction } from '../../app/actions';
import { useNotification, useServerAction } from '../../hooks';

type Props = {
  prediction: Prediction;
};

export const VerifyPredictionContent = ({ prediction }: Props) => {
  const notify = useNotification();

  const { executeAction, isPending, isSuccess, isError } =
    useServerAction(verifyPrediction);

  useEffect(() => {
    if (isSuccess) {
      notify({
        description: 'Prediction verified successfully',
        type: 'success',
      });
    }
  }, [isSuccess, notify]);

  useEffect(() => {
    if (isError) {
      notify({
        description: 'This prediction has already been verified',
        type: 'error',
      });
    }
  }, [isError, notify]);

  return (
    <Stack
      className="h-screen text-center"
      horizontalAlign="center"
      verticalAlign="center"
    >
      <Card className="min-w-[32rem]">
        <Stack gap={2}>
          <h1 className="text-xl">Was your prediction correct?</h1>
          <p className="italic">{prediction.prediction}</p>
        </Stack>
        <Stack className="mt-8" gap={4} horizontal>
          <Button
            disabled={isPending}
            onClick={() => {
              executeAction(prediction.id, true);
            }}
          >
            Yes
          </Button>
          <Button
            disabled={isPending}
            onClick={() => {
              executeAction(prediction.id, false);
            }}
          >
            No
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
};
