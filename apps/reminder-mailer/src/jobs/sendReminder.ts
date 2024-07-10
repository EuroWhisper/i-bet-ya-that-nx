import { Job } from 'bullmq';
import { render } from '@react-email/components';
import { prisma } from '../database';
import { sendReminderEmail } from '../email';
import { ReminderEmailTemplate } from '@i-bet-ya-that-nx/email-templates';
import { Prediction, VerificationStatus } from '@prisma/client';

export async function processReminderJob(job: Job<Prediction>) {
  console.log('Processing job:', job.data);

  const renderedHtml = render(
    ReminderEmailTemplate({
      prediction: job.data.prediction,
      predictionDate: job.data.reminderDate.toString(),
      verificationUrl: '',
    })
  );

  try {
    await sendReminderEmail(
      job.data.email,
      `It's time to verify your prediction`,
      renderedHtml,
      'This is the text content'
    );
    await prisma.prediction.update({
      where: { id: job.data.id },
      data: { verificationStatus: VerificationStatus.REMINDER_EMAIL_SENT },
    });
  } catch (e) {
    console.log(e);
  }
}
