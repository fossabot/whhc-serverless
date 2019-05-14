import { EntryCollection } from 'contentful';
import { DateTime } from 'luxon';

import { client, getTagIdByName, IList } from '../contentful';

import { NewsArticle } from './news-article.class';
import { SimilarNews } from './news.entity';
import {
  deleteSimilarNewsAritcle,
  setSimilarNewsAritcle,
} from './news.repository';
import { INewsEntry, INewsParams } from './news.types';

export const getNews = async ({
  limit = 100,
  skip = 0,
  slugs,
  tag,
  hasPhotos,
}: INewsParams): Promise<IList<NewsArticle>> => {
  const query = {
    content_type: 'newsArticle',
    limit,
    order: '-fields.date',
    skip,
  };

  if (slugs) query['fields.slug[in]'] = slugs.join(',');

  if (tag) query['fields.tags.sys.id'] = await getTagIdByName(tag);

  if (hasPhotos) query['fields.photos[exists]'] = true;

  const response = (await client.getEntries(query)) as EntryCollection<
    INewsEntry
  >;

  const items = response.items.map(item => new NewsArticle(item));

  return {
    count: response.total,
    items,
  };
};

export const setSimilarNews = async (): Promise<void> => {
  let count: number;
  let articles: NewsArticle[] = [];

  while (!count || articles.length < count) {
    const response = await getNews({ skip: articles.length });
    count = response.count;
    articles = [...articles, ...response.items];
  }

  await Promise.all(
    articles.map(article => {
      const similarSlugs = getScores(article, articles).slice(0, 4);

      const similarNewsEntry = new SimilarNews();

      similarNewsEntry.id = article.id;
      similarNewsEntry.slug = article.slug;
      similarNewsEntry.similarSlugs = similarSlugs;

      return setSimilarNewsAritcle(similarNewsEntry);
    }),
  );

  return;
};

export const deleteSimilarNews = async (id: string): Promise<void> => {
  await deleteSimilarNewsAritcle(id);
  return;
};

const getScores = (
  currentArticle: NewsArticle,
  comparisonArticles: NewsArticle[],
): string[] =>
  [...comparisonArticles]
    .reduce((result, comparisonArticle) => {
      if (currentArticle.id === comparisonArticle.id) return result;

      const slug = comparisonArticle.slug;

      const score =
        getDateScore(comparisonArticle.date) *
        getSimilarTagScore(currentArticle.tags, comparisonArticle.tags);

      result.push({ slug, score });

      return result;
    }, [])
    .sort((a, b) => b.score - a.score)
    .map(a => a.slug);

const getDateScore = (date: string): number => {
  const { days } = DateTime.fromISO(date).diffNow('days');
  return Math.max(0.05, Math.pow(1 / Math.abs(days), 0.4));
};

const getSimilarTagScore = (
  articleTags: string[],
  similarTags: string[],
): number => {
  const matchCount: number = similarTags.reduce(
    (total: number, tag) => (articleTags.indexOf(tag) >= 0 ? total + 1 : total),
    0,
  );

  const totalCount = articleTags.length;

  return Math.max(0.05, Math.pow(matchCount / totalCount, 2));
};
