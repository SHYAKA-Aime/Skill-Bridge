# SkillBridge Rwanda

## System Description

SkillBridge Rwanda is a Progressive Web Application (PWA) that connects unemployed and underemployed Rwandan youth with market-relevant digital skills training and employment opportunities. It features role-based dashboards for learners, employers, and admins — enabling course enrollment, job applications, recruitment pipelines, and platform-wide analytics in one unified system.

## Problem Statement

Rwanda has a growing population of young, ambitious graduates who lack access to structured digital skills training and direct pathways to employers seeking tech talent.

## Why Is This a Problem?

Without a centralized platform, learners struggle to find verified, industry-relevant courses, and employers have no reliable way to discover and validate candidates' skills. This disconnect leads to high youth unemployment despite a rising demand for digital workers — wasting potential on both sides of the market.

## Proposed Solution

SkillBridge bridges this gap by providing a single platform where learners can enroll in curated courses, earn verified completions, and apply to jobs — while employers can post openings, review skill-verified candidates, and manage their hiring pipeline. An admin dashboard provides oversight with real-time engagement metrics and catalog management.

## Live Demo

Professional Platform URL: [https://shyaka-aime.github.io/Skill-Bridge/](https://shyaka-aime.github.io/Skill-Bridge/)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Lucide Icons, Recharts |
| Features | PWA (Offline Ready), Multi-Role Dashboards, Custom Modals |
| Logic | Persistent Mock API, Vanilla CSS (Stitch UI) |

## Project Structure

```
SkillBridge/
+-- backend/          # Flask REST API
|   +-- app.py        # App factory & config
|   +-- models.py     # SQLAlchemy models
|   +-- seed.py       # Test data seeder
|   \-- routes/
|       +-- auth.py   # Login & registration
|       +-- course.py # Course endpoints
|       \-- job.py    # Job endpoints
\-- frontend/         # React SPA (Vite)
    +-- src/
    |   +-- pages/    # Home, Login, Register, Dashboard, Courses, Jobs
    |   +-- components/ # Navbar, DashboardLayout
    |   \-- services/ # Axios API client
    \-- vite.config.js # PWA & build config
```

## Test Credentials

| Role     | Email                  | Password    |
|----------|------------------------|-------------|
| Learner  | shyaka@skillbridge.rw  | password123 |
| Employer | hr@tech.rw           | password123 |
| Admin    | admin@skillbridge.rw   | password123 |

## API Endpoints

| Method | Endpoint                   | Description         |
|--------|----------------------------|---------------------|
| POST   | `/api/auth/login`          | User login (JWT)    |
| POST   | `/api/auth/register/learner`  | Register learner |
| POST   | `/api/auth/register/employer` | Register employer|
| GET    | `/api/courses/`            | List all courses    |
| GET    | `/api/jobs/`               | List all jobs       |
| GET    | `/api/health`              | Health check        |

