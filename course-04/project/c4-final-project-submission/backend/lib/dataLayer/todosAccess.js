import * as AWS from 'aws-sdk';
// import * as AWSXRay from 'aws-xray-sdk';
const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);
export class TodoAccess {
    constructor(todosTable = process.env.TODOS_TABLE, userIdIndex = process.env.USER_ID_INDEX, docClient = new XAWS.DynamoDB.DocumentClient()) {
        this.todosTable = todosTable;
        this.userIdIndex = userIdIndex;
        this.docClient = docClient;
    }
    async getAllTodos(userId) {
        const result = await this.docClient.query({
            TableName: this.todosTable,
            IndexName: this.userIdIndex,
            KeyConditionExpression: 'userId= :userId',
            ExpressionAttributeValues: {
                ':userId': userId,
            }
        }).promise();
        const items = result.Items;
        return items;
    }
    async createTodo(todo) {
        await this.docClient.put({
            TableName: this.todosTable,
            Item: todo
        }).promise();
        return todo;
    }
}
//# sourceMappingURL=todosAccess.js.map