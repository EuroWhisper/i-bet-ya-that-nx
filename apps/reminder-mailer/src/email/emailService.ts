import { EmailParams, Recipient } from 'mailersend';
import { mailerSend, sentFrom } from '../config';

export async function sendReminderEmail(
  recipientEmail: string,
  subject: string,
  htmlContent: string,
  textContent: string
) {
  const recipient = new Recipient(recipientEmail);

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo([recipient])
    .setReplyTo(sentFrom)
    .setSubject(subject)
    .setHtml(htmlContent)
    .setText(textContent);

  await mailerSend.email.send(emailParams);
}
