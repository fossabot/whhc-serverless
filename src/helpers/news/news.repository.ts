import { Repository } from 'typeorm';

import { Database } from '../../database';

import { SimilarNews } from './news.entity';

const getNewsRepository = async (): Promise<Repository<SimilarNews>> => {
  const connection = await new Database().getConnection();
  const newsRepository = await connection.getRepository(SimilarNews);

  return newsRepository;
};

export const getSimilarNews = async (): Promise<SimilarNews[]> => {
  const newsRepository = await getNewsRepository();
  return await newsRepository.find();
};

export const getSimilarNewsAritcle = async (
  id: string,
): Promise<SimilarNews> => {
  const newsRepository = await getNewsRepository();
  return await newsRepository.findOne(id);
};

export const setSimilarNewsAritcle = async (
  similarNewsEntry: SimilarNews,
): Promise<SimilarNews> => {
  const newsRepository = await getNewsRepository();
  return await newsRepository.save(similarNewsEntry);
};

export const deleteSimilarNewsAritcle = async (
  id: string,
): Promise<SimilarNews> => {
  const newsRepository = await getNewsRepository();
  const article = await getSimilarNewsAritcle(id);

  await newsRepository.remove(article);

  return;
};
