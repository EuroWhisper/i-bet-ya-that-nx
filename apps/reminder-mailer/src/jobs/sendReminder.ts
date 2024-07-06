import { Job } from 'bullmq';
import { prisma } from '../database';
import { sendReminderEmail } from '../email';

export async function processReminderJob(job: Job) {
  console.log('Processing job:', job.data);

  try {
    await sendReminderEmail(
      job.data.email,
      'This is a Subject',
      '<strong>This is the HTML content</strong>',
      'This is the text content'
    );
    await prisma.prediction.update({
      where: { id: job.data.id },
      data: { reminderSent: true },
    });
  } catch (e) {
    console.log(e);
  }
}
