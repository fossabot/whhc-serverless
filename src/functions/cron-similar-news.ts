import { Handler } from 'aws-lambda';
import * as Raven from 'raven';
import * as RavenLambdaWrapper from 'serverless-sentry-lib';

import { setSimilarNews } from '../helpers/news';
import { createWarehouseEvent } from '../helpers/warehouse';

const handler: Handler = RavenLambdaWrapper.handler(Raven, async () => {
  let error: Error = null;

  try {
    await setSimilarNews();
  } catch (e) {
    error = e;
  }

  await createWarehouseEvent('CRON', {
    context: 'SIMILAR_NEWS',
    error,
  });

  return;
});

export { handler };
