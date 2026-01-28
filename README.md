# Orchid-React-Nestjs: Full-Stack Social/Blogging Platform

This repository contains a full-stack web application, `Orchid`, built with a React frontend and a NestJS backend. It's designed as a social media or blogging platform, featuring user authentication, story/post management, commenting, and liking functionalities.

## Project Structure (Monorepo)

The project is organized as a monorepo with two main applications:

- `orchid-api-nest/`: The backend API built with NestJS.
- `orchid-react/`: The frontend client built with React.

## Backend: `orchid-api-nest`

A robust and scalable RESTful API built with NestJS.

### Technologies Used

- **Framework**: NestJS
- **Database/ORM**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [Passport.js](https://www.passportjs.org/) (JWT, Local strategies)
- **API Documentation**: [Swagger (OpenAPI)](https://swagger.io/) and [Scalar API Reference](https://scalar.com/api-reference)
- **Data Mapping**: [AutoMapper](https://automapper.org/) for object-to-object mapping.
- **Validation**: `class-validator`
- **Configuration**: `@nestjs/config` for environment variables.
- **Package Manager**: pnpm

### Key Features

- **User Authentication**: Secure user login/registration with JWT-based authentication.
- **User Management**: CRUD operations for users.
- **Story Management**: Create, read, update, and delete stories/posts.
- **Commenting System**: Users can comment on stories.
- **Liking Mechanism**: Functionality to like stories or comments.
- **API Documentation**: Automatically generated interactive API documentation available at `/reference` endpoint.
- **CORS Configuration**: Configured to allow requests from the React frontend running on `http://localhost:5173`.

### Getting Started with Backend

1.  **Navigate to the backend directory:**
    ```bash
    cd orchid-api-nest
    ```
2.  **Install dependencies (using pnpm):**
    ```bash
    pnpm install
    ```
3.  **Configure Environment Variables:**
    Create a `.env` file in `orchid-api-nest/` and configure your PostgreSQL database connection string and JWT secrets.
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
    JWT_SECRET="your_jwt_secret"
    # Add any other environment variables as required by the application
    ```
4.  **Run Prisma Migrations and Seed (Optional):**
    ```bash
    npx prisma migrate dev --name init
    npx prisma db seed
    ```
5.  **Start the Backend API:**
    ```bash
    pnpm run start:dev
    ```
    The API will be available at `http://localhost:3000` (or your configured port).
    API documentation will be accessible at `http://localhost:3000/reference`.

---

## Frontend: `orchid-react`

A dynamic and interactive client application built with React.

### Technologies Used

- **Framework**: React
- **Build Tool**: [Vite](https://vitejs.dev/) (using `rolldown-vite` for optimized performance)
- **UI/Styling**:
  - [Material-UI (MUI)](https://mui.com/) for rich UI components.
  - [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
  - Icon libraries: `lucide-react`, `remixicon`, `react-icons`.
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing**: [React Router](https://reactrouter.com/en/main)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Key Features

- **User Interface**: Modern and responsive UI built with Material-UI and Tailwind CSS.
- **Dynamic Content**: Fetches and displays stories, comments, and user profiles from the NestJS API.
- **Interactive Elements**: Users can create, edit, delete, comment on, and like stories.
- **Client-side Routing**: Seamless navigation using React Router.
- **Global State Management**: Manages application state efficiently with Redux Toolkit.

### Getting Started with Frontend

1.  **Navigate to the frontend directory:**
    ```bash
    cd orchid-react
    ```
2.  **Install dependencies (using pnpm):**
    ```bash
    pnpm install
    ```
3.  **Start the Frontend Development Server:**
    ```bash
    pnpm run dev
    ```
    The frontend application will be available at `http://localhost:5173` (or your configured Vite port).

---

## Overall Setup

To run the complete full-stack application, you need to:

1.  Follow the **Backend Installation & Setup** steps to get the NestJS API running.
2.  Follow the **Frontend Installation & Setup** steps to get the React client running.

Ensure both applications are running concurrently in separate terminal windows.
