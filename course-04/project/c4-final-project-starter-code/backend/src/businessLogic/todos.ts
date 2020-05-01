import * as uuid from 'uuid';

import { TodoItem } from '../models/TodoItem';
import { TodoAccess } from '../dataLayer/todosAccess';
import { parseUserId } from '../auth/utils';
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';

const todoAccess = new TodoAccess();

export async function getAllTodos(jwtToken: string): Promise<TodoItem[]> {
    const userId = parseUserId(jwtToken);
    return todoAccess.getAllTodos(userId);
}

export async function createTodo(userId: string, request: CreateTodoRequest): Promise<TodoItem> {
    const todoId = uuid.v4();

    return todoAccess.createTodo({
        todoId: todoId,
        userId: userId,
        name: request.name,
        dueDate: request.dueDate,
        createdAt: new Date().toISOString(),
        done: false,
    });
}

// export async function deleteTodo(userId: string, jwtToken: string): Promise<void> {
//     return null
// }

// export async function updateTodo(todoId: string, userId: string, jwtToken: string, request: UpdateTodoRequest): Promise<void> {
//     return null
// }
