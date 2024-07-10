/*
  Warnings:

  - A unique constraint covering the columns `[verificationToken]` on the table `Prediction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Prediction" ADD COLUMN     "verificationToken" TEXT NOT NULL DEFAULT gen_random_uuid();

-- CreateIndex
CREATE UNIQUE INDEX "Prediction_verificationToken_key" ON "Prediction"("verificationToken");
