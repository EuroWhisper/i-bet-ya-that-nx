import { PrismaClient, type Prediction } from '@prisma/client';
import { Job, Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API,
});

const sentFrom = new Sender(process.env.MAILERSEND_SENDER);

console.log('Running reminder mailer...');

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableOfflineQueue: false,
});

const databaseCheckQueue = new Queue('databaseCheckQueue', { connection });

async function clearAndSetupRepeatableJob() {
  // Clear all jobs from the queue
  await databaseCheckQueue.obliterate({ force: true });
  console.log('All jobs cleared from the queue.');

  // Add new repeatable job
  await databaseCheckQueue.add('queuePredictions', null, {
    repeat: { pattern: '*/10 * * * *' }, // Check for new entries every 10 minutes
  });
  console.log('New repeatable job added with cron: 0 0 * * * *');
}

clearAndSetupRepeatableJob();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const databaseCheckWorker = new Worker(
  'databaseCheckQueue',
  async () => {
    console.log('Checking database for new predictions');
    await queuePredictions();
  },
  {
    connection,
  }
);

const reminderQueue = new Queue('reminderQueue', { connection });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reminderWorker = new Worker(
  'reminderQueue',
  async (job: Job<Prediction>) => {
    console.log('Processing job:', job.data);

    console.log('Sending reminder email...');

    const recipient = new Recipient(job.data.email);

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo([recipient])
      .setReplyTo(sentFrom)
      .setSubject('This is a Subject')
      .setHtml('<strong>This is the HTML content</strong>')
      .setText('This is the text content');

    try {
      await mailerSend.email.send(emailParams);
      await prisma.prediction.update({
        where: { id: job.data.id },
        data: { reminderSent: true },
      });
    } catch (e) {
      console.log(e);
    }
  },
  {
    connection,
  }
);

const prisma = new PrismaClient();

async function queuePredictions() {
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
