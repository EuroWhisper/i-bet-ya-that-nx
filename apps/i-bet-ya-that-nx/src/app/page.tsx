import { getPredictionSuggestion } from '@i-bet-ya-that-nx/chatgpt';
import { HomeContent } from '../modules/home/HomeContent';

export const dynamic = 'force-dynamic';

const getData = async () => {
  try {
    const suggestion = await getPredictionSuggestion();

    return suggestion.content;
  } catch (e) {
    return null;
  }
};

export default async function Home() {
  const predictionSuggestion = await getData();

  return (
    <HomeContent
      predictionSuggestion={predictionSuggestion ?? 'Enter a prediction...'}
    />
  );
}
