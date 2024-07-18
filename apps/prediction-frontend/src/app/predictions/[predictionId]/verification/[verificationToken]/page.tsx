import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { VerifyPredictionContent } from '../../../../../modules/predictions/';
import { getPredictionById } from '../../../../../queries/predictions';

export const metadata: Metadata = {
  title: 'I Bet Ya That - Verify Prediction',
};

type Params = {
  predictionId: string;
  verificationToken: string;
};

export default async function VerificationPage({ params }: { params: Params }) {
  const prediction = await getPredictionById(params.predictionId);

  if (!prediction) {
    notFound();
  }

  return <VerifyPredictionContent prediction={prediction} />;
}
