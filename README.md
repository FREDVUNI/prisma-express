# Prisma Node JS Express RESTAPI

## Overview

This Rest API is built with Node.js, Express, Prisma ORM, and PostgresQL. It provides CRUD functionality for a simple quotes application. Users can create, read, update, and delete quotes, as well as create and read authors and users.

## Prerequisites

Before running this Rest API, you need to have the following installed on your machine:

- Node.js
- PostgresQL

## Installation

1. Clone this repository to your local machine
2. Navigate to the cloned directory
3. Run `npm install` to install all the necessary dependencies
4. Create a `.env` file in the root directory of the project and set the following environment variables:
   - DATABASE_URL: URL to your PostgresQL database
   - PORT: Port number for the server to run on
5. Run `npx prisma migrate dev` to apply the database schema to your database
6. Run `npm run dev` to start the server

## Endpoints

This Rest API has the following endpoints:

### `/authors`

- `GET`: Get all authors
- `POST`: Create a new author

### `/authors/:id`

- `GET`: Get a specific author
- `PUT`: Update a specific author
- `DELETE`: Delete a specific author

### `/quotes`

- `GET`: Get all quotes
- `POST`: Create a new quote

### `/quotes/:id`

- `GET`: Get a specific quote
- `PUT`: Update a specific quote
- `DELETE`: Delete a specific quote

### `/users`

- `GET`: Get all users

### `/users/signup`

- `POST`: Create a new user

### `/users/signin`

- `POST`: login user

### `/users/:id`

- `GET`: Get a specific user
- `PUT`: Update a specific user
- `DELETE`: Delete a specific user
