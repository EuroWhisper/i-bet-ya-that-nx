import { type Metadata } from 'next';
import { unstable_cache as cache } from 'next/cache';
import { PrismaClient } from '@prisma/client';

import { VerifyPredictionContent } from '../../../../../modules/predictions/';

export const metadata: Metadata = {
  title: 'I Bet Ya That - Verify Prediction',
};

type Params = {
  predictionId: string;
  verificationToken: string;
};

const getPredictionById = cache(
  async (predictionId: string) => {
    const prisma = new PrismaClient();
    try {
      const prediction = await prisma.prediction.findUnique({
        where: {
          id: parseInt(predictionId),
        },
      });
      return prediction;
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      prisma.$disconnect();
    }
  },
  undefined,
  { tags: ['predictions'] }
);

export default async function VerificationPage({ params }: { params: Params }) {
  const prediction = await getPredictionById(params.predictionId);

  if (!prediction) {
    return <div>Prediction not found</div>;
  }

  return <VerifyPredictionContent prediction={prediction} />;
}
