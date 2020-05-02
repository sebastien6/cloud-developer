import 'source-map-support/register';
import * as middy from 'middy';
import { cors, httpErrorHandler } from 'middy/middlewares';
import { createLogger } from '../../utils/logger';
import { createTodo } from '../../businessLogic/todos';
import { getUserId } from '../utils';
const logger = createLogger('api');
const createTodoHandler = async (event) => {
    logger.info('Processing event', {
        level: 'info',
        func: 'createTodoHandler',
        event: event
    });
    const newTodo = JSON.parse(event.body);
    const jwtToken = getUserId(event);
    const item = await createTodo(jwtToken, newTodo);
    return {
        statusCode: 201,
        body: JSON.stringify({
            item,
        })
    };
};
export const handler = middy(createTodoHandler)
    .use(httpErrorHandler())
    .use(cors);
//# sourceMappingURL=createTodo.js.map