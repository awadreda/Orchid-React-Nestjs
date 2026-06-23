# Orchid Fullstack Project Documentation

This document provides a comprehensive overview of the Orchid Fullstack project, which consists of a NestJS backend API and a React frontend application.

## 1. Project Overview

The Orchid project is a fullstack application designed to manage stories, comments, and likes, along with user authentication and authorization. The backend is built with NestJS, providing a robust and scalable API, while the frontend is developed using React, offering a dynamic and interactive user experience.

## 2. Technologies Used

### Backend (Orchid-Nestjs)

*   **Framework:** NestJS (Node.js)
*   **Database:** PostgreSQL (via Prisma ORM)
*   **Authentication:** JWT (JSON Web Tokens), Passport.js (Local, Google OAuth20 strategies)
*   **Authorization:** Role-based access control (RBAC)
*   **Data Mapping:** `@automapper/classes`, `ts-mapper`
*   **Validation:** `class-validator`, `class-transformer`
*   **Hashing:** `bcrypt`, `argon2`
*   **API Documentation:** Swagger, Scalar API Reference

### Frontend (Orchid-React)

*   **Framework:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **State Management:** Redux Toolkit
*   **Routing:** React Router
*   **UI Library:** Material-UI (MUI), Shadcn UI
*   **Styling:** Tailwind CSS, Emotion
*   **Markdown Rendering:** `react-markdown`, `react-syntax-highlighter`
*   **File Processing:** `mammoth` (for DOCX conversion)
*   **HTTP Client:** Axios

## 3. Backend Architecture (Orchid-Nestjs)

The NestJS backend follows a modular architecture, leveraging NestJS's dependency injection and decorators to build a well-organized and maintainable codebase.

### 3.1 Core Modules

*   **`AppModule`**: The root module that imports all other modules and sets up global configurations like `ConfigModule` for environment variables.
*   **`PrismaModule`**: Provides the `PrismaService` globally, allowing other modules to interact with the database.
*   **`UsersModule`**: Manages user-related operations, including CRUD for users, fetching dashboard data, and handling user profiles.
*   **`StoryModule`**: Handles all story-related functionalities, such as creating, reading, updating, and deleting stories, as well as fetching story summaries.
*   **`CommentModule`**: Manages comments on stories, including creating, retrieving, updating, and deleting comments, and handling replies.
*   **`LikeModule`**: Deals with liking and unliking stories, and fetching like counts.
*   **`AuthModule`**: Implements authentication and authorization logic, including user registration, login, JWT token generation, refresh tokens, and Google OAuth.

### 3.2 Database Schema (Prisma)

The database schema is defined in `prisma/schema.prisma` using Prisma Schema Language.

```prisma
// @orchid-api-nest/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  // adpter  = "postgresql" // This line seems to be a comment or an alternative adapter suggestion
}

model User {
  id            Int       @id @default(autoincrement())
  email         String    @unique
  name          String?
  emailVerified DateTime?
  password      String?
  hashedRefreshToken String?
  image         String?
  role          String    @default("USER")
  createdAt     DateTime  @default(now())
  accounts      Account[]
  comments      Comment[]
  likes         Like[]
  sessions      Session[]
  stories       Story[]
}

model Account {
  id                Int     @id @default(autoincrement())
  userId            Int
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           Int      @id @default(autoincrement())
  sessionToken String   @unique
  userId       Int
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String   @unique
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Story {
  id           Int       @id @default(autoincrement())
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  title        String
  content      String?
  published    Boolean   @default(false)
  viewCount    Int       @default(0)
  authorId     Int?
  caption      String?
  thumbnailUrl String?
  comments     Comment[]
  likes        Like[]
  author       User?     @relation(fields: [authorId], references: [id])
}

model Comment {
  id        Int      @id @default(autoincrement())
  content   String
  storyId   Int
  authorId  Int
  parentCommentId Int?
  createdAt DateTime @default(now())
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  story     Story    @relation(fields: [storyId], references: [id], onDelete: Cascade)
  parent   Comment? @relation("CommentHierarchy", fields: [parentCommentId], references: [id])
  replies  Comment[] @relation("CommentHierarchy")
}

model Like {
  id        Int      @id @default(autoincrement())
  storyId   Int
  userId    Int
  createdAt DateTime @default(now())
  story     Story    @relation(fields: [storyId], references: [id], onDelete: Cascade)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([storyId, userId])
}
```

