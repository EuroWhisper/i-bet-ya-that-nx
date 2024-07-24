import { VerificationStatus } from '@prisma/client';

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
