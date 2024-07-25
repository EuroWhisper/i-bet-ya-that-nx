import type { Prediction, User } from '@prisma/client';

export type PredictionWithUser = Prediction & { user: User | null };
