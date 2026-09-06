# Project Architecture & Structure

> Design reference: read [design.md](design.md) before changing frontend UI. It defines the Gatherly typography, semantic color tokens, automatic system theme behavior, spacing, radius, navigation, and marketing layout rules.

## Overview

This document describes the architecture and flow of the Gatherly v2 project. It serves as a reference for AI agents to understand the project structure, conventions, and maintenance patterns.

## Project Structure

### Root Directory
```
e:\Projects\Web-Dev\MERN-PERN\gatherly_v2
├── .git                 # Git repository
├── .idea                # JetBrains IDE settings
├── .kilo                # Kilo IDE settings
├── agents.md            # Project architecture documentation
├── backend/             # Backend application (Node.js + TypeScript)
│   ├── .env
│   ├── .gitignore
│   ├── constant.ts
│   ├── controllers/     # Request handlers
│   ├── express.d.ts
│   ├── generated/       # Prisma schemas and migrations
│   ├── index.ts
│   ├── lib/             # Shared utility modules
│   ├── middlewares/     # Custom middleware functions
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json     # Main backend dependency management
│   ├── prisma.config.ts
│   ├── prisma/
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic layer
│   ├── tsconfig.json
│   ├── type.ts
│   └── utils/           # Helper functions
├── frontend/            # Frontend application (React + Vite)
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json     # Frontend dependency management
│   ├── public/          # Static assets (images, fonts, etc.)
│   ├── src/             # React source code (components, hooks, types)
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── memory.md
```

### Conventions for AI Agents

#### New Files
- **Backend**: New API routes → `backend/routes/`
- **Backend**: New business logic → `backend/services/`
- **Backend**: Utility functions → `backend/lib/`
- **Backend**: Middleware → `backend/middlewares/`
- **Backend**: Core config → `backend/package.json`
- **Frontend**: Components → `frontend/src/`
- **Frontend**: Hooks → `frontend/src/hooks/`
- **Frontend**: Types → `frontend/src/types/`
- **Frontend**: Assets → `frontend/public/`

#### Existing Patterns
- Follow the established directory hierarchy strictly
- Use consistent naming (kebab-case for files, PascalCase for classes/components)
- Add new entries to `backend/routes/` before defining endpoints
- Place shared utilities in `backend/lib/`
- Keep frontend source in `frontend/src/` with clear component boundaries

## Backend Architecture (event-backend)

- **Framework**: Express.js (v5.2.1) with TypeScript
- **Database**: PostgreSQL via Prisma (v7.8.0) with adapter-pg
- **Authentication**: Clerk Express (v2.1.15) for JWT-based auth
- **File Handling**: ImageKit (v7.6.2) for image upload/processing
- **Image Processing**: Sharp (v0.35.3) for image manipulation
- **Validation**: Zod (v4.4.3) for input schema validation
- **Additional Dependencies**:
  - `@clerk/express` - Clerk Express integration (v2.1.15)
  - `@imagekit/nodejs` - ImageKit Node SDK (v7.6.2)
  - `cors` (v2.8.6)
  - `dotenv` (v17.4.2)
  - `express-rate-limit` (v8.6.0)
  - `multer` (v2.1.1)
  - `pg` (v8.20.0)
  - `zod` (v4.4.3)

### Key Components

1. **Controllers** (`backend/controllers/`) - Handle incoming HTTP requests and respond with appropriate responses.
2. **Routes** (`backend/routes/`) - Define API endpoints and map them to controller methods.
3. **Services** (`backend/services/`) - Contain business logic and orchestrate operations across multiple layers.
4. **Middlewares** (`backend/middlewares/`) - Cross-cutting concerns (authentication, logging, error handling).
5. **Lib** (`backend/lib/`) - Shared reusable code (utilities, helpers).
6. **Generated** (`backend/generated/`) - Prisma-generated schemas and migration files.

## Frontend Architecture (event-frontend)

