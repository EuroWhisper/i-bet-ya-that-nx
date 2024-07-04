import { Prediction } from '@prisma/client';
import { PredictionCard } from '../PredictionCard/PredictionCard';
import { formatDate } from '../../../app/utils';
type Props = {
  predictions: Prediction[];
};

export const PredictionsList = ({ predictions }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {predictions.map((prediction) => (
        <PredictionCard
          key={prediction.id}
          email={prediction.email}
          prediction={prediction.prediction}
          date={formatDate(prediction.reminderDate)}
        />
      ))}
    </div>
  );
};
