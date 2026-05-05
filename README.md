
# 🏋️ Workout & Progress Tracker API

A production-ready REST API built with **NestJS**, **TypeScript**, **Prisma**, and **PostgreSQL**. Features JWT authentication, workout session tracking, body metrics logging, and AI-powered training recommendations via the Claude API.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS + TypeScript |
| ORM | Prisma |
| Database | PostgreSQL 16 |
| Auth | JWT (access + refresh tokens) |
| AI | Anthropic Claude API |
| Containerization | Docker + Docker Compose |
| Validation | class-validator + class-transformer |

---

## 📋 Features

- **Authentication** — Register, login, JWT access & refresh token rotation, logout
- **User Profiles** — Fitness goals, activity level, height, date of birth
- **Exercise Catalog** — Searchable library of exercises by category and muscle group
- **Workout Sessions** — Log full sessions with exercises, sets, reps, weight, RPE
- **Body Metrics** — Track weight, body fat %, muscle mass, waist measurements over time
- **AI Recommendations** — Get personalized training advice powered by Claude AI

---

## 🗂️ Project Structure

```
src/
├── common/              # Guards, decorators, filters, interceptors
├── prisma/              # PrismaService (database connection)
├── auth/                # JWT authentication & token management
├── users/               # User profile management
├── exercises/           # Exercise catalog CRUD
├── workout-sessions/    # Session logging with exercises & sets
├── body-metrics/        # Body measurement tracking
└── ai/                  # Claude API integration for recommendations
```

---

## ⚡ Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/workout-tracker.git
cd workout-tracker
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
DATABASE_URL=postgresql://usuario:password@localhost:5432/workout_tracker
POSTGRES_USER=usuario
POSTGRES_PASSWORD=password
POSTGRES_DB=workout_tracker
JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
ANTHROPIC_API_KEY=your-claude-api-key
PORT=3000
```

### 3. Start with Docker (recommended)

```bash
docker compose up
```

The API will be available at `http://localhost:3000`

> Prisma migrations run automatically on startup.

### 4. Start for local development

```bash
# Start only the database
docker compose up -d db

# Install dependencies
npm install

# Run migrations
npx prisma migrate dev

# Start in watch mode
npm run start:dev
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Create a new account |
| POST | `/auth/login` | Login and receive tokens |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Invalidate refresh token |

### Users
| Method | Endpoint | Description |
|---|---|---|
| GET | `/users/me` | Get current user |
| PATCH | `/users/me/profile` | Update fitness profile |

### Exercises
| Method | Endpoint | Description |
|---|---|---|
| GET | `/exercises` | List all exercises (filterable) |
| GET | `/exercises/:id` | Get exercise detail |
| POST | `/exercises` | Create custom exercise |

### Workout Sessions
| Method | Endpoint | Description |
|---|---|---|
| GET | `/workout-sessions` | List user's sessions |
| POST | `/workout-sessions` | Start a new session |
| GET | `/workout-sessions/:id` | Get session detail |
| PATCH | `/workout-sessions/:id` | Update session (end time, notes, RPE) |
| POST | `/workout-sessions/:id/exercises` | Add exercise to session |
| POST | `/workout-sessions/:id/exercises/:exId/sets` | Log a set |

### Body Metrics
| Method | Endpoint | Description |
|---|---|---|
| GET | `/body-metrics` | Get latest metrics |
| GET | `/body-metrics/history` | Get metrics history |
| POST | `/body-metrics` | Log new measurement |

### AI
| Method | Endpoint | Description |
|---|---|---|
| POST | `/ai/recommendations` | Get AI training recommendations |

---

## 🗄️ Database Schema

```
User ──── UserProfile
     ──── RefreshToken[]
     ──── WorkoutSession[] ──── WorkoutExercise[] ──── ExerciseSet[]
     |                               └── Exercise
     ──── BodyMetric[]
```

---

## 🧪 Running Tests

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Coverage
npm run test:cov
```

---

## 🛠️ Development Commands

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name description

# Open Prisma Studio (database GUI)
npx prisma studio

# Lint
npm run lint

# Format
npm run format
```

---

## 🌐 Environment Variables Reference

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | Full PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `POSTGRES_USER` | Database username | `usuario` |
| `POSTGRES_PASSWORD` | Database password | `password` |
| `POSTGRES_DB` | Database name | `workout_tracker` |
| `JWT_SECRET` | Secret for signing access tokens | `random-long-string` |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens | `another-random-string` |
| `JWT_EXPIRES_IN` | Access token expiry | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | `7d` |
| `ANTHROPIC_API_KEY` | Claude API key | `sk-ant-...` |
| `PORT` | Server port | `3000` |

---

## 📄 License

MIT