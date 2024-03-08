-- CreateTable
CREATE TABLE "Prediction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prediction" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "reminderDate" TIMESTAMP(3) NOT NULL,
    "reminderSent" BOOLEAN NOT NULL,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);
