import { Document } from '@contentful/rich-text-types';
import { Asset, Entry } from 'contentful';

import { IAuthor, IAuthorEntry, IImage, ITagEntry } from '../contentful';

export interface INewsEntry {
  author: Entry<IAuthorEntry>;
  background: Asset;
  body: Document;
  date: string;
  photos?: Asset[];
  slug: string;
  tags: Array<Entry<ITagEntry>>; // tslint:disable-line prefer-array-literal
  thumb: Asset;
  title: string;
}

export interface INewsParams {
  limit?: number;
  skip?: number;
  slugs?: string[];
  tag?: string;
  hasPhotos?: boolean;
}

export interface ISimilarScore {
  slug: string;
  score: number;
}
