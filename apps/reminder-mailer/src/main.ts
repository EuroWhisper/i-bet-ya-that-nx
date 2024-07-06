import { databaseCheckQueue } from './queues';
import './workers';

console.log('Running reminder mailer...');

async function clearAndSetupRepeatableJob() {
  await databaseCheckQueue.obliterate({ force: true });
  console.log('All jobs cleared from the queue.');

  await databaseCheckQueue.add('queuePredictions', null, {
    repeat: { pattern: '*/10 * * * *' },
  });
  console.log('New repeatable job added with cron: */10 * * * *');
}

clearAndSetupRepeatableJob();
