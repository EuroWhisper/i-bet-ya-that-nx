import { Queue } from 'bullmq';
import { connection } from '../config';

export const databaseCheckQueue = new Queue('databaseCheckQueue', {
  connection,
});
