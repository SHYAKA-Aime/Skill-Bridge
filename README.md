# SkillBridge Rwanda

SkillBridge Rwanda is a Progressive Web Application (PWA) that connects unemployed and underemployed Rwandan youth with market-relevant digital skills training and employment opportunities.

## Live Demo

| Service  | URL |
|----------|-----|
| Frontend | [https://your-username.github.io/SkillBridge](https://your-username.github.io/SkillBridge) |
| Backend  | [https://skillbridge-api.onrender.com](https://skillbridge-api.onrender.com) |

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 19, Vite 8, Recharts, Lucide Icons, Vanilla CSS |
| Backend  | Flask, Flask-JWT-Extended, SQLAlchemy, Flask-CORS |
| Database | SQLite (dev) / PostgreSQL (production) |
| PWA      | vite-plugin-pwa, Workbox |
| Hosting  | GitHub Pages (frontend), Render (backend) |

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

| Role     | Email              | Password    |
|----------|--------------------|-------------|
| Learner  | alice@example.com  | password123 |
| Employer | hr@techrw.com      | password123 |

## API Endpoints

| Method | Endpoint                   | Description         |
|--------|----------------------------|---------------------|
| POST   | `/api/auth/login`          | User login (JWT)    |
| POST   | `/api/auth/register/learner`  | Register learner |
| POST   | `/api/auth/register/employer` | Register employer|
| GET    | `/api/courses/`            | List all courses    |
| GET    | `/api/jobs/`               | List all jobs       |
| GET    | `/api/health`              | Health check        |

