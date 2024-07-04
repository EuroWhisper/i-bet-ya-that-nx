import Image from 'next/image';
import { HomeForm } from './HomeForm';
import { Prediction } from '@prisma/client';
import { PredictionsList } from '../../components/shared/PredictionsList/PredictionsList';
import { Sheet } from '../../components/common/Sheet/Sheet';
import { PageSection } from '../../components/shared/PageSection/PageSection';

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
      <Sheet>
        {existingPredictions && (
          <PageSection title="Latest predictions">
            <PredictionsList predictions={existingPredictions} />
          </PageSection>
        )}
      </Sheet>
    </main>
  );
};

export { HomeContent };
