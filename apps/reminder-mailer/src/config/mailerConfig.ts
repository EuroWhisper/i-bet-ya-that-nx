import { MailerSend, Sender } from 'mailersend';

export const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API,
});

export const sentFrom = new Sender(process.env.MAILERSEND_SENDER);
