# Task Management API

## Description

A Node.js-based task management API with features including user registration, authentication, CRUD operations for tasks, and more.

## Getting Started

Follow these instructions to get the project running on your local machine.

### Cloning the Repository

Navigate into the project directory

i.Using Docker
1.Build and start the Docker containers
docker-compose up --build

ii.Without Docker
1.Install dependencies
npm install

2.Create a .env file in the root directory with the following content
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
DB_HOST=localhost
JWT_SECRET=your_jwt_secret

3.Start the application
npm start

4.The API will be available at http://localhost:3000

API Endpoints
1.User Registration: POST /api/auth/register(curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d "{/\"username/\":/\"user1/\", /\"password/\":/\"password123/\"}").

2.User Login: POST /api/auth/login(curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{/\"username/\":/\"user1/\", /\"password/\":/\"password123/\"}").

3.Create Task: POST /api/tasks(curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -H "Authorization: Bearer <JWT-TOKEN>" -d "{/\"title/\":/\"Sample Task/\",/\"description/\":/\"This is a sample task description./\",/\"status/\":/\"Todo/\",/\"priority/\":1,/\"dueDate/\":/\"2024-08-10T00:00:00Z/\"}").

4.Get All Tasks: GET /api/tasks(curl -X GET http://localhost:3000/api/tasks -H "Authorization: Bearer <JWT-TOKEN>").
With pagination(curl -X GET http://localhost:3000/api/tasks?page=1&limit=10 -H "Authorization: Bearer <JWT-TOKEN>")

5.Get Task by ID: GET /api/tasks/:id(curl -X GET http://localhost:3000/api/tasks/<task_id> -H "Authorization: Bearer <JWT-Token>").

6.Update Task: PUT /api/tasks/:id(curl -X PUT http://localhost:3000/api/tasks/<task_id> -H "Content-Type: application/json" -H "Authorization: Bearer <JWT-Token>" -d "{/\"title/\":/\"Updated Task/\",/\"description/\":/\"Updated description/\",/\"status/\":/\"In Progress/\",/\"priority/\":2,/\"dueDate/\":/\"2024-08-15T00:00:00Z/\"}").

7.Delete Task: DELETE /api/tasks/:id(curl -X DELETE http://localhost:3000/api/tasks/<task_id> -H "Authorization: Bearer <JWT-Token>").

8.Filter Task: GET /api/tasks?priority=<priority_no(1to10)>&status=<status_reqd(Todo,In%20Progress,Done)>(curl -X GET "http://localhost:3000/api/tasks?priority=2&status=Todo" -H "Authorization: Bearer <JWT-Token>").

9.Search Task:GET api/tasks?query=<Word_to_search_in_title_Or_description_of_task>(curl -X GET "http://localhost:3000/api/tasks/search?query=This" -H "Authorization: Bearer <JWT-Token>").
