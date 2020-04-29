import { uuid } from 'uuid';

import { TodoItem } from '../models/TodoItem';
import { TodoAccess } from '../dataLayer/todosAccess';
import { parseUserId } from '../auth/utils';
import { CreateTodoRequest } from '../requests/CreateTodoRequest';

const todoAccess = new TodoAccess();

export async function getAllTodos(jwtToken: string): Promise<TodoItem[]> {
    const userId = parseUserId(jwtToken);
    return todoAccess.getAllTodos(userId);
}

export async function createTodo(jwtToken: string, request: CreateTodoRequest): Promise<TodoItem> {
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