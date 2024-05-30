import { PrismaClient, type Prediction } from '@prisma/client';
import { Redis } from 'ioredis';
import { Job, Queue, Worker } from 'bullmq';

console.log('Hi');

const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

const databaseCheckQueue = new Queue('databaseCheckQueue', { connection });

databaseCheckQueue.add('queuePredictions', null, {
  repeat: { pattern: '* * * * *' },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const databaseCheckWorker = new Worker(
  'databaseCheckQueue',
  async () => {
    console.log('Checking database for new predictions');
    await queuePredictions();
  },
  { connection }
);

const reminderQueue = new Queue('reminderQueue', { connection });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reminderWorker = new Worker(
  'reminderQueue',
  async (job: Job<Prediction>) => {
    console.log(job.data);
  },
  { connection }
);

const prisma = new PrismaClient();

async function queuePredictions() {
  try {
    const predictions = await prisma.prediction.findMany();

    reminderQueue.addBulk(
      predictions.map((prediction) => ({
        name: prediction.id.toString(),
        data: prediction,
        opts: { delay: Number(prediction.reminderDate) - Date.now() },
      }))
    );
  } catch {
    console.error('Error');
  }
}
