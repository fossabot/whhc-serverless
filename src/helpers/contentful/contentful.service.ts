import { createClient } from 'contentful';

export const client = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  space: process.env.CONTENTFUL_SPACE,
});

export const isValidApiKey = (key: string): boolean =>
  key === process.env.webhookApiKey;
