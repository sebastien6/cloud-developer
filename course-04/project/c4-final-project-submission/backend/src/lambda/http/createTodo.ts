import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createLogger } from '../../utils/logger'
import { createTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'

const logger = createLogger('api')

const createTodoHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    func: 'createTodoHandler',
    event: event
  })

  const newTodo: CreateTodoRequest = JSON.parse(event.body);
  const userId = getUserId(event)

  const item = await createTodo(userId, newTodo);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item,
    })
  };
}

export const handler = middy(createTodoHandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));
