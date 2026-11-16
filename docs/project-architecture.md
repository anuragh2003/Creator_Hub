# Project Architecture

## Overview

Creators Hub is a full-stack web application following a modular, feature-driven architecture.
Each of the 8 team members owns one complete feature module — including its frontend, backend,
database models, validation and tests.

## System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                           │
│                     React 19 + Vite + TS                        │
│          (Tailwind CSS v4 | React Router v7 | TanStack Query)   │
└──────────────────────────┬──────────────────────────────────────┘
                           │  HTTP REST / WebSocket (Socket.IO)
┌──────────────────────────▼──────────────────────────────────────┐
│                    EXPRESS.JS API SERVER                         │
│                   Node.js 20 LTS + TypeScript                   │
│        (Helmet | CORS | Morgan | JWT | Zod | Socket.IO)         │
├─────────┬────────┬────────────┬────────┬───────────┬────────────┤
│  Auth   │ Users  │   Posts    │ Disc.  │  Social   │ Collab.   │
│         │        │            │        │           │            │
│  Msg.   │        │ Challenges │        │           │            │
└─────────┴────────┴────────────┴────────┴───────────┴────────────┘
                           │  Mongoose ODM
┌──────────────────────────▼──────────────────────────────────────┐
│                           MONGODB                               │
│      users | posts | follows | likes | comments | ...           │
└──────────────────────────┬──────────────────────────────────────┘
                           │  Cloudinary SDK
┌──────────────────────────▼──────────────────────────────────────┐
│                CLOUDINARY  (Media Storage)                      │
│              Images, Videos, Portfolio assets                   │
└─────────────────────────────────────────────────────────────────┘
```

## Module Map

| Module | Frontend | Backend |
|--------|----------|---------|
| Auth & Profiles | `frontend/src/modules/auth/` | `backend/src/modules/auth/`, `users/` |
| Posts & Feed | `frontend/src/modules/posts/` | `backend/src/modules/posts/` |
| Discovery | `frontend/src/modules/discovery/` | `backend/src/modules/discovery/` |
| Social | `frontend/src/modules/social/` | `backend/src/modules/social/` |
| Collaborations | `frontend/src/modules/collaborations/` | `backend/src/modules/collaborations/` |
| Messaging | `frontend/src/modules/messaging/` | `backend/src/modules/messaging/` |
| Challenges | `frontend/src/modules/challenges/` | `backend/src/modules/challenges/` |
| AI *(future)* | TBD | TBD (separate microservice) |

## Key Design Decisions

- **Single User Model**: Only one User schema exists at `backend/src/modules/users/user.model.ts`.
- **Shared Auth Middleware**: `auth.middleware.ts` protects routes across all modules.
- **Shared Utilities**: `ApiError`, `ApiResponse`, `asyncHandler` are shared by all modules.
- **npm Workspaces**: The root `package.json` manages both frontend and backend.
- **Environment Isolation**: Frontend uses `VITE_*` env vars; backend uses plain Node env vars.

## Real-time Communication

Socket.IO is initialised in `backend/src/server.ts`.
Event handlers live in `backend/src/modules/messaging/message.socket.ts`.
Member 6 owns the socket implementation. All connections are JWT-authenticated.

## Future AI Integration (Member 8)

A Python-based AI recommendation microservice will be added later.
It will communicate with the Express API via HTTP.
No Python files are created yet.
