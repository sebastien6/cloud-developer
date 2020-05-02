# Serverless TODO

## Objectif
To implement this project, you need to implement a simple TODO application using AWS Lambda and Serverless framework. Search for all comments starting with the `TODO:` in the code to find the placeholders that you need to implement.

## Application Demo

### GetAllTodos specific to user
User1 after login to web UI get all it's todos:

![Alt text](images/user01-getAllTodos.png?raw=true "GetAllTodos")

user2 after login to web UI get all it own todos:

![Alt text](images/user02-getAllTodo.png?raw=true "GetAllTodo-another-user")

### Update a Todo
user 1 update one of its todos:

![Alt text](images/user01-update-todo.png?raw=true "UpdateTodo")

user1 getAllTodos after todo update:

![Alt text](images/user01-getAllTodo-after-Update.png?raw=true "GetAllTodos-post-update")

### Attach image to Todo:
user1 get a signed URL to upload image and Todo item is update with image URL:

![Alt text](images/user01-get-upload-url.png?raw=true "GenerateUploadUrl")

user1 upload image with signed URL:

![Alt text](images/user01-image-upload-with-signed-url.png?raw=true "UploadUrl")

user1 getAllTodos after image upload:

![Alt text](images/user01-getAllTodo-after-image-attachment.png?raw=true "GetAllTodos-post-image-attachment")

![Alt text](images/user01-UI-after-image-attachment.png?raw=true "GetAllTodos-UIwith-image-attachment")

### Delete Todo
![Alt text](images/user01-before-delete.png?raw=true "GetAllTodos-prior-delete")
/home/seb/Udacity/cloud-developer/course-04/project/c4-final-project-submission/images/user01-before-delete.png
user1 delete a Todo item:

![Alt text](images/user01-delete-todo.png?raw=true "DeleteTodo")

user1 getAllTodos after image upload:

![Alt text](images/user01-after-delete.png?raw=true "GetAllTodos-post-delete")

## Application specificity
### Cloudwatch Logs

Application include detailed logs using the wiston logger in CLoudwatch
![Alt text](images/cloudwatch-detailed-logs.png?raw=true "cloudwatch-logs")

### X-Ray

Application is configured to send opentracting information to X-Ray
![Alt text](images/x-ray.png?raw=true "x-ray")

### Blue/Green Deployment

Application is using Blue/green deploymet
![Alt text](images/blue-green-canarie-deployment.png?raw=true "blue/green deployment")