**Explanation of Models:**

*   **`User`**: Represents a user in the system. Includes authentication-related fields like `password`, `hashedRefreshToken`, and `emailVerified`, along with `name`, `image`, and `role`.
*   **`Account`**: Stores information about user accounts linked via OAuth providers (e.g., Google).
*   **`Session`**: Used for managing user sessions.
*   **`VerificationToken`**: Stores tokens for email verification or password resets.
*   **`Story`**: Represents a story or post. Includes `title`, `content`, `authorId`, `published` status, `viewCount`, and metadata like `createdAt` and `updatedAt`.
*   **`Comment`**: Represents a comment on a story. Supports nested comments (replies) through `parentCommentId` and a self-referencing relation `CommentHierarchy`.
*   **`Like`**: Represents a user's like on a story. Ensures a user can only like a story once (`@@unique([storyId, userId])`).

### 3.3 Authentication and Authorization

The `AuthModule` is responsible for handling user authentication and authorization.

*   **`AuthService`**: Contains the core logic for user registration, login, token generation (access and refresh tokens), token validation, and logout. It uses `bcrypt` for password hashing and `argon2` for refresh token hashing.
*   **Strategies (`src/auth/strategies`):**
    *   `local_strategy.ts`: Implements username/password authentication using Passport's `LocalStrategy`.
    *   `jwt_strategy.ts`: Validates JWT access tokens.
    *   `refresh.strategy.ts`: Validates JWT refresh tokens and handles refresh token rotation.
    *   `google.strategy.ts`: Handles Google OAuth2.0 authentication.
*   **Guards (`src/auth/guards`):**
    *   `LocalAuthGuard`: Protects local login routes.
    *   `JwtAuthGuard`: Protects routes requiring a valid JWT access token.
    *   `RefreshAuthGuard`: Protects the refresh token endpoint.
    *   `GoogleAuthGuard`: Initiates and handles Google OAuth callbacks.
    *   `RolesGuard`: Implements role-based access control, checking if the authenticated user has the required roles.
*   **Decorators (`src/auth/Decorators`):**
    *   `@Public()`: Marks routes that do not require authentication.
    *   `@Roles(...roles: Role[])`: Specifies the roles required to access a particular route or controller.
*   **JWT Configuration (`src/auth/config`):**
    *   `jwt.config.ts`: Defines configuration for access tokens (secret, expiration).
    *   `refresh_jwt.config.ts`: Defines configuration for refresh tokens (secret, expiration).
    *   `google-oauth.config.ts`: Contains Google API credentials.

**Authentication Flow (High-Level):**

1.  **Registration:** User provides email, name, and password. `AuthService` hashes the password and creates a new user via `UsersService`.
2.  **Local Login:** User provides email and password. `LocalAuthGuard` uses `localStartegy` to validate credentials. On success, `AuthService` generates both access and refresh JWTs, hashes the refresh token, stores it, and returns both tokens.
3.  **Google Login:** User initiates Google OAuth. `GoogleAuthGuard` redirects to Google. After successful authentication with Google, the callback is handled by `GoogleAuthGuard`, which uses `GoogleStrategy` to validate the Google profile. If the user doesn't exist, it's created. Then, `AuthService` generates and returns access and refresh tokens.
4.  **Protected Routes:** `JwtAuthGuard` extracts and validates the JWT access token from the request header. If valid, the `AuthJwtPayload` (user ID and role) is attached to the request.
5.  **Role-Based Authorization:** `RolesGuard` (used with `@Roles` decorator) checks the user's role from the `AuthJwtPayload` against the required roles for the route.
6.  **Token Refresh:** User sends a refresh token to the `/auth/refresh` endpoint. `RefreshAuthGuard` uses `RefreshJwtStrategy` to validate the refresh token and verifies it against the stored hashed refresh token. On success, new access and refresh tokens are generated, and the new refresh token is hashed and stored.
7.  **Logout:** `AuthService` clears the stored `hashedRefreshToken` for the user.

