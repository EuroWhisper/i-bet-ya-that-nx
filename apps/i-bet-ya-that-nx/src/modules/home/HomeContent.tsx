import Image from 'next/image';
import { HomeForm } from './HomeForm';
import { Prediction } from '@prisma/client';
import { PredictionsList } from '../../components/shared/PredictionsList/PredictionsList';

type Props = {
  existingPredictions: Prediction[] | null;
  predictionSuggestion: string;
};

const HomeContent = ({ existingPredictions, predictionSuggestion }: Props) => {
  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br	from-[#FF4B12] to-[#4200FF]">
        <Image
          alt="Gambling doberman"
          src="/mascot.svg"
          width={320}
          height={320}
          priority
        />
        <h1 className="font-fugaz text-6xl text-white mt-4">
          I bet ya that...
        </h1>
        <div className="mt-8 w-[32rem]">
          <HomeForm predictionSuggestion={predictionSuggestion} />
        </div>
      </div>
      {existingPredictions && (
        <div>
          <h2 className="text-2xl mt-8">Latest predictions</h2>
          <PredictionsList predictions={existingPredictions} />
        </div>
      )}
    </main>
  );
};

export { HomeContent };
