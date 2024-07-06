import { Worker } from 'bullmq';
import { connection } from '../config';
import { processReminderJob } from '../jobs';

export const reminderWorker = new Worker('reminderQueue', processReminderJob, {
  connection,
});