### 3.4 Controllers, Services, DTOs, Mappers (Example: Users Module)

This section illustrates the typical structure within a module.

*   **`users.controller.ts`**: Handles incoming HTTP requests and sends responses.
    ```typescript
    // @orchid-api-nest/src/users/users.controller.ts
    import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
    import { UsersService } from './users.service';
    import { CreateUserDto } from './dto/create-user.dto';
    import { UpdateUserDto } from './dto/update-user.dto';
    import { UserDashboardDto, UserResponseDto } from './dto/user-response.dto';
    import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
    import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
    import { Role } from 'src/auth/Enums/role.enum';
    import { Roles } from 'src/auth/Decorators/roles.decorator';
    import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

    @Controller('user')
    export class UsersController {
      constructor(private readonly usersService: UsersService) {}

      @UseGuards(JwtAuthGuard)
      @Get('me')
      getProfile(@Request() req) {
        return this.usersService.getMe(req.user.sub);
      }

      @ApiOkResponse({ type: UserResponseDto })
      @Get('userbyid/:id')
      async GetUserById(
        @Param('id') id: string,
      ): Promise<UserResponseDto | { message: string }> {
        // ... implementation ...
      }

      @UseGuards(RolesGuard)
      @UseGuards(JwtAuthGuard)
      @ApiBearerAuth('access_token')
      @ApiOkResponse({ type: [UserDashboardDto] })
      @Roles(Role.ADMIN) // Example of role-based authorization
      @Get('testJwtAuthZAdmin')
      async GetUserTestJwtAuthZ(): Promise<UserDashboardDto[]> {
        return this.usersService.getUsersDashboardData();
      }

      // ... other routes (createUser, updateUser, deleteUser, etc.) ...
    }
    ```
*   **`users.service.ts`**: Contains the business logic for user management. Interacts with `PrismaService`.
    ```typescript
    // @orchid-api-nest/src/users/users.service.ts
    import { Injectable } from '@nestjs/common';
    import { CreateUserDto } from './dto/create-user.dto';
    import { UpdateUserDto } from './dto/update-user.dto';
    import { PrismaService } from 'src/prisma/prisma.service';
    import { User } from '@prisma/client';
    import { UserDashboardDto, UserResponseDto } from './dto/user-response.dto';
    import { UserMapper } from './Mapper/user-mapper';
    import { CommentMapper } from 'src/comment/Mappers/comment-mapper';
    import { StoryMapper } from 'src/story/Mapper/stroy-mapper';
    import { LikeMapper } from 'src/like/Mappers/like-mapper';

    @Injectable()
    export class UsersService {
      constructor(private readonly _prisma: PrismaService) {}

      private userMapper = new UserMapper();
      private commentMapper = new CommentMapper();
      private storyMapper = new StoryMapper();
      private likeMapper = new LikeMapper();

      async getMe(id: number) {
        // ... implementation ...
      }

      async getUserById(id: number): Promise<UserResponseDto | null> {
        // ... fetches user with relations, maps to DTO ...
      }

      async createUser(
        createUserDto: CreateUserDto,
      ): Promise<UserResponseDto | null> {
        // ... creates user, maps to DTO ...
      }

      // ... other methods (updateUser, deleteUser, UpdateHashedRefreshToken, etc.) ...
    }
    ```
