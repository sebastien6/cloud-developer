import * as AWS from 'aws-sdk';
// import * as AWSXRay from 'aws-xray-sdk';
const AWSXRay = require('aws-xray-sdk');
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { TodoItem } from '../models/TodoItem';
import { createLogger } from '../utils/logger';
import { TodoUpdate } from '../models/TodoUpdate';


const XAWS = AWSXRay.captureAWS(AWS);
const logger = createLogger('dynamodb');

export class TodoAccess {
    constructor(
        private readonly todosTable = process.env.TODOS_TABLE,
        private readonly createdAtIndex = process.env.CREATED_AT_INDEX,
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient()
    ){}

    public async getAllTodos(userId: string): Promise<TodoItem[]> {    
        const result = await this.docClient.query({
            TableName: this.todosTable,
            IndexName: this.createdAtIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId,
            }, 
        }).promise()
    
        const items = result.Items;
        logger.info('getAllTodos', {NumberItems: result.Count})
        return items as TodoItem[];
    }

    public async createTodo(todo: TodoItem): Promise<TodoItem> {
        await this.docClient.put({
            TableName: this.todosTable,
            Item: todo
        }).promise()

        return todo;
    }

    public async deleteTodo(userId: string, todoId: string): Promise<void> {
        await this.docClient.delete({
            TableName: this.todosTable,
            Key:{
                userId: userId,
                todoId: todoId
            },
        }).promise()
    }

    public async updateTodo(userId: string, todoId: string, todoUpdate: TodoUpdate): Promise<TodoItem> {
        const res = await this.docClient
            .update({
                TableName: this.todosTable,
                Key: {
                    userId: userId,
                    todoId: todoId
                },
                UpdateExpression:
                    'set  #N = :name, done = :done, dueDate = :dueDate',
                ExpressionAttributeValues: {
                    ':name': todoUpdate.name,
                    ':done': todoUpdate.done,
                    ':dueDate': todoUpdate.dueDate,
                },
                ExpressionAttributeNames: {
                    '#N': 'name', // fix for ValidationException: Invalid UpdateExpression: Attribute name is a reserved keyword
                },
                
                ReturnValues: 'UPDATED_NEW',
            })
            .promise();
        
        logger.info('updateTodo', {item: res.Attributes});
        
        return res.Attributes as TodoItem;
    }

    public async updateTodoAttachment(userId: string, todoId: string, attachmentUrl: string): Promise<void> {
        const res = await this.docClient
            .update({
                TableName: this.todosTable,
                Key: {
                    userId: userId,
                    todoId: todoId
                },
                UpdateExpression:
                    'set attachmentUrl = :attachmentUrl',
                ExpressionAttributeValues: {
                    ':attachmentUrl': attachmentUrl
                },
                ReturnValues: 'UPDATED_NEW',
            })
            .promise();
        
        logger.info('updateTodoAttachment', {item: res.Attributes});
    }
}
