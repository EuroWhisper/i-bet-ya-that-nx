import { getPredictionSuggestion } from '@i-bet-ya-that-nx/chatgpt';
import { HomeContent } from '../modules/home/HomeContent';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const getData = async () => {
  try {
    const suggestion = await getPredictionSuggestion();

    return suggestion.content;
  } catch (e) {
    return null;
  }
};

const getExistingPredictions = async () => {
  const prisma = new PrismaClient();

  try {
    const predictions = await prisma.prediction.findMany();
    return predictions;
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    prisma.$disconnect();
  }
};

export default async function Home() {
  const predictionSuggestion = await getData();
  const existingPredictions = await getExistingPredictions();

  return (
    <HomeContent
      existingPredictions={existingPredictions}
      predictionSuggestion={predictionSuggestion ?? 'Enter a prediction...'}
    />
  );
}
