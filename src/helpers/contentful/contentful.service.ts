import { createClient, EntryCollection } from 'contentful';

import { ITagEntry } from './contentful.types';
export const client = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  space: process.env.CONTENTFUL_SPACE,
});

export const isValidApiKey = (key: string): boolean =>
  key === process.env.CONTENTFUL_WEBHOOK_API_KEY;

export const getTagIdByName = async (name: string): Promise<string> => {
  const query: { [key: string]: string | number } = {
    content_type: 'tag',
    'fields.name': name,
    limit: 1,
};

  const response = (await client.getEntries(query)) as EntryCollection<
    ITagEntry
  >;

  if (response.items.length === 0) throw new Error('Tag not found');

  return response.items[0].sys.id;
};
