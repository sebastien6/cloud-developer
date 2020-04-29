import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import { uuid } from 'uuid';
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { TodoItem } from '../models/TodoItem';

class TodosAccess {
    constructor(
        
        private readonly todosTable = process.env.TODOS_TABLE,
        private readonly XAWS = AWSXRay.captureAWS(AWS),
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient()
    ){}

    async getAllGroups(): Promise<TodoItem[]> {    
        const result = await this.docClient.scan({
          TableName: this.todosTable
        }).promise()
    
        const items = result.Items
        return items as TodoItem[]
    }

    async createTodo(todo: TodoItem): Promise<TodoItem> {
        await this.docClient.put({
            TableName: this.todosTable,
            Item: todo
        }).promise()
    }
}

module.exports = TodosAccess;