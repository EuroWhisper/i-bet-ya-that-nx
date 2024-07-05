import Image from 'next/image';
import { HomeForm } from './HomeForm';
import { Prediction } from '@prisma/client';
import { PredictionsList } from '../../components/shared/PredictionsList/PredictionsList';
import { Sheet } from '@i-bet-ya-that-nx/ui-common';
import { PageSection } from '../../components/shared/PageSection/PageSection';

type Props = {
  existingPredictions: Prediction[] | null;
  predictionSuggestion: string;
};

const HomeContent = ({ existingPredictions, predictionSuggestion }: Props) => {
  return (
    <main>
      <div className="flex min-h-screen flex-col items-center md:justify-center bg-gradient-to-br	from-[#FF4B12] to-[#4200FF]">
        <Image
          alt="Gambling doberman"
          src="/mascot.svg"
          width={320}
          height={320}
          priority
        />
        <h1 className="font-fugaz text-3xl md:text-6xl text-white mt-4">
          I bet ya that...
        </h1>
        <Sheet className="mt-8 w-full md:w-[40rem]">
          <HomeForm predictionSuggestion={predictionSuggestion} />
        </Sheet>
      </div>
      <Sheet>
        {existingPredictions && (
          <PageSection title="Latest predictions">
            <PredictionsList predictions={existingPredictions} />
          </PageSection>
        )}
        <PageSection title="What is this?">
          <p>
            This is an application where you can make predictions and track how
            often you are right or wrong. You can suggest a prediction and set a
            date when it should be verified. You will receive an email with a
            link to verify the prediction.
          </p>
        </PageSection>
        <PageSection title="What else will be added?">
          <p>
            Soon, a point system will be implemented to keep track of your score
            and a leaderboard will be added to see who is the best predictor.
          </p>
          <p>
            Additionally, AI will be used to check the outcome of the
            predictions where possible. Not all predictions can be verified by
            AI, so some will have to be manually verified.
          </p>
          <p>
            The plan right now is to lock the amount of points you get when you
            successfully predict something to a lower amount if you had to
            manually verify it. While more points will be awarded if the AI can
            verify it. This is to help stop people from spamming predictions for
            lots of points that cannot be verified.
          </p>
        </PageSection>
      </Sheet>
    </main>
  );
};

export { HomeContent };
