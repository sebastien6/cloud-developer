import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createLogger } from '../../utils/logger'
import { updateTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'

const logger = createLogger('api');

export const updateHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event', {
        func: 'createTodoHandler',
        event: event
    })

    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    const userId = getUserId(event);

    const item = await updateTodo(userId, todoId, updatedTodo);

    return {
        statusCode: 201,
        body: JSON.stringify({
            item,
        })
    };
}

export const handler = middy(updateHandler)
    .use(httpErrorHandler())
    .use(cors({ credentials: true }));