import { type Metadata } from 'next';
import { unstable_cache as cache } from 'next/cache';
import { getPredictionSuggestion } from '@i-bet-ya-that-nx/chatgpt';
import { PrismaClient } from '@prisma/client';

import { HomeContent } from '../modules/home/HomeContent';

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
    const prisma = new PrismaClient();

    try {
      const predictions = await prisma.prediction.findMany({
        take,
        orderBy: { createdAt: 'desc' },
      });
      const emailObfuscatedPredictions = predictions.map((prediction) => ({
        ...prediction,
        email: prediction.email.replace(
          /^(.)(.*)(.@.*)$/,
          (_, first, middle, last) =>
            `${first}${middle.replace(/./g, '*')}${last}`
        ),
      }));
      return emailObfuscatedPredictions;
    } catch (e) {
      console.log(e);
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
