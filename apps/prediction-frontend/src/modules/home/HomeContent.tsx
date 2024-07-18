import { Sheet, Text } from '@i-bet-ya-that-nx/ui-common';
import { Prediction } from '@prisma/client';

import { PageSection } from '../../components/shared/PageSection/PageSection';
import { PredictionsList } from '../../components/shared/PredictionsList/PredictionsList';
import { ThemeToggle } from '../../components/shared/ThemeToggle/ThemeToggle';

import { HomeHeader } from './HomeHeader';

type Props = {
  existingPredictions: Prediction[] | null;
  predictionSuggestion: string;
};

const HomeContent = ({ existingPredictions, predictionSuggestion }: Props) => {
  return (
    <main>
      <HomeHeader predictionSuggestion={predictionSuggestion} />
      <Sheet>
        <ThemeToggle />
        {existingPredictions && (
          <PageSection title="Latest predictions">
            <PredictionsList predictions={existingPredictions} />
          </PageSection>
        )}
        <PageSection title="What is this?">
          <Text>
            This is an application where you can make predictions and track how
            often you are right or wrong. You can suggest a prediction and set a
            date when it should be verified. You will receive an email with a
            link to verify the prediction.
          </Text>
        </PageSection>
        <PageSection title="What else will be added?">
          <Text>
            Soon, a point system will be implemented to keep track of your score
            and a leaderboard will be added to see who is the best predictor.
          </Text>
          <Text>
            Additionally, AI will be used to check the outcome of the
            predictions where possible. Not all predictions can be verified by
            AI, so some will have to be manually verified.
          </Text>
          <Text>
            The plan right now is to lock the amount of points you get when you
            successfully predict something to a lower amount if you had to
            manually verify it. While more points will be awarded if the AI can
            verify it. This is to help stop people from spamming predictions for
            lots of points that cannot be verified.
          </Text>
        </PageSection>
      </Sheet>
    </main>
  );
};

export { HomeContent };