*   **`dto/create-user.dto.ts`, `dto/update-user.dto.ts`, `dto/user-response.dto.ts`**: Data Transfer Objects for input validation and output shaping.
*   **`Mapper/user-mapper.ts`**: Handles mapping Prisma `User` models to DTOs.
    ```typescript
    // @orchid-api-nest/src/users/Mapper/user-mapper.ts
    import { User } from '@prisma/client';
    import { UserDashboardDto, UserResponseDto } from '../dto/user-response.dto';
    import { CommentResponseDto } from 'src/comment/dto/comment-response.dto';
    import { LikeResponseDto } from 'src/like/dto/LikeResponseDto';
    import { StoryResponseDto } from 'src/story/dto/story-response.dto';

    export class UserMapper {
      toResponseDto(
        user: User,
        comments: CommentResponseDto[],
        likes: LikeResponseDto[],
        stories: StoryResponseDto[],
      ): UserResponseDto {
        return {
          id: user.id,
          email: user.email,
          name: user.name || '',
          emailVerified: user.emailVerified || undefined,
          image: user.image || '',
          role: user.role,
          createdAt: user.createdAt,
          comments: comments || [],
          likes: likes || [],
          stories: stories || [],
        };
      }

      toSampleResponse(user: User): UserResponseDto {
        return {
          id: user.id,
          email: user.email,
          name: user.name || '',
          emailVerified: user.emailVerified || undefined,
          image: user.image || '',
          role: user.role,
          createdAt: user.createdAt,
          comments: [],
          likes: [],
          stories: [],
        };
      }

      // ... other mapping methods ...
    }
    ```

### 3.5 API Endpoints (Examples)

*   **Auth:**
    *   `POST /auth/register`: Register a new user.
    *   `POST /auth/login`: Authenticate a user and get JWT tokens.
    *   `POST /auth/refresh`: Refresh access token using a refresh token.
    *   `GET /auth/google/login`: Initiate Google OAuth login.
    *   `GET /auth/google/callback`: Google OAuth callback endpoint.
    *   `POST /auth/logOut`: Log out a user.
*   **Users:**
    *   `GET /user/me`: Get current authenticated user's profile.
    *   `GET /user/userbyid/:id`: Get user details by ID.
    *   `GET /user/usersdashboard`: Get dashboard summary for all users (e.g., stories count, comments count).
    *   `POST /user/createuser`: Create a new user.
*   **Story:**
    *   `GET /story/allstories`: Get all stories.
    *   `GET /story/storiessummary`: Get summaries of all stories.
    *   `GET /story/storybyid/:id`: Get a single story by ID with its comments and likes.
    *   `POST /story/createstory`: Create a new story.
*   **Comment:**
    *   `GET /comment/GetCommentsByStoryId/:id`: Get all comments for a specific story.
    *   `POST /comment/CreateComment`: Add a new comment.
*   **Like:**
    *   `GET /like/getStoryLikesCount/:storyId`: Get the number of likes for a story.
    *   `POST /like/likeStory`: Like a story.
    *   `DELETE /like/unlikeStory/:storyId/:userId`: Unlike a story.

### 3.6 Setup and Run (Backend)

1.  **Install Dependencies:**
    ```bash
    pnpm install
    ```
2.  **Environment Variables:**
    Create a `nest_Dev.env` file in `orchid-api-nest/` based on `nest_Dev.env.example` (if one existed, or configure directly as per `nest_Dev.env` content).
    ```
    DATABASE_URL="postgresql://user:password@host:port/database"
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=6000
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    REFRESH_TOKEN_EXPIRES_IN=604800
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
    ```
3.  **Run Migrations and Seed Database (Optional):**
    ```bash
    # Ensure Prisma is configured correctly and run migrations
    pnpm prisma migrate dev --name init

    # Seed the database with initial data
    pnpm run seed
    ```
4.  **Run the application:**
    ```bash
    # development mode with watch
    pnpm run start:dev

    # production mode
    pnpm run start:prod
    ```
    The API will typically run on `http://localhost:3000`.

