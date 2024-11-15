# Ecommerce Store 🛍️

A modern, full-stack ecommerce platform built with React, TypeScript, and Vite, featuring a robust Express backend with MongoDB. This application provides a complete shopping experience with user authentication, product management, cart functionality, and secure checkout process.

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

## ✨ Features

- 🔐 **Secure Authentication**
  - JWT-based user authentication
  - Protected API routes
  - Password encryption with bcrypt

- 🛒 **Shopping Experience**
  - Product catalog with search and filtering
  - Real-time cart management
  - Secure checkout process
  - Order history and tracking

- 💅 **Modern UI/UX**
  - Responsive design with Tailwind CSS
  - Optimized performance
  - Intuitive user interface
  - Dark mode support

- 🛠️ **Developer Experience**
  - TypeScript for type safety
  - Hot Module Replacement (HMR)
  - Comprehensive API documentation with Swagger
  - Docker containerization

## 🚀 Tech Stack

### Frontend
- React 18 with TypeScript
- Redux Toolkit for state management
- Vite for fast development
- Tailwind CSS for styling
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Swagger for API documentation

### DevOps
- Docker & Docker Compose
- ESLint & TypeScript ESLint
- Git workflow
- Environment configuration

## 🏗️ Architecture

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Docker (optional, for containerization)
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/irtaza302/ecommerce-store.git
   cd ecommerce-store
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your MongoDB URI and JWT secret:

   ```env
   MONGO_URI=your-mongo-uri
   JWT_SECRET=your-jwt-secret
   ```

4. **Run the application:**

   - **Development mode:**

     ```bash
     npm run dev:all
     ```

   - **Build for production:**

     ```bash
     npm run build
     ```

   - **Run with Docker:**

     ```bash
     docker-compose up
     ```

## Usage

- Access the application at `http://localhost:5173`.
- API documentation is available at `http://localhost:5000/api-docs`.

## API Documentation

The API is documented using Swagger/OpenAPI. You can explore and test the API endpoints through the interactive Swagger UI:

- **Development**: `http://localhost:5000/api-docs`
- **Staging**: `https://staging-api.ecomstore.com/api-docs`
- **Production**: `https://api.ecomstore.com/api-docs`

The documentation includes:

- 🔑 Authentication endpoints
- 📦 Product management
- 🛒 Cart operations
- 📋 Order processing
- 📝 Detailed request/response schemas
- 🔒 Security specifications

Each endpoint includes:
- Request/response examples
- Required parameters
- Authentication requirements
- Response codes and error handling

## Scripts

- `npm run dev`: Start the frontend development server.
- `npm run dev:server`: Start the backend server with nodemon.
- `npm run dev:all`: Start both frontend and backend servers concurrently.
- `npm run build`: Build the frontend for production.
- `npm run lint`: Run ESLint.
- `npm run preview`: Preview the production build.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or support, please contact [support@ecomstore.com](mailto:support@ecomstore.com).
