import { Prediction } from '@prisma/client';

import { formatDate } from '../../../utils';
import { PredictionCard } from '../PredictionCard/PredictionCard';
type Props = {
  predictions: Prediction[];
  predictionDeletionTargetId?: number;
  onDelete?: (id: number) => void;
};

export const PredictionsList = ({
  predictions,
  predictionDeletionTargetId,
  onDelete,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {predictions.map((prediction) => (
        <PredictionCard
          key={prediction.id}
          date={formatDate(prediction.reminderDate)}
          email={prediction.email}
          id={prediction.id}
          isDeleting={prediction.id === predictionDeletionTargetId}
          prediction={prediction.prediction}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
