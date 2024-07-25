import { PredictionWithUser } from '@i-bet-ya-that-nx/prisma-shared';

import { formatDate } from '../../../utils';
import { PredictionCard } from '../PredictionCard/PredictionCard';
type Props = {
  predictions: PredictionWithUser[];
  predictionDeletionTargetId?: number;
  onDelete?: (id: number) => void;
  onVerify?: (id: number) => void;
};

export const PredictionsList = ({
  predictions,
  predictionDeletionTargetId,
  onDelete,
  onVerify,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {predictions.map((prediction) => (
        <PredictionCard
          key={prediction.id}
          date={formatDate(prediction.reminderDate)}
          id={prediction.id}
          isDeleting={prediction.id === predictionDeletionTargetId}
          nickname={prediction.user?.nickname || 'Anonymous'}
          prediction={prediction.prediction}
          status={prediction.verificationStatus}
          onDelete={onDelete}
          onVerify={onVerify}
        />
      ))}
    </div>
  );
};
