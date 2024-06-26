# Blogging Platform

A blogging platform built using Node.js and Express with a clean code architecture. This platform supports author and user roles with features for authentication, authorization, and post management.

## Features

### Authentication & Authorization
- **User Registration & Login**: Secure user authentication.
- **JWT-Based Authorization**: JSON Web Token for secure API requests.
- **Email Verification**: Account activation via email (Nodemailer).
- **Password Reset**: Email-based password reset.

### User Features
- **Save & Unsave Posts**: Users can save and unsave posts for later viewing.
- **Timeline**: View a timeline of all published posts.

### Author Features
- **Post Management**: Create, publish, and unpublish posts.

### Clean Code Structure
- **Separation of Concerns**: The application is structured with `app.js` routing to controllers (handling responses) and services (handling data access).

### Core Dependencies
- bcrypt: For hashing passwords.
- dotenv: For managing environment variables.
- express: Web framework for Node.js.
- jsonwebtoken: For JWT-based authentication.
- nodemailer: For sending emails.
- sequelize: ORM for interacting with SQL databases.

### Blogging ERD
![blogging_system](https://github.com/abdulrahmanabualmagd/blogging-system/assets/138934462/ba6117de-17cb-4324-bdb5-e4eb9fbed7b8)
