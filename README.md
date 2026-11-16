# Creators Hub

**Creators Hub** is a collaborative creative community platform where artists, designers, photographers, illustrators and other creators can:

- Create personal profiles and portfolios
- Upload and showcase creative work
- Discover other creators
- Follow creators and interact with their content
- Create and join collaborative projects
- Communicate through real-time messaging
- Participate in community challenges and competitions

## Technology Stack

### Frontend
- React.js + TypeScript (Vite)
- Tailwind CSS v4
- React Router v7
- TanStack React Query
- Axios
- Socket.IO Client
- Lucide React

### Backend
- Node.js 20 LTS + Express.js 5
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Socket.IO
- Cloudinary (media storage)
- Zod (validation)

---

## Project Structure

```
creators-hub/
├── frontend/          # React + Vite frontend
├── backend/           # Express + Node.js backend
├── docs/              # Architecture and team documentation
├── package.json       # Root workspace config
└── README.md
```

---

## Prerequisites

- **Node.js** v20 LTS or higher
- **npm** v10 or higher
- **MongoDB** (local or Atlas)
- **Git**

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/creators-hub.git
cd creators-hub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

**Backend:**
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and fill in:
- `MONGODB_URI` – your MongoDB connection string
- `JWT_SECRET` – a long random secret (32+ chars)
- `CLOUDINARY_*` – your Cloudinary credentials

**Frontend:**
```bash
cp frontend/.env.example frontend/.env
```

### 4. Start Development Servers

```bash
npm run dev
```

Frontend: http://localhost:5173
Backend:  http://localhost:5000

### 5. Test the Health Endpoint

```bash
curl http://localhost:5000/api/health
```

Expected:
```json
{
  "success": true,
  "message": "Creators Hub API is running",
  "data": { "status": "healthy", "timestamp": "...", "environment": "development" }
}
```

---

## Team Module Ownership

| Member | Module | Frontend | Backend |
|--------|--------|----------|---------|
| 1 | Auth & User Profiles | `frontend/src/modules/auth/` | `backend/src/modules/auth/`, `users/` |
| 2 | Creative Posts & Feed | `frontend/src/modules/posts/` | `backend/src/modules/posts/` |
| 3 | Search & Discovery | `frontend/src/modules/discovery/` | `backend/src/modules/discovery/` |
| 4 | Social Connections | `frontend/src/modules/social/` | `backend/src/modules/social/` |
| 5 | Collaborations | `frontend/src/modules/collaborations/` | `backend/src/modules/collaborations/` |
| 6 | Messaging | `frontend/src/modules/messaging/` | `backend/src/modules/messaging/` |
| 7 | Challenges | `frontend/src/modules/challenges/` | `backend/src/modules/challenges/` |
| 8 | AI Recommendations *(future)* | TBD | TBD |

---

## Git Workflow

```bash
git checkout -b feature/member-1-auth
git checkout -b feature/member-2-posts
# etc.
```

See `docs/github-workflow.md` for the full branching guide.

---

## Documentation

- [`docs/project-architecture.md`](docs/project-architecture.md)
- [`docs/api-conventions.md`](docs/api-conventions.md)
- [`docs/database-conventions.md`](docs/database-conventions.md)
- [`docs/github-workflow.md`](docs/github-workflow.md)
- [`docs/module-ownership.md`](docs/module-ownership.md)

---

## License

Academic project – All rights reserved by the team.
