import { prisma } from '../database';
import { reminderQueue } from '../queues';

export async function queuePredictions() {
  try {
    const predictions = await prisma.prediction.findMany({
      where: { reminderSent: false },
    });

    if (predictions.length > 0) {
      await reminderQueue.addBulk(
        predictions.map((prediction) => ({
          name: prediction.id.toString(),
          data: prediction,
          opts: { delay: Number(prediction.reminderDate) - Date.now() },
        }))
      );
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
