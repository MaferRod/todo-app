# todo-app
## Table of contents
- [Introduction](#introduction)
- [Technologies](#technologies)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Frontend Functionality](#frontend-functionality)

## Introduction
The **ToDo List Application** is a full-stack project developed to manage tasks with priority levels and due dates. It includes features such as task sorting, filtering, completion tracking, and calculating task metrics. This application is developed using React for the frontend and Spring Boot for the backend.

---
## Technologies
- **Frontend:**
  - React (TypeScript)
  - Axios (for API calls)
  - CSS for basic styling
  
- **Backend:**
  - Spring Boot (Java)
  - Maven (for dependency management)
  - REST API
  
- **Database:**
  - In-memory data storage (easily extendable to a persistent database like MySQL)

---

## Features
- Task creation, deletion, and updating.
- Task filtering by name, priority, and status.
- Task sorting by priority and due date.
- Pagination for task list.
- Metrics tracking (average task completion time, time grouped by priority).
- Mark tasks as done or undone.
  
---
## Setup Instructions

### 1. Prerequisites
Make sure you have the following installed:
- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **Java** (JDK 11 or higher): [Download and install Java](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- **Maven**: [Download and install Maven](https://maven.apache.org/install.html)

### 2. Clone the Repository
```bash
git clone [https://github.com/your-username/todo-list-app.git](https://github.com/MaferRod/todo-app.git)
cd todo-app
```
### 3. Backend Setup (Spring Boot)
Navigate to the backend directory:
```bash
cd backend
```
- Build the proyect
  ```bash
   mvn clean install
  ```
- Run the Spring Boot backend:
  ```bash
   mvn spring-boot:run
  ```
  The backend will start at http://localhost:9090.

### 4. Frontend Setup (React)
Navigate to the frontend directoty
```bash
cd frontend
```
- Install dependencies
  ```bash
   npm run start
  ```
  The frontend will run at http://localhost:8080.

---

## Running the Application
### 1. Start the backend:
- Open a terminal and run the backend using Maven
- The backend will be available at http://localhost:9090

### 2. Start the Frontend:
- In another terminal, run the React frontend
- The frontend UI will be available at http://localhost:8080

### 3. Access the Application:
- Open a browser and go to http://localhost:8080 to interact with the ToDo list application.

---

## API Endpoints
The backend provides the following API endpoints:

- GET /todos: Fetch all tasks with optional filters for text, priority, and done status. Supports pagination and sorting.
- POST /todos: Create a new task.
- PUT /todos/{id}: Update an existing task.
- DELETE /todos/{id}: Delete a task by ID.
- POST /todos/{id}/done: Mark a task as done.
- PUT /todos/{id}/undone: Mark a task as undone.
- GET /todos/metrics: Retrieve task completion metrics.

Example API request to create a task:

```bash
curl -X POST http://localhost:9090/todos \
-H "Content-Type: application/json" \
-d '{"text": "Finish the project", "priority": "HIGH", "dueDate": "2024-12-31"}'
```

## Frontend Functionality
- Task Management:
   - Add, edit, and delete tasks using the provided buttons on the interface.
- Task Filtering:
   - Use the filters to search tasks by name, priority, or status (done/undone).
- Task Sorting:
   - You can sort tasks by priority or due date using the sorting buttons in the table headers.
- Task Metrics:
   - The metrics section at the bottom of the page shows the average time to complete tasks in 
     general and by priority.
