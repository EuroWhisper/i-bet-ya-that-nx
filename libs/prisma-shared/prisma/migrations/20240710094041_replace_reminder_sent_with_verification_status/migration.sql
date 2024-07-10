/*
  Warnings:

  - You are about to drop the column `reminderSent` on the `Prediction` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'REMINDER_EMAIL_SENT', 'VERIFIED_CORRECT', 'VERIFIED_INCORRECT');

-- AlterTable
ALTER TABLE "Prediction" DROP COLUMN "reminderSent",
ADD COLUMN     "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING';