## 4. Frontend Architecture (Orchid-React)

The React frontend provides the user interface for interacting with the backend API. It uses Redux Toolkit for state management and React Router for navigation.

### 4.1 Project Structure

*   **`src/Components`**: Reusable UI components.
    *   `Comments/`: Components related to displaying and interacting with comments (`CommentCard`, `AddComment`, `ReplyDialog`, `DeleteCommentDialog`, `EditCommentDialog`).
    *   `Home/`: General home-related components.
    *   `MarkDown/`: `MarkdownRenderer` for displaying markdown content.
    *   `RoutingComponents/`: Generic components like `ErrorMessage` and `LoadingSpinner`.
    *   `Story/`: Components for displaying stories (`StoryCard`, `StoryList`).
    *   `Users/`: Components for user-related UI (`UserCard`, `DeleteUserDialog`, `UserInfoPageComponents`).
*   **`src/Pages`**: Top-level page components that combine various components to form a view.
    *   `HomePage.tsx`
    *   `Storypages/`: `AddNewStoryPage`, `StoryReadingPage`, `UpdateStoryPage`.
    *   `UsersPages/`: `UserInfoPage`, `UsersTable`.
*   **`src/Redux`**: Contains the Redux Toolkit store, slices, and API service definitions.
    *   `apis/`: API call functions using Axios (`CommentsApi.ts`, `UsersApi.ts`, `storiesApi.ts`).
    *   `slices/`: Redux slices for managing different parts of the application state (`CommentSlice.ts`, `UsersSlice.ts`, `storySlice.ts`).
    *   `store.ts`: Configures the Redux store.
    *   `hooks.ts`: Custom typed Redux hooks (`useAppDispatch`, `useAppSelector`).
*   **`src/Routes`**: Defines the application's routing using `react-router-dom`.
*   **`src/types`**: TypeScript type definitions for various entities and DTOs.
*   **`App.tsx`**: Main application component, often used for global layout or routing setup.
*   **`main.tsx`**: Entry point of the React application.

### 4.2 State Management (Redux Toolkit)

Redux Toolkit is used for efficient and predictable state management.

*   **`store.ts`**:
    ```typescript
    // @orchid-react/src/Redux/store.ts
    import { configureStore } from '@reduxjs/toolkit'
    import storyReducer from './slices/storySlice'
    import commentReducer from './slices/CommentSlice'
    import userReducer from './slices/UsersSlice'

    const store = configureStore({
      reducer: {
        user: userReducer,
        story: storyReducer,
        comment: commentReducer
      }
    })

    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch

    export default store
    ```
*   **`hooks.ts`**: Provides typed hooks for interacting with the Redux store.
    ```typescript
    // @orchid-react/src/Redux/hooks.ts
    import type { AppDispatch, RootState } from './store'
    import { useDispatch, useSelector } from 'react-redux'

    export const useAppSelector = useSelector.withTypes<RootState>()
    export const useAppDispatch = () => useDispatch<AppDispatch>()
    ```
