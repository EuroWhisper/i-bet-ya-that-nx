import { getPredictionSuggestion } from '@i-bet-ya-that-nx/chatgpt';
import { HomeContent } from '../modules/home/HomeContent';
import { PrismaClient } from '@prisma/client';
import { unstable_cache as cache } from 'next/cache';

export const dynamic = 'force-dynamic';

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
      const predictions = await prisma.prediction.findMany({ take });
      return predictions;
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
  const TAKE_LAST_FOUR_PREDICTIONS = -4;
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
