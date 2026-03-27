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
├── backend/          # Flask REST API
│   ├── app.py        # App factory & config
│   ├── models.py     # SQLAlchemy models
│   ├── seed.py       # Test data seeder
│   └── routes/
│       ├── auth.py   # Login & registration
│       ├── course.py # Course endpoints
│       └── job.py    # Job endpoints
└── frontend/         # React SPA (Vite)
    ├── src/
    │   ├── pages/    # Home, Login, Register, Dashboard, Courses, Jobs
    │   ├── components/ # Navbar, DashboardLayout
    │   └── services/ # Axios API client
    └── vite.config.js # PWA & build config
```

## Local Development

Start both servers in separate terminals:

### 1. Backend (Flask)
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python3 seed.py   # Seed test data (first time only)
python3 app.py
```
Backend runs at `http://localhost:5000`

### 2. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

## Test Credentials

| Role     | Email              | Password    |
|----------|--------------------|-------------|
| Learner  | alice@example.com  | password123 |
| Employer | hr@techrw.com      | password123 |

## Deployment

### Backend → Render

1. Push the repo to GitHub
2. Create a **New Web Service** on [Render](https://render.com)
3. Connect your GitHub repo
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:create_app()`
   - **Environment Variables:**
     - `JWT_SECRET_KEY` — a secure random string
     - `DATABASE_URL` — your PostgreSQL connection string (Render provides one)
5. Deploy

### Frontend → GitHub Pages

1. Update `vite.config.js` — set `base: '/SkillBridge/'`
2. Update `api.js` — point `baseURL` to your Render backend URL
3. Build and deploy:
```bash
cd frontend
npm run build
npx gh-pages -d dist
```
4. In GitHub repo settings → Pages → set source to `gh-pages` branch

> **Note:** For client-side routing to work on GitHub Pages, add a `404.html` that redirects to `index.html`. The `gh-pages` package handles this automatically when configured.

## API Endpoints

| Method | Endpoint                   | Description         |
|--------|----------------------------|---------------------|
| POST   | `/api/auth/login`          | User login (JWT)    |
| POST   | `/api/auth/register/learner`  | Register learner |
| POST   | `/api/auth/register/employer` | Register employer|
| GET    | `/api/courses/`            | List all courses    |
| GET    | `/api/jobs/`               | List all jobs       |
| GET    | `/api/health`              | Health check        |

## License

This project was built for the African Leadership University (ALU) coursework.
