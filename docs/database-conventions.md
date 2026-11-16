# Database Conventions

## Stack

- **Engine**: MongoDB
- **ODM**: Mongoose
- **Database name**: `creators_hub`

## Naming Conventions

| Entity | Convention | Example |
|--------|------------|---------|
| Collection names | Mongoose pluralises automatically | `users`, `posts`, `follows` |
| Model names | PascalCase singular | `UserModel`, `PostModel` |
| Field names | camelCase | `displayName`, `avatarUrl`, `createdAt` |

## Schema Rules

1. **Always** include `timestamps: true` — Mongoose adds `createdAt` and `updatedAt`.
2. **Always** set `versionKey: false` — removes the `__v` field.
3. Use `select: false` for sensitive fields such as `passwordHash`.
4. Add indexes on fields used in queries (foreign keys, search fields, sort fields).
5. Use `trim: true` on all string fields.
6. Set sensible `maxlength` on all text fields.
7. Use `default` values where appropriate.
8. **Never** store plain-text passwords — always store `passwordHash` via bcrypt.

## The Single User Model Rule

> **CRITICAL**: There is exactly ONE User model in the entire project.
> It lives at `backend/src/modules/users/user.model.ts`.
> All modules must import this model — never create another User schema.

## References vs. Embedding

| Use Case | Strategy |
|----------|----------|
| Author of a post | Reference (ObjectId) |
| Tags on a post | Embed (string array) |
| Participants in a conversation | Reference array |
| Comment content | Comment document |
| Follow relationship | Separate Follow collection |

## Population Guidelines

- Use `.populate()` selectively with field projection strings.
- Example: `.populate("author", "username displayName avatarUrl")`
- Keep list endpoint payloads lean — do not over-populate.

## Soft Deletes

- Users: `isActive: false`
- Posts: `isPublished: false`
- Hard deletes: only for follow/like/vote toggle operations.
