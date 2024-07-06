import { Worker } from 'bullmq';
import { connection } from '../config';
import { queuePredictions } from '../jobs';

export const databaseCheckWorker = new Worker(
  'databaseCheckQueue',
  async () => {
    console.log('Checking database for new predictions');
    await queuePredictions();
  },
  {
    connection,
  }
);
