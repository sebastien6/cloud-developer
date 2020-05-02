import * as uuid from 'uuid';

import { TodoItem } from '../models/TodoItem';
import { TodoAccess } from '../dataLayer/todosAccess';
import { getUploadUrl } from '../dataLayer/s3Bucket';
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';

const todoAccess = new TodoAccess();

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
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

export async function deleteTodo(userId: string, todoId: string): Promise<void> {
    todoAccess.deleteTodo(userId, todoId);
}

export async function updateTodo(userId: string, todoId: string, request: UpdateTodoRequest): Promise<TodoItem> {
    return todoAccess.updateTodo(userId, todoId, request)
}

export async function uploadUrl(userId: string, todoId: string): Promise<string> {
    const bucketName = process.env.IMAGES_S3_BUCKET;

    const imageId = uuid.v4();
    const uploadUrl = getUploadUrl(imageId);

    todoAccess.updateTodoAttachment(userId, todoId, `https://${bucketName}.s3.amazonaws.com/${imageId}`);
    return uploadUrl;
}