# GitHub Workflow

## Branch Strategy

```
main        ← stable / production-ready
develop     ← integration branch (all PRs target here)
feature/*   ← individual feature development
```

## Branch Naming

```bash
git checkout develop
git pull origin develop
git checkout -b feature/member-1-auth
```

| Member | Branch |
|--------|--------|
| Member 1 | `feature/member-1-auth` |
| Member 2 | `feature/member-2-posts` |
| Member 3 | `feature/member-3-discovery` |
| Member 4 | `feature/member-4-social` |
| Member 5 | `feature/member-5-collaborations` |
| Member 6 | `feature/member-6-messaging` |
| Member 7 | `feature/member-7-challenges` |
| Member 8 | `feature/member-8-ai` |

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(auth): add JWT refresh token endpoint
fix(posts): handle null mediaUrls in feed
docs(api): update auth endpoints
test(social): add follow service unit tests
refactor(users): extract avatar upload logic
```

**Types**: `feat` | `fix` | `docs` | `test` | `refactor` | `style` | `chore`

## Pull Request Process

1. Push your branch: `git push origin feature/member-1-auth`
2. Open a PR targeting `develop`.
3. Fill in: What changed? How to test? Breaking changes? Screenshots?
4. Request review from at least one teammate.
5. Address review comments.
6. Project coordinator merges after approval.

## Keeping Your Branch Up to Date

```bash
git fetch origin
git rebase origin/develop
```

## Rules

- **Never commit directly to `main` or `develop`.**
- **Never commit `.env` files** — only `.env.example` is committed.
- **Do not modify another member's module** without coordination.
- Keep commits atomic and focused.
- Run `tsc --noEmit` before pushing.

## Resolving Conflicts in Shared Files

If you have a conflict in a shared file (e.g., `app.ts`):
1. Notify the team.
2. Resolve collaboratively — do not overwrite each other's routes.
3. Test after resolving.
