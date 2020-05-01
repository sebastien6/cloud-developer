import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

// import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { getAllTodos } from '../../businessLogic/todos'
const logger = createLogger('api')

export const getTodohandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event', {
    level: 'info',
    func: 'getTodohandler',
    event: event
  })
  const authorization = event.headers.Authorization;
  const split = authorization.split(' ');
  const jwtToken = split[1];

  const items = await getAllTodos(jwtToken)
  return {
    statusCode: 201,
    body: JSON.stringify({
      items,
    })
  };
}

export const handler = middy(getTodohandler)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }));