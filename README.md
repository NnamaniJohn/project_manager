# Project Management Application

A project management application built with Node, React, TypeScript, and TailwindCSS, which allows users to manage projects and tasks. The application is integrated with Jest for unit testing and follows a component-based structure for reusability and scalability.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This is a simple project management app where users can:
- Create, edit, and delete projects.
- Add tasks to each project, with statuses such as Pending, In-progress, and Completed.
- Edit task details using a modal.

The project is organized using React with TypeScript for type safety, and TailwindCSS is used for styling. Jest and React Testing Library are used for unit testing.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for better code quality and maintainability.
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.
- **Jest**: Testing framework for writing and running tests.
- **React Testing Library**: Utilities for testing React components.
- **ESLint**: Linting tool for maintaining code quality.
- **Node.js**: JavaScript runtime for server-side development.

## Project Structure
```
project_manager/
├── client/                  # React frontend
│   ├── public/              # Public assets
│   └── src/                 # Source files
│       ├── __test__/        # Test files
│       ├── app/             # App page components
│       ├── components/      # React components
│       └── layout/          # Layout components
└── server/                  # Node.js backend
    └── src/                 # Source files
        ├── controllers/     # Controllers
        ├── models/          # Database models
        ├── routes/          # API routes
        ├── tests/           # Test files
        └── index.ts         # Entry point
```

## Setup and Installation

To set up the project locally, follow the steps below:

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or above)
- **npm** or **yarn**

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/NnamaniJohn/project_manager.git
   cd project_manager
   ```
   
2. **Set up the server**:

   ```bash
   cd server
   npm install
   ```
   
3. **Set up environment variables**:

   Rename the `.env.example` file to `.env` and update the environment variables as needed.

4. **Set up the client**:

   ```bash
   cd client
    npm install
    ```
   
5. **Set up environment variables**:

    Rename the `.env.example` file to `.env` and update the environment variables as needed.

6. **Run migrations**:

   ```bash
   cd server
   npx db-migrate up
   ```

## Running the Application

To run the application, follow the steps below:

1. **Start the server**:

   ```bash
   cd server
   npm run start
   ```
   
2. **Start the client**:

   ```bash
    cd client
    npm run dev
    ```
   
3. **Access the application**:

    Open [http://localhost:3000](http://localhost:3000) in your browser.

### API endpoints

The following API endpoints are available:

- **GET /projects**: Get all projects.
- **POST /projects**: Create a new project.
- **GET /projects/:id**: Get a project by ID.
- **PUT /projects/:id**: Update a project by ID.
- **DELETE /projects/:id**: Delete a project by ID.
- **GET /projects/:id/tasks**: Get all tasks for a project.
- **POST /projects/:id/tasks**: Create a new task for a project.
- **PUT /tasks/:taskId**: Update a task by ID.
- **DELETE /tasks/:taskId**: Delete a task by ID.

## Running Tests

To run tests, follow the steps below:

1. **Run server tests**:

   ```bash
   cd server
   npm run test
   ```
   
2. **Run client tests**:

   ```bash
   cd client
   npm run test
   ```
   
## Usage

- To create a new project, click the "New Project" button and fill in the details.
- To add a task to a project, click the "Add Task" button on the project card and fill in the details.
- To edit the details of a task, click the "Edit" button on the task card.
- To delete a project or task, click the "Delete" button on the project or task card.

## Contributing

Contributions are welcome! Feel free to raise an issue or submit a pull request if you see any bug or improvement opportunity.

## License

This project is open-source and available under the [MIT License](LICENSE).

