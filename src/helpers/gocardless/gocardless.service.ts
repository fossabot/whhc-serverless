import { createHmac } from 'crypto';

const secret = process.env.GOCARDLESS_SECRET;

const generateSignature = (jsonString: string) =>
  createHmac('sha256', secret)
    .update(jsonString)
    .digest('hex');

export const isValidSignature = (event): boolean =>
  generateSignature(event.body) === event.headers['Webhook-Signature'];
