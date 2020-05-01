import {DynamoDBStreamEvent, DynamoDBStreamHandler} from 'aws-lambda'
import 'source-map-support/register'
// import * as AWS  from 'aws-sdk'
import * as elasticsearch from 'elasticsearch'
import * as httpAwsEs from 'http-aws-es'

const esHost = process.env.ES_ENDPOINT
// const groupsTable = process.env.GROUPS_TABLE

const es = new elasticsearch.Client({
    hosts: [ esHost ],
    connectionClass: httpAwsEs
})

// const docClient = new AWS.DynamoDB.DocumentClient()

export const handler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
    console.log('Processing events batch from DynamoDB', JSON.stringify(event))

    for (const record of event.Records) {
        console.log('Processing record', JSON.stringify(record))

        if (record.eventName !== 'INSERT') {
            continue
        }

        const newItem = record.dynamodb.NewImage
        const todoId = newItem.todoId.S

        // if (!newItem.attachmentUrl) {
        //     newItem.attachmentUrl.S = '';
        // }

        const body = {
            todoId: newItem.todoId.S,
            userId: newItem.userId.S,
            name: newItem.name.S,
            done: newItem.done.B,
            createdAt: newItem.createdAt.S,
            dueDate: newItem.dueDate.S,
            attachmentUrl: newItem.attachmentUrl.S
        }

        await es.index({
            index: 'todos-index',
            type: 'todos',
            id: todoId,
            body,
        })
    }
}