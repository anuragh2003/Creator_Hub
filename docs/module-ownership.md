# Module Ownership

> **Golden Rule**: You fully own your module — frontend pages, backend routes, services, models and tests.
> Do not edit another member's module files without their knowledge and agreement.

## Ownership Table

| Member | Feature | Frontend Path | Backend Paths |
|--------|---------|---------------|---------------|
| **Member 1** | Auth & User Profiles | `frontend/src/modules/auth/` | `backend/src/modules/auth/` `backend/src/modules/users/` |
| **Member 2** | Creative Posts & Feed | `frontend/src/modules/posts/` | `backend/src/modules/posts/` |
| **Member 3** | Search & Discovery | `frontend/src/modules/discovery/` | `backend/src/modules/discovery/` |
| **Member 4** | Social Connections | `frontend/src/modules/social/` | `backend/src/modules/social/` |
| **Member 5** | Collaborations | `frontend/src/modules/collaborations/` | `backend/src/modules/collaborations/` |
| **Member 6** | Real-time Messaging | `frontend/src/modules/messaging/` | `backend/src/modules/messaging/` |
| **Member 7** | Community Challenges | `frontend/src/modules/challenges/` | `backend/src/modules/challenges/` |
| **Member 8** | AI Recommendations *(future)* | TBD | TBD (separate microservice) |

## Shared Infrastructure (Project Coordinator)

| File | Purpose |
|------|---------|
| `backend/src/app.ts` | Express app setup and route registration |
| `backend/src/server.ts` | HTTP server and Socket.IO initialisation |
| `backend/src/modules/users/user.model.ts` | The single User schema |
| `backend/src/middlewares/auth.middleware.ts` | JWT auth middleware |
| `backend/src/middlewares/error.middleware.ts` | Global error handler |
| `backend/src/utils/ApiError.ts` | Shared error class |
| `backend/src/utils/ApiResponse.ts` | Shared response helpers |
| `backend/src/config/*` | Database, Cloudinary, env config |
| `frontend/src/routes/AppRoutes.tsx` | Main routing |
| `frontend/src/services/api.ts` | Axios client |
| `frontend/src/services/socket.ts` | Socket.IO client |

**To modify shared files**: create a PR, tag the project coordinator and affected members.

## Per-Member Responsibilities

Each module owner must deliver:

- [ ] Database models for their feature
- [ ] Zod validation schemas
- [ ] Express routes, controllers, and services
- [ ] Frontend pages and components
- [ ] API service functions (Axios calls)
- [ ] TypeScript types for their module
- [ ] Input validation and proper error handling
- [ ] At least basic tests
- [ ] Keep their module section in docs updated

## Cross-Module Dependencies

| Dependency | Detail |
|------------|--------|
| Posts ← Auth | Posts have `author` referencing User |
| Social ← Posts + Auth | Likes, comments reference Post and User |
| Discovery ← Posts + Auth | Queries Post and User collections |
| Messaging ← Auth | Conversations reference Users |
| Challenges ← Auth | Submissions reference User |
| Collaborations ← Auth | Projects reference Users |

When your feature uses another module's model, **import the model** — do not redefine it.

## Communication

- Use the team group chat for quick questions.
- For decisions affecting shared files or cross-module contracts, open a GitHub issue first.
- Hold a weekly sync to review PRs and resolve integration issues together.
