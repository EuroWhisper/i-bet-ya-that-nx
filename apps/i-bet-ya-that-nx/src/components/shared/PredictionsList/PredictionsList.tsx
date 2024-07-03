import { Prediction } from '@prisma/client';
import { Stack } from '../../common/Stack/Stack';
import { PredictionCard } from '../PredictionCard/PredictionCard';

type Props = {
  predictions: Prediction[];
};

export const PredictionsList = ({ predictions }: Props) => {
  return (
    <Stack gap={3}>
      {predictions.map((prediction) => (
        <PredictionCard
          key={prediction.id}
          email={prediction.email}
          prediction={prediction.prediction}
        />
      ))}
    </Stack>
  );
};
