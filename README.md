test-spendbase API

Welcome to the test-spendbase API, a backend service designed for managing weather data using NestJS and PostgreSQL.

1. Overview
This project provides a RESTful API for handling weather data, including fetching, saving, and retrieving weather information based on geographic coordinates. It leverages NestJS for backend logic, TypeScript for type safety, and TypeORM for database interactions with PostgreSQL.

2. Project Structure
```text
├── src/                           # Source code
│   ├── app/                       # Core application files
│   │   ├── app.controller.spec.ts # Unit tests for app controller
│   │   ├── app.controller.ts      # Main controller
│   │   ├── app.module.ts          # Main module
│   │   └── app.service.ts         # Main service
│   ├── consts/                    # Constants used across the application
│   ├── database/                  # Database configuration
│   ├── types/                     # Type definitions
│   └── weather/                   # Weather module
│       ├── dto/                   # Data Transfer Objects
│       ├── weather.controller.spec.ts # Unit tests for weather controller
│       ├── weather.controller.ts      # Weather data controller
│       ├── weather.entity.ts           # ORM entity for weather data
│       ├── weather.interceptor.spec.ts # Unit tests for weather interceptor
│       ├── weather.interceptor.ts      # Interceptor for response transformation
│       ├── weather.module.ts           # Weather module configuration
│       ├── weather.service.spec.ts     # Unit tests for weather service
│       └── weather.service.ts          # Weather data service
├── test/                          # End-to-end tests
├── .env                           # Environment variables
├── .eslintrc.js                   # ESLint configuration
├── .gitignore                     # Git ignore file
├── .prettierrc                    # Prettier configuration
├── docker-compose.yml             # Docker Compose for multi-container setup
├── Dockerfile                     # Dockerfile for containerizing the app
├── nest-cli.json                  # NestJS CLI configuration
├── package.json                   # Project configuration
├── README.md                      # This file
├── task.md                        # Task documentation
├── tsconfig.build.json            # TypeScript build configuration
└── tsconfig.json                  # TypeScript configuration file
```

3. Getting Started
- Prerequisites
- Node.js v20.3.1 or higher
- PostgreSQL (for database)

4. Installation
Clone the repository:
```bash
git clone https://github.com/rudenkoserhii/test-spendbase
cd test-spendbase
```

5. Install dependencies:
```bash
npm install
```

6. Set up environment variables:
Copy .env.example to .env if it exists, or create one manually with these required variables:
```bash
PORT=3000
HOST=localhost
PROTOCOL=http
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_NAME=your_db_name
OPENWEATHERMAP_API_KEY=your_api_key
```

7. Run the application:
```bash
npm run start:dev
```

For production:
```bash
npm run start:prod
```

8. Running Tests
- Unit Tests:
```bash
npm run test
```
- End-to-End Tests:
```bash
npm run test:e2e
```

9. Features Implemented
- Weather Data Management: CRUD operations for weather data.
- API Documentation via Swagger, accessible at /swagger.
- Data Interception for response formatting with custom interceptors.
- Error Handling and HTTP status code responses.

10. API Documentation
Access the Swagger UI at http://localhost:3000/swagger once the server is running for detailed API endpoint descriptions.

11. Code Quality
Follows NestJS best practices for modularity and structure.
Uses ESLint and Prettier for code consistency and formatting.
Comprehensive testing with Jest for unit and e2e scenarios.

12. Deployment
The project includes Dockerfile and docker-compose.yml for easy containerization and deployment:

```bash
docker-compose up
```

For cloud deployment, you can use services like Heroku, AWS, or DigitalOcean. Ensure environment variables are properly set in your deployment environment.

13. Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss the proposed changes.

14. License
This project is UNLICENSED - see package.json for more details.