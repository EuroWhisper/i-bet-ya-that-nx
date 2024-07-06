import { Queue } from 'bullmq';
import { connection } from '../config';

export const reminderQueue = new Queue('reminderQueue', { connection });
