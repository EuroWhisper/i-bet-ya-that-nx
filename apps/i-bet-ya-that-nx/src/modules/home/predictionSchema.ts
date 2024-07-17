import { z } from 'zod';

export const predictionSchema = z.object({
  prediction: z.string().min(1).max(300),
  confirmationDate: z.date(),
  email: z.string().email(),
});

export const verificationSchema = z.object({
  id: z.number(),
  isCorrect: z.boolean(),
});
