# Nest Api Service Challenge 

Welcome to Nest Api Service Challenge  – a robust and scalable NestJS application designed to handle user authentication, management, health checks. This project showcases best practices in NestJS development, combining a modular structure, authentication strategies, rate limiting, and global exception handling for a secure and reliable user experience.

**Note:** This project is a task as part of a hiring process.


## Overview

This documentation provides an overview of the structure and components of the NestJS application. The application includes features such as user authentication, user management, a health check endpoint, rate limiting using the `nestjs/throttler` package, custom HTTP exception filters for enhanced error handling, and the use of various Data Transfer Objects (DTOs) for data validation and sanitization.

### Table of Contents

1. [Project Structure](#project-structure)
2. [Authentication](#authentication)
3. [User Management](#user-management)
4. [Health Check](#health-check)
5. [Rate Limiting](#rate-limiting)
6. [Exception Handling](#exception-handling)
7. [DTOs for Data Validation](#dtos-for-data-validation)
8. [Docker Configuration](#docker-configuration)
9. [Environment Variables](#environment-variables)
10. [Usage](#usage)
11. [Security Considerations](#security-considerations)

## Project Structure

The project is organized into modules, each responsible for specific functionality. The main modules include:

- `AuthModule`: Handles user authentication.
- `UsersModule`: Manages user-related operations.
- `HealthModule`: Provides a health check endpoint.

Each module contains controllers, services, DTOs (Data Transfer Objects), guards, and entities, adhering to NestJS conventions.

## Authentication

The `AuthModule` includes an `AuthController` responsible for user sign-up and sign-in. Authentication is managed through a custom `AuthGuard`, which validates JWT tokens. The JWT tokens are generated and validated using the `AuthService`.

## User Management

The `UsersModule` manages user-related operations. The `UserController` provides endpoints for creating, updating, retrieving, and deleting user profiles. User authentication and ownership verification are enforced through the `AuthGuard` and `OwnerGuard`, respectively.

## Health Check

The `HealthModule` includes a `HealthController` providing a simple health check endpoint (`/healthz`). It verifies the connection to the database and returns a success or error status.

## Rate Limiting

The `ThrottlerModule` is responsible for implementing rate limiting using the `nestjs/throttler` package. This package helps protect against abuse and misuse by limiting the number of requests a client can make within a specified time frame.

## Exception Handling

The application utilizes two custom exception filters for enhanced error handling:

- **HttpExceptionFilter:**

  - Provides a consistent response format for HTTP exceptions.
  - Logs exception details, including the message and status code, for better debugging in development and production environments.

- **AllExceptionsFilter:**
  - Handles all exceptions globally, providing a catch-all mechanism for unexpected errors.
  - Logs exception details, including the message and stack trace.
  - Returns a standardized response in case of an unexpected exception.

Both exception filters contribute to a more robust error-handling strategy.

## DTOs for Data Validation

Various Data Transfer Objects (DTOs) are used throughout the application for data validation and sanitization. These include:

- **PasswordChangeDto:**

  - Validates and sanitizes data for changing user passwords.

- **UserLoginDto:**

  - Validates and sanitizes data for user login.

- **UserProfileDto:**

  - Validates and sanitizes data for updating user profiles.

- **UserRegistrationDto:**
  - Validates and sanitizes data for user registration.

These DTOs help ensure that incoming data meets the required criteria, enhancing the security and integrity of the application.

## Docker Configuration

The application is containerized using Docker. The `Dockerfile` defines the container build process. The application exposes itself on port 3001, and the database connection is configured using environment variables.

## Environment Variables

The application relies on environment variables for configuration, including database connection details. The `docker-compose.yml` file defines these variables, allowing for easy configuration during deployment.

The application relies on the following environment variables for configuration. Ensure that your `.env` file includes the following data:

```env
# DataBase Configuration
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_NAME=
DB_PORT=

# JsonWebToken Secret Key
JWT_SECRET=

# Your Current Environment
NODE_ENV=

```

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set the required environment variables.
4. Build and run the application using `npm run start:dev`.
5. Access the application at `http://localhost:3000`.

## Security Considerations

- Sensitive information, such as JWT secret keys, should be stored securely, preferably using environment variables.
- Regularly update dependencies to address security vulnerabilities.
- Implement secure practices for handling user authentication, password storage, authorization, rate limiting, exception handling, and data validation.
