# Storefront Backend Project

## Getting Started

- To get started, clone this repo and run `yarn or npm i` in your terminal at the project root.

- Create a .env file, adding the following code into it which defines the variables:
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shopping
POSTGRES_TEST_DB=shopping_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
ENV=dev
BCRYPT_PASSWORD=your hash password goes here
SALT_ROUNDS=number of rounds
TOKEN_SECRET=yourSecretGoesHere

- Create two databases for POSTGRES_DB, POSTGRES_TEST_DB, connect to psql and create a user and grant them all PRIVILEGES
`
CREATE USER shopping_user WITH PASSWORD 'password123';    
CREATE DATABASE shopping;  
\c shopping
GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
CREATE DATABASE shopping_test;
\c shopping_test
GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;
`

- for the database, if port is not specified, postgres default 5432 is used, and port 3000 is used for the server.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion


**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

- run migrations up on dev environment: `npm run dev-start`
- run migrations down on dev environment: `npm run dev-reset`
- create user: start database then `node creaeUser.mjs`
- run migrations up on test environment: `npm run test-up`
- run migrations down on test environment: `npm run test-teardown`

### 3. Models

Create the models for each database table. The methods in each model maps to the endpoints in `REQUIREMENTS.md`. These models all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.
- User after being created or authenticated, they're given a token

### 6. QA and `README.md`

- to run tests for database run `npm run test-db`
