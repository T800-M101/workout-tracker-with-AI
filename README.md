# 🏋️ Workout & Progress Tracker API

[![NestJS](https://img.shields.io/badge/framework-NestJS%2011-red.svg)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/orm-Prisma-2D3748.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL%2016-336791.svg)](https://www.postgresql.org/)
[![Swagger](https://img.shields.io/badge/docs-Swagger-85EA2D.svg)](https://swagger.io/)

A professional REST API designed for comprehensive tracking of workouts and body metrics. This project demonstrates a clean architecture, advanced security handling with JWT, and seamless integration with PostgreSQL via Docker.

---

## 📋 Características Principales

- **Robust Authentication**: Complete registration and login flow with JWT and password encryption with Bcrypt.

- **Progress Tracking**: Recording of training sessions (Sets, Reps, Weight) and body metrics (Weight and Height Tracking).

- **Scalable Architecture**: Based on NestJS modules, facilitating maintenance and expansion (e.g., future integration with Claude AI).

- **Interactive Documentation**: Full integration with Swagger for rapid testing of all endpoints.

- **Developer Experience (DX)**: Automated scripts for database setup, migrations, and development environment.

---

## 🚀 Tech Stack

| Layer | Tech |
|---|---|
| **Core** | NestJS 11 + TypeScript 5 |
| **ORM** | Prisma |
| **Data Base** | PostgreSQL 16 (Dockerized) |
| **Security** | Passport.js + JWT |
| **Documentation** | Swagger / OpenAPI 3 |

---

## ⚡ Fast start (Zero Friction)

To facilitate project review, the configuration process is automated:

### 1. Clonar y Configurar
```bash
git clone [https://github.com/T800-M101/workout-tracker-with-AI.git](https://github.com/T800-M101/workout-tracker-with-AI.git)
cd workout-tracker
cp .env.example .env
```

### You can install Prisma Studio 
```
npx prisma studio
Prisma Studio is up on http://localhost:5555
```
