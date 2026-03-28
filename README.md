# SkillBridge Rwanda

SkillBridge Rwanda is a Progressive Web Application (PWA) that connects unemployed and underemployed Rwandan youth with market-relevant digital skills training and employment opportunities.

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

