import { Asset } from 'contentful';

export interface IImage {
  name: string;
  url: string;
  height: number;
  width: number;
}

export interface IList<T> {
  count: number;
  items: T[];
}

export interface IAuthorEntry {
  name: string;
  email: string;
  avatar: Asset;
}

export interface IAuthor {
  id: string;
  email: string;
  name: string;
  avatar: IImage;
}

export interface ITagEntry {
  name: string;
}

export type CONTENTFUL_WEBHOOK_EVENTS =
  | 'NEWSARTICLE_PUBLISH'
  | 'NEWSARTICLE_UNPUBLISH';
