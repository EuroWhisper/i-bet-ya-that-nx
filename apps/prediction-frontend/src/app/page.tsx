import { type Metadata } from 'next';
import { unstable_cache as cache } from 'next/cache';
import { getPredictionSuggestion } from '@i-bet-ya-that-nx/chatgpt';

import { HomeContent } from '../modules/home/HomeContent';
import { prisma } from '../utils/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'I Bet Ya That - Home',
};

const getData = async () => {
  try {
    const suggestion = await getPredictionSuggestion();

    return suggestion.content;
  } catch (e) {
    return null;
  }
};

const getExistingPredictions = cache(
  async (take: number) => {
    try {
      const predictions = await prisma.prediction.findMany({
        take,
        orderBy: { createdAt: 'desc' },
        include: { user: true },
      });

      return predictions;
    } catch (e) {
      return null;
    } finally {
      prisma.$disconnect();
    }
  },
  undefined,
  { tags: ['predictions'] }
);

export default async function Home() {
  const TAKE_LAST_FOUR_PREDICTIONS = 4;
  const predictionSuggestion = await getData();
  const existingPredictions = await getExistingPredictions(
    TAKE_LAST_FOUR_PREDICTIONS
  );

  return (
    <HomeContent
      existingPredictions={existingPredictions}
      predictionSuggestion={predictionSuggestion ?? 'Enter a prediction...'}
    />
  );
}
