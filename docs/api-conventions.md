# API Conventions

## Base URL

```
http://localhost:5000/api
```

## Unified Response Format

### Success

```json
{
  "success": true,
  "message": "Human-readable success message",
  "data": { }
}
```

### Paginated

```json
{
  "success": true,
  "message": "Success",
  "data": [ ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

### Error

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": { }
}
```

## HTTP Status Codes

| Code | Usage |
|------|-------|
| 200  | Success (GET, PUT, PATCH) |
| 201  | Created (POST) |
| 400  | Bad Request / Validation error |
| 401  | Unauthenticated |
| 403  | Forbidden |
| 404  | Not Found |
| 409  | Conflict (duplicate) |
| 500  | Internal Server Error |

## Authentication

```
Authorization: Bearer <jwt_token>
```

## Naming Conventions

- **Endpoints**: kebab-case — `/api/discovery/explore`
- **Route params**: camelCase — `:postId`, `:userId`
- **Query params**: camelCase — `?page=1&limit=20`
- **Request/response body**: camelCase — `displayName`, `avatarUrl`

## Pagination

All list endpoints accept `page` (default 1) and `limit` (default 20, max 100).

## Module Route Prefixes

| Module | Prefix |
|--------|--------|
| Auth | `/api/auth` |
| Users | `/api/users` |
| Posts | `/api/posts` |
| Discovery | `/api/discovery` |
| Social | `/api/social` |
| Collaborations | `/api/collaborations` |
| Messaging | `/api/messages` |
| Challenges | `/api/challenges` |

## Validation

All input is validated with **Zod** in `*.validation.ts` files.
Errors return 400 with the `errors` field showing field-level messages.

## Error Helpers

```typescript
throw ApiError.notFound("Post not found");
throw ApiError.badRequest("Invalid input", errors);
throw ApiError.unauthorized();
throw ApiError.conflict("Username already taken");
```
