import 'source-map-support/register';
import * as middy from 'middy';
import { cors, httpErrorHandler } from 'middy/middlewares';
import { getUserId } from '../utils';
import { createLogger } from '../../utils/logger';
import { getAllTodos } from '../../businessLogic/todos';
const logger = createLogger('api');
export const getTodohandler = async (event) => {
    logger.info('Processing event', {
        level: 'info',
        func: 'getTodohandler',
        event: event
    });
    const jwtToken = getUserId(event);
    const items = await getAllTodos(jwtToken);
    return {
        statusCode: 201,
        body: JSON.stringify({
            items,
        })
    };
};
export const handler = middy(getTodohandler)
    .use(httpErrorHandler())
    .use(cors);
//# sourceMappingURL=getTodos.js.map