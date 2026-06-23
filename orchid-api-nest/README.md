# 🌸 Orchid — Full-Stack Application Documentation

> A full-stack storytelling platform built with **NestJS** (backend) and **React + Vite** (frontend).  
> Users can publish stories, comment, like, and interact — with full JWT + Google OAuth authentication.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Monorepo Structure](#3-monorepo-structure)
4. [Backend — orchid-api-nest](#4-backend--orchid-api-nest)
   - [Architecture](#41-architecture)
   - [Database Schema (Prisma)](#42-database-schema-prisma)
   - [Module System](#43-module-system)
   - [Authentication System](#44-authentication-system)
   - [Controllers & API Endpoints](#45-controllers--api-endpoints)
   - [Services (Business Logic)](#46-services-business-logic)
   - [DTOs (Data Transfer Objects)](#47-dtos-data-transfer-objects)
   - [Mappers](#48-mappers)
   - [Prisma Service](#49-prisma-service)
5. [Frontend — orchid-react](#5-frontend--orchid-react)
   - [Architecture](#51-architecture)
   - [Routing](#52-routing)
   - [Redux State Management](#53-redux-state-management)
   - [API Services](#54-api-services)
   - [Components](#55-components)
   - [TypeScript Types](#56-typescript-types)
6. [Environment Configuration](#6-environment-configuration)
7. [Running the Project](#7-running-the-project)

---

## 1. Project Overview

**Orchid** is a content/storytelling platform where users can:

- **Register & Login** (email/password or Google OAuth)
- **Create, Read, Update, Delete stories** (with markdown content support)
- **Comment** on stories (with nested replies)
- **Like/Unlike** stories
- **View user dashboards** with activity stats

---

## 2. Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| NestJS 11 | Server framework |
| Prisma 7 | ORM + migrations |
| PostgreSQL | Database |
| Passport.js | Authentication strategies |
| JWT (`@nestjs/jwt`) | Token-based auth |
| Argon2 + Bcrypt | Password & token hashing |
| Swagger + Scalar | API documentation |
| class-validator | DTO validation |

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite (Rolldown) | Build tool |
| Redux Toolkit | State management |
| Axios | HTTP client |
| React Router 7 | Client-side routing |
| MUI 7 | UI component library |
| TailwindCSS 4 | Utility-first CSS |
| react-markdown | Markdown rendering |

---

## 3. Monorepo Structure

```
Orchid-React-Nestjs/
├── orchid-api-nest/          # NestJS Backend
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   ├── seed.ts           # Seed data
│   │   └── migrations/
│   ├── src/
│   │   ├── main.ts           # Bootstrap + Swagger
│   │   ├── app.module.ts     # Root module
│   │   ├── auth/             # Auth module
│   │   ├── users/            # Users module
│   │   ├── story/            # Story module
│   │   ├── comment/          # Comment module
│   │   ├── like/             # Like module
│   │   ├── prisma/           # Prisma service module
│   │   └── mapping/          # Shared mappers
│   ├── nest_Dev.env          # Environment variables
│   └── package.json
│
├── orchid-react/             # React Frontend
│   ├── src/
│   │   ├── main.tsx          # Entry point (Provider + Router)
│   │   ├── App.tsx           # Root component
│   │   ├── Components/       # Reusable UI components
│   │   ├── Pages/            # Page-level components
│   │   ├── Redux/            # Store, slices, API services
│   │   ├── Routes/           # Router configuration
│   │   └── types/            # TypeScript interfaces
│   └── package.json
│
├── docker/                   # Docker configuration
└── package.json              # Root workspace
```

---

## 4. Backend — orchid-api-nest

### 4.1 Architecture

The backend follows NestJS's **modular architecture** pattern:

```
Request → Controller → Service → Prisma (DB) → Mapper → Response DTO
                ↑
          Guards / Strategies (Auth)
```

**Key patterns:**
- **Module-per-feature**: Each domain (Auth, Users, Story, Comment, Like) is a self-contained NestJS module
- **DTO validation**: `class-validator` decorators on all input DTOs
- **Mapper pattern**: Dedicated mapper classes convert Prisma entities → response DTOs
- **Strategy pattern**: Passport.js strategies for each auth method (Local, JWT, Refresh, Google)
- **Guard-based authorization**: `JwtAuthGuard`, `RolesGuard`, `RefreshAuthGuard`, `GoogleAuthGuard`

### 4.2 Database Schema (Prisma)

**Provider:** PostgreSQL

#### Entity Relationship Diagram

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│   User   │────<│  Story   │────<│ Comment  │
│          │     │          │     │          │
│ id (PK)  │     │ id (PK)  │     │ id (PK)  │
│ email    │     │ title    │     │ content  │
│ name?    │     │ content? │     │ storyId  │──→ Story
│ password?│     │ published│     │ authorId │──→ User
│ role     │     │ viewCount│     │ parentId?│──→ Comment (self)
│ image?   │     │ authorId?│──→  │ createdAt│
│ hashed.. │     │ caption? │     └──────────┘
│ createdAt│     │ thumbUrl?│
└──────────┘     │ createdAt│     ┌──────────┐
     │           │ updatedAt│     │   Like   │
     │           └──────────┘     │          │
     │                │           │ id (PK)  │
     │                └──────────<│ storyId  │──→ Story
     │                            │ userId   │──→ User
     └───────────────────────────<│ createdAt│
                                  └──────────┘
     ┌──────────┐    ┌──────────┐    ┌────────────────┐
     │ Account  │    │ Session  │    │VerificationTkn │
     │ userId→User   │ userId→User   │ identifier     │
     │ provider │    │ token    │    │ token          │
     │ type     │    │ expires  │    │ expires        │
     └──────────┘    └──────────┘    └────────────────┘
```

#### Models Summary

| Model | Key Fields | Relations |
|---|---|---|
| **User** | `id`, `email` (unique), `name?`, `password?`, `hashedRefreshToken?`, `image?`, `role` (default "USER") | → Stories, Comments, Likes, Accounts, Sessions |
| **Story** | `id`, `title`, `content?`, `published`, `viewCount`, `authorId?`, `caption?`, `thumbnailUrl?` | → Author (User), Comments, Likes |
| **Comment** | `id`, `content`, `storyId`, `authorId`, `parentCommentId?` | → Story, Author (User), Parent Comment (self-referential) |
| **Like** | `id`, `storyId`, `userId` — `@@unique([storyId, userId])` | → Story, User |
| **Account** | OAuth provider data — `@@unique([provider, providerAccountId])` | → User (cascade delete) |
| **Session** | `sessionToken` (unique), `expires` | → User (cascade delete) |
| **VerificationToken** | `identifier`, `token` — `@@unique([identifier, token])` | — |

### 4.3 Module System

**Root Module** (`app.module.ts`) imports all feature modules:

```
AppModule
├── PrismaModule      (Global DB access)
├── ConfigModule      (env: nest_Dev.env, isGlobal: true)
├── AuthModule        (Authentication & Authorization)
├── UsersModule       (User CRUD)
├── StoryModule       (Story CRUD)
├── CommentModule     (Comment CRUD)
└── LikeModule        (Like/Unlike)
```

### 4.4 Authentication System

#### Overview

The auth system uses **Passport.js** with **JWT tokens** (access + refresh) and **Google OAuth 2.0**.

#### Auth Flow

```
┌─ Registration ─────────────────────────────────┐
│ POST /auth/register                            │
│ → Hash password (bcrypt) → Create user → Return│
└────────────────────────────────────────────────┘

┌─ Login (Local) ────────────────────────────────┐
│ POST /auth/login                               │
│ → LocalAuthGuard triggers LocalStrategy        │
│ → Validate email/password (bcrypt.compare)     │
│ → Generate access_token + refresh_token (JWT)  │
│ → Hash refresh_token (argon2) → store in DB    │
│ → Return { access_token, refresh_token }       │
└────────────────────────────────────────────────┘

┌─ Token Refresh ────────────────────────────────┐
│ POST /auth/refresh                             │
│ → RefreshAuthGuard triggers RefreshJwtStrategy  │
│ → Extract token from Authorization header      │
│ → Verify against hashed token in DB (argon2)   │
│ → Generate new access_token                    │
│ → Return { access_token }                      │
└────────────────────────────────────────────────┘

┌─ Google OAuth ─────────────────────────────────┐
│ GET /auth/google/login → Redirect to Google    │
│ GET /auth/google/callback → GoogleStrategy     │
│ → Find or create user → Generate tokens        │
│ → Return { access_token, refresh_token }       │
└────────────────────────────────────────────────┘

┌─ Logout ───────────────────────────────────────┐
│ POST /auth/logOut                              │
│ → JwtAuthGuard → Clear hashedRefreshToken (null)│
└────────────────────────────────────────────────┘
```

#### JWT Payload Type

```typescript
type AuthJwtPayload = {
  sub: number;   // User ID
  role: string;  // "USER" | "ADMIN" | "moderator"
};
```

#### Strategies

| Strategy | File | Passport Name | Purpose |
|---|---|---|---|
| `localStrategy` | `strategies/local_strategy.ts` | `"local"` | Email/password login. Maps `usernameField` → `email` |
| `JwtStrategy` | `strategies/jwt_strategy.ts` | `"jwt"` | Validates access tokens from `Authorization: Bearer <token>` |
| `RefreshJwtStrategy` | `strategies/refresh.strategy.ts` | `"refresh-jwt"` | Validates refresh tokens + verifies hash in DB |
| `GoogleStrategy` | `strategies/google.strategy.ts` | `"google"` | Google OAuth 2.0 with `email` + `profile` scopes |

#### Guards

| Guard | Purpose |
|---|---|
| `LocalAuthGuard` | Wraps `AuthGuard('local')` for login |
| `JwtAuthGuard` | Wraps `AuthGuard('jwt')` for protected routes |
| `RefreshAuthGuard` | Wraps `AuthGuard('refresh-jwt')` for token refresh |
| `GoogleAuthGuard` | Wraps `AuthGuard('google')` for Google OAuth |
| `RolesGuard` | Role-based authorization using `@Roles()` decorator |

#### Custom Decorators

| Decorator | Purpose |
|---|---|
| `@Public()` | Marks route as public (bypasses auth) — sets `IS_PUBLIC` metadata |
| `@Roles(Role.ADMIN, ...)` | Sets required roles metadata — checked by `RolesGuard` |

#### Role Enum

```typescript
enum Role {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}
```

#### JWT Configuration

| Config | Secret Env Var | Expiry Env Var | Default Expiry |
|---|---|---|---|
| Access Token | `JWT_SECRET` | `JWT_EXPIRES_IN` | 30 seconds |
| Refresh Token | `REFRESH_TOKEN_SECRET` | `REFRESH_TOKEN_EXPIRES_IN` | 604800s (7 days) |

### 4.5 Controllers & API Endpoints

#### Auth Controller — `POST/GET /auth/*`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Register a new user |
| `POST` | `/auth/registerListOfUsers` | Public | Bulk register users |
| `POST` | `/auth/login` | `LocalAuthGuard` | Login with email/password |
| `POST` | `/auth/refresh` | `RefreshAuthGuard` | Refresh access token |
| `POST` | `/auth/logOut` | `JwtAuthGuard` | Logout (clear refresh token) |
| `GET` | `/auth/google/login` | `GoogleAuthGuard` | Redirect to Google login |
| `GET` | `/auth/google/callback` | `GoogleAuthGuard` | Google OAuth callback |

#### Users Controller — `/user/*`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/user/me` | `JwtAuthGuard` | Get current user profile |
| `GET` | `/user/userbyid/:id` | Public | Get user by ID (full) |
| `GET` | `/user/usersdashboard` | Public | Get all users dashboard data |
| `GET` | `/user/userdashboard/:id` | Public | Get single user dashboard data |
| `GET` | `/user/testjwtUser` | `JwtAuthGuard` + `RolesGuard(USER)` | Test JWT (USER role) |
| `GET` | `/user/testJwtAuthZAdmin` | `JwtAuthGuard` + `RolesGuard(ADMIN)` | Test JWT (ADMIN role) |
| `POST` | `/user/createuser` | Public | Create a user |
| `POST` | `/user/createListUsers` | Public | Bulk create users |
| `PUT` | `/user/updateuser/:id` | Public | Update a user |
| `DELETE` | `/user/deleteuser/:id` | Public | Delete a user |

#### Story Controller — `/story/*`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/story/allstories` | Public | Get all stories |
| `GET` | `/story/storiessummary` | Public | Get stories summary (with counts) |
| `GET` | `/story/storysummarybyid/:id` | Public | Get story summary by ID |
| `GET` | `/story/storybyid/:id` | Public | Get full story (with comments, likes, author) |
| `POST` | `/story/createstory` | Public | Create a story |
| `POST` | `/story/createlistofstories` | Public | Bulk create stories |
| `PUT` | `/story/updatestory/:id` | Public | Update a story |
| `DELETE` | `/story/deletestory/:id` | Public | Delete a story |

#### Comment Controller — `/comment/*`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/comment/GetCommentsByStoryId/:id` | Public | Get all top-level comments for a story (with replies) |
| `GET` | `/comment/GetCommentById/:id` | Public | Get single comment |
| `POST` | `/comment/CreateComment` | Public | Create a comment (supports `parentCommentId` for replies) |
| `PUT` | `/comment/UpdateComment/:id` | Public | Update comment content |
| `DELETE` | `/comment/DeleteComment/:id` | Public | Delete a comment |

#### Like Controller — `/like/*`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/like/getStoryLikesCount/:storyId` | Public | Get like count for a story |
| `POST` | `/like/likeStory` | Public | Like a story (prevents duplicates) |
| `DELETE` | `/like/unlikeStory/:storyId/:userId` | Public | Unlike a story |

### 4.6 Services (Business Logic)

#### AuthService

| Method | Description |
|---|---|
| `RegisterUser(dto)` | Hash password with bcrypt, create user, return `{id, email, name}` |
| `RegisterListOfUsers(dtos)` | Bulk registration |
| `ValidateUser(email, password)` | Find user by email, compare password with bcrypt → return `AuthJwtPayload` |
| `login(user)` | Generate access + refresh tokens, hash refresh with argon2, store in DB |
| `generateTokens(user)` | Sign both JWT tokens concurrently with `Promise.all` |
| `refreshToken(user)` | Regenerate tokens, update hashed refresh token in DB |
| `validateRefreshToken(userId, token)` | Verify refresh token against DB hash using argon2 |
| `logOut(userId)` | Set `hashedRefreshToken` to `null` |
| `ValidateGoogleUser(googleUser)` | Find existing user by email or create new one |

#### UsersService

| Method | Description |
|---|---|
| `getMe(id)` | Get current user (id, email, name, image, role) |
| `getUsers()` | Get all users with comments, likes, and stories (fully mapped) |
| `getUserById(id)` | Get single user with all relations |
| `getPrismaUserById(id)` | Get raw Prisma user (for auth internal use) |
| `getUsersDashboardData()` | Get users with story/comment counts |
| `getUserByEmailToAuth(email)` | Find user by email (for auth) |
| `createUser(dto)` | Create user and return mapped response |
| `updateUser(id, dto)` | Update user fields |
| `UpdateHashedRefreshToken(id, hash)` | Update refresh token hash |
| `deleteUser(id)` | Delete user with existence check |

#### StoryService

| Method | Description |
|---|---|
| `getAllStories()` | Get all stories ordered by `createdAt desc` |
| `getStoriesSummary()` | Get stories with likes/comments counts |
| `getStoryById(id)` | Get story with nested comments (including replies + authors), likes, author |
| `getStorySummaryById(id)` | Get single story summary with counts |
| `createStory(dto)` | Create story (validates author exists) |
| `updateStory(id, dto)` | Update story fields |
| `deleteStory(id)` | Delete story with existence check |

#### CommentService

| Method | Description |
|---|---|
| `getAllCommentsForStory(storyId)` | Get top-level comments (`parentCommentId: null`) with replies and authors |
| `getCommentById(id)` | Get single comment |
| `createComment(dto)` | Create comment (supports `parentCommentId` for threading) |
| `updateComment(id, dto)` | Update comment content |
| `deleteComment(id)` | Delete comment |

#### LikeService

| Method | Description |
|---|---|
| `getLikesCountForStory(storyId)` | Return `{ storyId, likesCount }` |
| `islikedByUser(storyId, userId)` | Check if user already liked |
| `likeStory(dto)` | Create like (prevents duplicates) |
| `unlikeStory(storyId, userId)` | Remove like |

### 4.7 DTOs (Data Transfer Objects)

#### User DTOs

```typescript
// CreateUserDto
{ email: string, name?: string, password: string, image?: string, role?: string }

// UpdateUserDto
{ email?: string, name?: string, image?: string, role?: string }

// UserResponseDto
{ id, email, name?, emailVerified?, image?, role, createdAt, comments?, likes?, stories? }

// UserDashboardDto
{ id, email, name?, role, createdAt, storiesCount, commentsCount }

// LoginDto
{ email: string, password: string }
```

#### Story DTOs

```typescript
// CreateStoryDto
{ title: string, content?: string, caption?: string, thumbnailUrl?: string, published?: boolean, authorId?: number }

// UpdateStoryDto
{ title?, content?, caption?, thumbnailUrl?, published?, authorId? }

// StoryResponseDto
{ id, title, caption?, content?, thumbnailUrl?, published, viewCount, createdAt, updatedAt, authorId?, author?, likes?, comments? }

// storySummryDto
{ id, title, caption?, thumbnailUrl?, published, viewCount, createdAt, updatedAt, authorId?, likesCount, commentsCount }
```

#### Comment DTOs

```typescript
// CreateCommentDto
{ content: string, storyId: number, authorId: number, parentCommentId?: number }

// UpdateCommentDto (extends partial)
{ content?: string }

// CommentResponseDto
{ id, content, storyId, authorId, createdAt, parentCommentId?, replies: CommentResponseDto[], author?: UserResponseDto }
```

#### Like DTOs

```typescript
// CreateLikeDto
{ storyId: number, userId: number }

// LikeResponseDto
{ id, storyId, userId, createdAt }
```

### 4.8 Mappers

Each module has a dedicated mapper class that converts Prisma entities to response DTOs:

| Mapper | Methods |
|---|---|
| `UserMapper` | `toResponseDto(user, comments, likes, stories)`, `toSampleResponse(user)`, `toUserDashboardDto(user, storiesCount, commentsCount)` |
| `StoryMapper` | `toStoryResponse(story, comments, likes, author)`, `toStorySummaryDto(story, likesCount, commentsCount)`, `toStoryResponseList(stories)` |
| `CommentMapper` | `toResponse(comment, replies?, author?)`, `toResponseList(comments)` |
| `LikeMapper` | `toResponse(like)`, `toResponseList(likes)` |

### 4.9 Prisma Service

```typescript
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });
    super({ adapter });
  }
}
```

- Uses `@prisma/adapter-pg` for PostgreSQL driver adapter
- Registered as a global module via `PrismaModule`
- Injected into all services via constructor DI

---

## 5. Frontend — orchid-react

### 5.1 Architecture

```
main.tsx
├── StrictMode
├── Redux Provider (store)
├── RouterProvider (react-router)
└── App (empty shell)
```

The frontend follows a **feature-based structure** with Redux Toolkit for state:

```
User Action → Component dispatches AsyncThunk
→ AsyncThunk calls API service (Axios)
→ API returns data
→ Slice reducer updates store
→ Component re-renders via useSelector
```

### 5.2 Routing

| Path | Component | Description |
|---|---|---|
| `/` | `HomePage` | Landing / home page |
| `/stories` | `StoryList` | List all stories |
| `/stories/:storyId` | `StoryReadingPage` | Read a story with comments |
| `/addnewstory` | `AddNewStoryPage` | Create new story form |
| `/stories/edit/:storyId` | `UpdateStoryPage` | Edit existing story |
| `/usersTable` | `UsersTable` | Users dashboard table |
| `/users/:userId` | `UserInfoPage` | User profile with tabs |

### 5.3 Redux State Management

#### Store Structure

```typescript
{
  user: {
    users: UserResponseDto[],
    user: UserResponseDto | null,
    usersDashboard: UserDashboardDto[] | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
  },
  story: {
    stories: StoryResponseDto[],
    story: StoryResponseDto | null,
    CurrentStory: StoryWithCommentsAndLikes | null,
    storySummary: StorySummaryDto | null,
    storiesSummary: StorySummaryDto[] | null,
    status, error
  },
  comment: {
    comments: CommentResponseDto[],
    comment: CommentResponseDto | null,
    status, error
  }
}
```

#### Async Thunks

**Story Slice:** `getAllStoriesSlice`, `getStoriesSummarySlice`, `getStoriesSummaryByIdSlice`, `getStoryByIdSlice`, `createStorySlice`, `updateStorySlice`, `deleteStoryApiSlice`

**Users Slice:** `getUsersDashboardSlice`, `getUsersSlice`, `getUserByIdSlice`, `deleteUserSlice`, `updateUserSlice`, `createUserSlice`

**Comment Slice:** `getCommentsByStoryIdSlice`, `getCommentByIdSlice`, `CreateCommentSlice`, `UpdateCommentSlice`, `deleteCommentSlice`

### 5.4 API Services

All API services use **Axios** instances with `baseURL: http://localhost:3000/<module>`:

| Service | Base URL | Functions |
|---|---|---|
| `storiesApi.ts` | `/story` | `getAllStoriesApi`, `getStoriesSummaryApi`, `getStoryByIdApi`, `createStoryApi`, `updateStoryApi`, `deleteStoryApi` |
| `UsersApi.ts` | `/user` | `getUsersApi`, `getUserByIdApi`, `getUsersDashboardDataApi`, `createUserApi`, `updateUserApi`, `deleteUserApi` |
| `CommentsApi.ts` | `/comment` | `getCommentsByStoryIdApi`, `getCommentByIdApi`, `createCommentApi`, `updateCommentApi`, `deleteCommentApi` |

### 5.5 Components

#### Story Components

| Component | Description |
|---|---|
| `StoryList` | Grid/list of story cards, fetches all stories |
| `StoryCard` | Individual story preview card |

#### Comment Components

| Component | Description |
|---|---|
| `ListComments` | Renders list of comments for a story |
| `CommentCard` | Single comment with author info |
| `AddComment` | Form to create a new comment |
| `EditComment` | Inline edit for existing comment |
| `ReplyDialog` | Dialog for replying to a comment |
| `ReplyItem` | Renders a nested reply |
| `DeleteCommentDialog` | Confirmation dialog for deletion |

#### User Components

| Component | Description |
|---|---|
| `UserCard` | User summary card |
| `DeleteUserDialog` | Confirmation dialog for user deletion |
| `StoriesTab` | Tab showing user's stories |
| `CommentsTab` | Tab showing user's comments |

#### Shared Components

| Component | Description |
|---|---|
| `MarkdownRenderer` | Renders markdown content with syntax highlighting |
| `LoadingSpinner` | Loading state indicator |
| `ErrorMessage` | Error display component |
| `ReturnHome` | Navigation back to home |

### 5.6 TypeScript Types

The frontend mirrors backend DTOs as TypeScript interfaces:

- `storyTypes.ts` — `CreateStoryDto`, `StoryResponseDto`, `UpdateStoryDto`, `StorySummaryDto`, `StoryWithCommentsAndLikes`
- `UserTypes.ts` — `CreateUserDto`, `UpdateUserDto`, `UserResponseDto`, `UserDashboardDto`
- `commentType.ts` — `CommentResponseDto`, `CreateCommentDto`, `UpdateCommentDto`
- `LikeType.ts` — `LikeResponseDto`

---

## 6. Environment Configuration

**File:** `nest_Dev.env` (loaded via `ConfigModule.forRoot`)

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for signing access tokens |
| `JWT_EXPIRES_IN` | Access token expiry (seconds) |
| `REFRESH_TOKEN_SECRET` | Secret key for signing refresh tokens |
| `REFRESH_TOKEN_EXPIRES_IN` | Refresh token expiry (default: 604800 = 7 days) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_CALLBACK_URL` | Google OAuth redirect URI |

---

## 7. Running the Project

### Backend

```bash
cd orchid-api-nest
pnpm install
# Run Prisma migrations
pnpx prisma migrate dev
# Seed the database
pnpm seed
# Start dev server (port 3000)
pnpm dev
```

**API docs available at:**
- Scalar UI: `http://localhost:3000/reference`

### Frontend

```bash
cd orchid-react
bun install    # or pnpm install
bun dev        # or pnpm dev (port 5173)
```

### CORS

Backend is configured to allow requests from `http://localhost:5173` (Vite dev server default).

---

> **Note:** Swagger decorators (`@ApiProperty`, `@ApiOkResponse`, `@ApiBearerAuth`) are applied throughout the backend for auto-generated API documentation.
