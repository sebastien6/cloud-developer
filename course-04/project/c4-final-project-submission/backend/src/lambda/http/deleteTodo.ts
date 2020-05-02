import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { createLogger } from '../../utils/logger'
import { deleteTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'

const logger = createLogger('api')

const deleteHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event', {
        func: 'deleteHandler',
        event: event
    })
    const todoId = event.pathParameters.todoId;
    const userId = getUserId(event);

    await deleteTodo(userId, todoId);

    return {
        statusCode: 204,
        body: JSON.stringify({})
    };
}

export const handler = middy(deleteHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));