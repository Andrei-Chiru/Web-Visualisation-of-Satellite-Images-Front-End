React Node.js Docker Starter

This project is a starter template for building full-stack applications with React, Node.js, and Docker. It includes a simple React frontend and a Node.js backend, both of which are containerized using Docker.

Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js.
- You have installed Docker and Docker Compose.

Setting Up and Running the Project

To set up and run the project, follow these steps:

1. Clone the repository:

```bash
git clone <repository_url>
```

Navigate to the project directory:
```
cd <project_directory>
```

Install the project dependencies:
```
npm install
```

Build the Docker image:
```
docker-compose build --no-cache
```

Start the application:
```
docker-compose up
```

The application should now be running and accessible at http://localhost:3000.

Using Docker

This project uses Docker to create a consistent development environment. 
The Docker setup for this project includes a Node.js environment and maps port 3000 inside the Docker container to port 3000 on your host machine, allowing you to access the application at http://localhost:3000.

# Cypress

For opening cypress and writing tests, run this command ```npx cypress open```