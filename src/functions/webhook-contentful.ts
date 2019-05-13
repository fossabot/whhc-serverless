import { Handler } from 'aws-lambda';
import * as Raven from 'raven';
import * as RavenLambdaWrapper from 'serverless-sentry-lib';

import { isValidApiKey } from '../helpers/contentful';
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
        body: 'apikey is invalid',
        statusCode: 403,
      };
    }

    const { contentType, id, user } = JSON.parse(event.body);

    if (!contentType || !id) {
      return {
        statusCode: 400,
      };
    }

    const topic = event.headers['X-Contentful-Topic'].replace(/^.*\./, '');

    if (contentType === 'newsArticle') {
      let action: 'PUBLISH' | 'UNPUBLISH';

      if (topic === 'unpublish') {
        action = 'UNPUBLISH';
      } else if (topic === 'publish') {
        action = 'PUBLISH';
      }

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