*   **Slices (e.g., `storySlice.ts`):** Each slice manages a specific part of the application state and contains reducers and asynchronous thunks for API calls.
    ```typescript
    // @orchid-react/src/Redux/slices/storySlice.ts
    import type {
      CreateStoryDto,
      StoryResponseDto,
      StorySummaryDto,
      StoryWithCommentsAndLikes,
      UpdateStoryDto
    } from '@/types/storyTypes'
    import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
    import {
      createStoryApi,
      getAllStoriesApi,
      getStoriesSummaryByIdApi,
      getStoryByIdApi,
      updateStoryApi
    } from '../apis/storiesApi'

    interface StoryState {
      stories: StoryResponseDto[]
      status: 'idle' | 'loading' | 'succeeded' | 'failed'
      error: string | null
      story: StoryResponseDto | null
      CurrentStory: StoryWithCommentsAndLikes | null
      storySummary: StorySummaryDto | null
      storiesSummary: StorySummaryDto[] | null
    }

    const initialState: StoryState = { /* ... */ }

    export const getAllStoriesSlice = createAsyncThunk(`/allstories`, async () => { /* ... */ });
    export const getStoriesSummarySlice = createAsyncThunk(`/storiessummary`, async () => { /* ... */ });
    export const getStoryByIdSlice = createAsyncThunk(`/storybyid`, async (id: number) => { /* ... */ });
    export const createStorySlice = createAsyncThunk(`/createstory`, async (storyData: CreateStoryDto) => { /* ... */ });
    export const updateStorySlice = createAsyncThunk(`/updatestory`, async ({ id, storyData }: { id: number; storyData: UpdateStoryDto }) => { /* ... */ });

    const storySlice = createSlice({
      name: 'story',
      initialState: initialState,
      reducers: {},
      extraReducers: builder => {
        builder
          .addCase(getAllStoriesSlice.pending, state => { state.status = 'loading' })
          .addCase(getAllStoriesSlice.fulfilled, (state, action) => { state.status = 'succeeded'; state.stories = action.payload })
          .addCase(getAllStoriesSlice.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message || 'Failed to fetch stories' })
          // ... other cases for different async thunks ...
      }
    })

    export default storySlice.reducer
    ```

### 4.3 Routing

The application uses `react-router-dom` for client-side routing, defined in `src/Routes/Routes.ts`.

```typescript
// @orchid-react/src/Routes/Routes.ts
import { createBrowserRouter } from 'react-router'
import HomePage from '../Pages/HomePage'
import StoryList from '@/Components/Story/storyList'
import StoryReadingPage from '@/Pages/Storypages/StoryReadingPage'
import AddNewStoryPage from '@/Pages/Storypages/AddNewStoryPage'
import UpdateStoryPage from '@/Pages/Storypages/UpdateStoryPage'
import UsersTable from '@/Pages/UsersPages/Userstable'
import UserInfoPage from '@/Pages/UsersPages/UserInfoPage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage
  },
  {
    path: '/stories',
    Component: StoryList
  },
  { path: 'stories/:storyId', Component: StoryReadingPage },
  {
    path: '/addnewstory',
    Component: AddNewStoryPage
  },
  {
    path: `/stories/edit/:storyId`,
    Component: UpdateStoryPage
  },
  {
    path: '/usersTable',
    Component: UsersTable
  },
  {
    path: '/users/:userId',
    Component: UserInfoPage
  }
])

export default router
```

### 4.4 Components (Examples)

*   **`StoryCard.tsx`**: Displays a summary of a story with its title, caption, thumbnail, likes, and comments count.
*   **`AddComment.tsx`**: A form component for adding new comments to a story.
*   **`UsersTable.tsx`**: Displays a table of users with their dashboard data, including actions like viewing user info or deleting a user. Uses Material-UI `Table` and `Pagination`.

### 4.5 API Integration

API calls are handled through Axios instances defined in `src/Redux/apis/` and orchestrated via Redux Toolkit's `createAsyncThunk`.

```typescript
// @orchid-react/src/Redux/apis/storiesApi.ts
import type { CreateStoryDto, StorySummaryDto, UpdateStoryDto } from '@/types/storyTypes'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/story', // Base URL for story API
  headers: {
    'Content-Type': 'application/json',
    Accept: 'text/plain'
  }
})

export const getAllStoriesApi = async () => {
  try {
    const response = await api.get(`/allstories`)
    return response.data
  } catch (error) {
    console.error('Error fetching all stories:', error)
    throw error
  }
}

// ... other API functions for stories, comments, and users ...
```

### 4.6 Setup and Run (Frontend)

1.  **Install Dependencies:**
    ```bash
    pnpm install
    ```
2.  **Run the application:**
    ```bash
    pnpm run dev
    ```
    The frontend application will typically run on `http://localhost:5173`.
