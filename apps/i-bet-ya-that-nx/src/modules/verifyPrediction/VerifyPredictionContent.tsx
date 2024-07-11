'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Stack, Toast } from '@i-bet-ya-that-nx/ui-common';
import { Prediction } from '@prisma/client';

import { verifyPrediction } from '../../app/actions';
import { useServerAction } from '../../hooks';

type Props = {
  prediction: Prediction;
};

export const VerifyPredictionContent = ({ prediction }: Props) => {
  const [open, setOpen] = useState(false);

  const { executeAction, isPending, isSuccess } =
    useServerAction(verifyPrediction);

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
    }
  }, [isSuccess, setOpen]);

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
      <Toast open={open} onOpenChange={setOpen}>
        <h2>Verified successfully!</h2>
      </Toast>
    </Stack>
  );
};
