import { VerificationStatus } from '@prisma/client';

import { Filters } from '../filters/FiltersPredictionsProvider';

export const getPredictionStatusText = (status: VerificationStatus) => {
  switch (status) {
    case VerificationStatus.VERIFIED_CORRECT:
      return 'Verified correct';
    case VerificationStatus.VERIFIED_INCORRECT:
      return 'Verified incorrect';
    case VerificationStatus.PENDING:
      return 'Pending';
    default:
      return 'Unknown';
  }
};

const PREDICTIONS_BASE = 'predictions';

export const createSearchUrl = (filters: Filters) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    // @ts-expect-error Value may be empty string in other properties later
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  return `/${PREDICTIONS_BASE}?${params.toString()}`;
};
