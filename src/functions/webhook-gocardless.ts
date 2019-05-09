import { Handler } from 'aws-lambda';
import * as Raven from 'raven';
import * as RavenLambdaWrapper from 'serverless-sentry-lib';

import { isValidSignature } from '../helpers/gocardless';
import { createWarehouseEvent } from '../helpers/warehouse';

const handler: Handler = RavenLambdaWrapper.handler(
  Raven,
  async (event: any) => {
    if (!isValidSignature(event)) {
      return {
        statusCode: 400,
      };
    }

    const data = JSON.parse(event.body);

    await Promise.all(
      data.events.map((gocardlessEvent: object) =>
        createWarehouseEvent('WEBHOOK', {
          ...gocardlessEvent,
          context: 'GOCARDLESS',
        }),
      ),
    );

    const response = {
      statusCode: 201,
    };

    return response;
  },
);

export { handler };