- **Framework**: React (v19.2.5) with Vite (v8.0.10)
- **Styling**: Tailwind CSS (v4.2.4)
- **State Management**: React Query (v5.37.1) for server state
- **Routing**: React Router (v7.14.2)
- **Authentication**: Clerk React (v6.5.0) for JWT-based auth flows
- **Forms**: Formspree (v3.0.0) for form handling
- **Charts**: Recharts (v3.10.1)
- **Maps**: Leaflet (v1.9.4)
- **Rich Text**: Slate (v0.126.2) with Slate-History and Slate-React
- **Animations**: GSAP (v3.15.0)
- **Icons**: Lucide (v1.41.0) and Lucide-React (v1.3.0)

### Key Components

1. **Public** (`frontend/public/`) - Static assets (favicon, icons, images)
2. **Source** (`frontend/src/`) - React component library, hooks, contexts, and types

## Project Flow

### 1. User Authentication
- Users authenticate via Clerk (JWT token generation/validation)
- Tokens are stored securely and used for subsequent API requests
- Frontend integrates with Clerk's React SDK for login/logout flows

### 2. Data Access
- Frontend sends HTTP requests (REST) to the backend
- Backend validates requests using Zod schemas
- Business logic is executed in service layers
- Database interactions happen via Prisma ORM

### 3. Image Processing Pipeline
- Uploaded images are sent to ImageKit via the backend
- Processed images (resized, thumbnails) are stored in Cloudinary/ImageKit
- Processed images are returned to the frontend for display

### 4. State Management
- Frontend uses React Query for caching and synchronization of API data
- Server state is managed independently from local UI state
- Client-side mutations trigger backend API calls
- **TanStack Query Patterns**:
  - `useQuery` for fetching data (caches results, handles loading/error states)
  - `useMutation` for POST/PUT/DELETE operations (handles optimistic updates)
  - `useQueryClient` for manual cache invalidation
  - Invalidate queries on successful mutations to keep data consistent

### 5. Deployment Flow
- Backend: Build with `npm run build` → deploy to production server
- Frontend: Run `npm run build` → serve static files via CDN/Nginx
- Both services communicate via internal API contracts defined in `backend/routes/`

## Technology Stack Summary

| Layer | Technology |
|-------|------------|
| Framework | Express.js, React |
| Language | TypeScript |
| Database | PostgreSQL (Prisma) |
| Auth | Clerk |
| Image Storage | ImageKit |
| Image Processing | Sharp |
| Styling | Tailwind CSS |
| Routing | React Router |
| State | React Query |
| Charts | Recharts |

## Key Design Principles

- **Separation of Concerns**: Controllers handle requests, services handle business logic, and lib/utils provide shared functionality.
- **Security**: Clerk handles authentication; JWT tokens are validated server-side.
- **Scalability**: Stateless services enable horizontal scaling; ImageKit offloads heavy image processing.
- **Type Safety**: Full TypeScript coverage across both frontend and backend.
- **Modularity**: Clear directory structure allows easy extension and maintenance.

## AI Agent Guidelines

To prevent breaking the project structure, AI agents should:

1. **Never create files outside established directories**
   - Backend-only files → `backend/`
   - Frontend-only files → `frontend/src/`
   - Configuration → `backend/`

2. **Follow naming conventions**
   - Use kebab-case for file names (`api-users.ts`, `user-service.ts`)
   - Use PascalCase for class/component names (`UserProfile`, `CreateUserService`)
   - Use camelCase for variables and functions within files

3. **Maintain API contract consistency**
   - Route names should follow RESTful patterns (`/api/users`, `/api/users/:id`)
   - Endpoint parameters should be documented in `backend/routes/`
   - Request/response shapes should be validated with Zod schemas

4. **Use TanStack Query appropriately**
   - Always wrap external API calls with `useQuery` or `useMutation`
   - Implement proper cache invalidation after mutations
   - Handle loading, error, and empty states explicitly

5. **Preserve existing patterns**
   - New features should mirror existing code organization
   - Don't introduce inconsistent folder structures
   - Update related files (e.g., if adding a new endpoint, update routing and possibly related service files)

By following these guidelines, AI agents can contribute safely without disrupting the established project architecture.
