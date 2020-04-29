import { uuid } from 'uuid';
import { TodoAccess } from '../dataLayer/todosAccess';
import { parseUserId } from '../auth/utils';
const todoAccess = new TodoAccess();
export async function getAllTodos(jwtToken) {
    const userId = parseUserId(jwtToken);
    return todoAccess.getAllTodos(userId);
}
export async function createTodo(jwtToken, request) {
    const todoId = uuid.v4();
    const userId = parseUserId(jwtToken);
    return todoAccess.createTodo({
        todoId: todoId,
        userId: userId,
        name: request.name,
        dueDate: request.dueDate,
        createdAt: new Date().toISOString(),
        done: false,
    });
}
//# sourceMappingURL=todos.js.map