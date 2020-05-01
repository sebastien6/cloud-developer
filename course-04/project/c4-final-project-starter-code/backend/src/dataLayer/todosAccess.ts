import * as AWS from 'aws-sdk';
// import * as AWSXRay from 'aws-xray-sdk';
const AWSXRay = require('aws-xray-sdk');
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { TodoItem } from '../models/TodoItem';

const XAWS = AWSXRay.captureAWS(AWS);

export class TodoAccess {
    constructor(
        private readonly todosTable = process.env.TODOS_TABLE,
        private readonly userIdIndex = process.env.TODO_ID_INDEX,
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient()
    ){}

    async getAllTodos(userId: string): Promise<TodoItem[]> {    
        const result = await this.docClient.query({
            TableName: this.todosTable,
            IndexName: this.userIdIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId,
            },
        }).promise()
    
        const items = result.Items;
        return items as TodoItem[];
    }

    async createTodo(todo: TodoItem): Promise<TodoItem> {
        await this.docClient.put({
            TableName: this.todosTable,
            Item: todo
        }).promise()

        return todo;
    }

}
