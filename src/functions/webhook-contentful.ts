import { Handler } from 'aws-lambda';
import * as Raven from 'raven';
import * as RavenLambdaWrapper from 'serverless-sentry-lib';

import {
  CONTENTFUL_WEBHOOK_EVENTS,
  isValidApiKey,
} from '../helpers/contentful';
import { deleteSimilarNews, setSimilarNews } from '../helpers/news';
import { createWarehouseEvent } from '../helpers/warehouse';

const handler: Handler = RavenLambdaWrapper.handler(
  Raven,
  async (event: any) => {
    if (!event.headers.apikey) {
      return {
        body: 'apikey is missing',
        statusCode: 400,
      };
    }

    if (!isValidApiKey(event.headers.apikey)) {
      return {
        body: `apikey is invalid`,
        statusCode: 403,
      };
    }

    const { contentType, id, user } = JSON.parse(event.body);

    if (!contentType || !id) {
      return {
        statusCode: 400,
      };
    }

    const action = `${contentType}_${event.headers[
      'X-Contentful-Topic'
    ].replace(/^.*\./, '')}`.toUpperCase() as CONTENTFUL_WEBHOOK_EVENTS;

    if (contentType === 'newsArticle') {
      await setSimilarNews();

      await createWarehouseEvent('WEBHOOK', {
        action,
        contentType,
        context: 'CONTENTFUL',
        id,
        user,
      });
    }

    return {
      statusCode: 201,
    };
  },
);

export { handler };
