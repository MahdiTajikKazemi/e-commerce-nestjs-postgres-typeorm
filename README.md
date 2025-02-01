# CRUD API With NestJS

# Backend API for E-commerce Application

This is a simple **Backend Service API** for a **A crud application** with various endpoints built using **Nest.js**, **PostgreSQL** & **TypeORM**.

---

## Features

- Built with **Nest.js**.
- **PostgreSQL** and **TypeORM** for database management.
- Implements **JWT Authentication** + **Role-based Authorization** using **Passport.js**
- RESTful APIs for user management:
  - Create, Read, Update, and Delete (CRUD) operations.
- RESTful APIs for product management:
  - Create, Read, Update, and Delete (CRUD) operations.

And many more services ...

---

## Technologies Used

- **Nest.js**
- **Postgres** with **TypeORM**
- **JWT + Refresh Token** & **Passport.js** for authentication + authorization
- **Bcrypt** for password hashing

---

## Installation and Setup

### Prerequisites

- Node.js and npm installed on your system.
- Postgres connection (local or cloud).

### 1. Clone the Repository

```bash
git clone https://github.com/MahdiTajikKazemi/role-based-jwt-auth-with-express-mongodb
```

### 2. Setup Backend

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the `backend` directory and configure it:
   ```env
   Set your environment variables in .env.sample file.
   ```
3. Start the server:
   ```bash
   npm run start:dev
   ```

### 3. Setup app using Docker

1. Install & Run docker + docker engine on your machine:

   ```bash
   https://docs.docker.com/engine/install/
   ```

2. navigate to your project directory + run the below command:
   ```bash
   docker compose up
   ```

## Usage

1. Start the backend server.
2. Open your 'Postman' | 'insomnia' or whatever testing api app you are comfortable using and then begin hitting enpoints listed below.

---

## API Endpoints

### Authentication

- `POST /api/v1/auth/signup`: Register a new user and get an access + refresh JWT token. (all)
- `POST /api/v1/auth/login`: Login and get a JWT tokens as cookies. (all)
- `POST /api/v1/auth/refresh`: Supply a valid refresh token in body to get a new access token. (users only)
- `PUT /api/v1/auth/logout`: Logout (set refresh token in DB to null). (users only)

### User Management

- `GET /api/v1/users/`: Get a list of all users (admin only).
- `POST /api/v1/users/`: Create a user (admin only).
- `PUT /api/v1/users/:id`: Update a specific user (admin only).
- `DELETE /api/v1/users/:id`: Remove a specific user (admin only).
- `GET /api/v1/users/:id`: Get a specific user (admin only).

### Product Management

- `GET /api/v1/products/`: Get a list of all products (users only).
- `POST /api/v1/products/`: Create a user (admin only).
- `PUT /api/v1/products/:id`: Update a specific user (admin only).
- `DELETE /api/v1/products/:id`: Remove a specific user (admin only).
- `GET /api/v1/products/:id`: Get a specific user (users only).

---

## Folder Structure

```
└── 📁express-auth
    └── 📁middlewares
        └── auth.js
        └── isAdmin.js
    └── 📁models
        └── auth.js
        └── product.js
        └── refresh.js
        └── user.js
    └── 📁routes
        └── auth.js
        └── products.js
        └── users.js
    └── .env
    └── .env.sample
    └── .gitignore
    └── db.js
    └── index.js
    └── package-lock.json
    └── package.json
    └── README.md
```

## Future Enhancements

- Turn this app into a detailed E-commerce application

---

## License

This project is licensed under the MIT License.

Mahdi Tajik Kazemi
