import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import * as middy from 'middy';
import { cors, httpErrorHandler } from 'middy/middlewares';

import { createLogger } from '../../utils/logger';
import { uploadUrl } from '../../businessLogic/todos'
import { getUserId } from '../utils'

const logger = createLogger('api');

export const uploadUrlHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
logger.info('Processing event', {
    func: 'uploadUrlHandler',
    event: event
    })
  const todoId = event.pathParameters.todoId;
  const userId = getUserId(event)

  const url = await uploadUrl(userId, todoId);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
        uploadUrl: url,
    })
  };
}

export const handler = middy(uploadUrlHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));