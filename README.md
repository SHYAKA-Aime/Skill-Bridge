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

---

## Tech Stack

| Layer    | Technology                                       |
|----------|--------------------------------------------------|
| Frontend | React 19, Vite, Lucide Icons, Recharts           |
| Backend  | Python 3, Flask, SQLAlchemy, Flask-JWT-Extended   |
| Database | SQLite (dev default) / MySQL (production)         |
| Features | PWA (Offline Ready), Multi-Role Dashboards, JWT Auth |
| Styling  | Vanilla CSS (Stitch UI Design System)             |

---

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

| Tool       | Minimum Version | Check Command       | Install Link                                 |
|------------|-----------------|---------------------|----------------------------------------------|
| **Git**    | 2.x             | `git --version`     | [git-scm.com](https://git-scm.com/)         |
| **Node.js**| 18.x or higher  | `node --version`    | [nodejs.org](https://nodejs.org/)            |
| **npm**    | 9.x or higher   | `npm --version`     | Comes with Node.js                           |
| **Python** | 3.9 or higher   | `python3 --version` | [python.org](https://www.python.org/)        |
| **pip**    | 21.x or higher  | `pip3 --version`    | Comes with Python                            |

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SHYAKA-Aime/Skill-Bridge.git
cd Skill-Bridge
```

---

### 2. Backend Setup (Flask API)

#### 2a. Navigate to the backend directory

```bash
cd backend
```

#### 2b. Create a Python virtual environment

```bash
python3 -m venv venv
```

#### 2c. Activate the virtual environment

**macOS / Linux:**
```bash
source venv/bin/activate
```

**Windows (Command Prompt):**
```cmd
venv\Scripts\activate
```

**Windows (PowerShell):**
```powershell
.\venv\Scripts\Activate.ps1
```

#### 2d. Install Python dependencies

```bash
pip install -r requirements.txt
```

#### 2e. Configure environment variables

Create a `.env` file in the `backend/` directory:

```bash
touch .env
```

Add the following content to the `.env` file:

```env
# Required
JWT_SECRET_KEY=your-secret-key-here

# Optional — defaults to SQLite if not set
# DATABASE_URL=mysql+pymysql://username:password@localhost/skillbridge_db

# Optional — defaults to 5000
# PORT=5000
```

> **Note:** By default, the app uses a local **SQLite** database (`skillbridge.db`) so you don't need to install MySQL for development. To use MySQL in production, uncomment and set the `DATABASE_URL` variable.

#### 2f. Seed the database with sample data

```bash
python3 seed.py
```

This will create the database tables and populate them with sample users, courses, and job postings.

#### 2g. Start the backend server

```bash
python3 app.py
```

The API will be running at **http://localhost:5000**.

You can verify it's working by visiting: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

### 3. Frontend Setup (React + Vite)

Open a **new terminal window** (keep the backend server running).

#### 3a. Navigate to the frontend directory

```bash
cd frontend
```

> If you're still in the `backend/` directory, run `cd ../frontend` instead.

#### 3b. Install Node.js dependencies

```bash
npm install
```

#### 3c. Start the development server

```bash
npm run dev
```

The frontend will be running at **http://localhost:5173** (default Vite port).

---

### 4. Open the Application

Open your browser and go to:

```
http://localhost:5173/Skill-Bridge/
```

You should see the SkillBridge landing page. You can now log in with the test credentials below.

---

## Project Structure

```
Skill-Bridge/
├── backend/                # Flask REST API
│   ├── app.py              # App factory & configuration
│   ├── models.py           # SQLAlchemy database models
│   ├── seed.py             # Database seeder with sample data
│   ├── requirements.txt    # Python dependencies
│   └── routes/
│       ├── auth.py         # Login & registration endpoints
│       ├── course.py       # Course CRUD endpoints
│       └── job.py          # Job posting endpoints
└── frontend/               # React SPA (Vite)
    ├── src/
    │   ├── main.jsx        # App entry point
    │   ├── App.jsx         # Root component & routing
    │   ├── pages/          # Page components (Home, Login, Dashboard, etc.)
    │   ├── components/     # Reusable UI components (Navbar, Sidebar, etc.)
    │   └── services/       # API client (Axios) & mock data
    ├── vite.config.js      # Vite + PWA configuration
    └── package.json        # Node.js dependencies & scripts
```

---

## Test Credentials

Use these accounts to explore the platform after seeding:

| Role     | Email                  | Password      |
|----------|------------------------|---------------|
| Learner  | shyaka@skillbridge.rw  | password123   |
| Employer | hr@tech.rw             | password123   |
| Admin    | admin@skillbridge.rw   | password123   |

---

## API Endpoints

| Method | Endpoint                         | Description           |
|--------|----------------------------------|-----------------------|
| POST   | `/api/auth/login`                | User login (JWT)      |
| POST   | `/api/auth/register/learner`     | Register a learner    |
| POST   | `/api/auth/register/employer`    | Register an employer  |
| GET    | `/api/courses/`                  | List all courses      |
| GET    | `/api/jobs/`                     | List all jobs         |
| GET    | `/api/health`                    | API health check      |

---

## Available Scripts

### Frontend

| Command           | Description                        |
|-------------------|------------------------------------|
| `npm run dev`     | Start the Vite development server  |
| `npm run build`   | Build for production               |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Run ESLint                         |
| `npm run deploy`  | Deploy to GitHub Pages             |

### Backend

| Command               | Description                        |
|-----------------------|------------------------------------|
| `python3 app.py`      | Start the Flask development server |
| `python3 seed.py`     | Seed the database with sample data |

---

## Troubleshooting

| Problem                                    | Solution                                                                 |
|--------------------------------------------|--------------------------------------------------------------------------|
| `ModuleNotFoundError` in backend           | Make sure your virtual environment is activated (`source venv/bin/activate`) |
| `npm: command not found`                   | Install Node.js from [nodejs.org](https://nodejs.org/)                   |
| Frontend shows a blank page                | Make sure the backend is running on port 5000                            |
| `CORS` errors in browser console           | The backend has CORS enabled by default — ensure both servers are running |
| Port 5000 already in use (macOS)           | macOS Airplay may use port 5000. Disable it in System Settings → General → AirDrop & Handoff, or set `PORT=5001` in `.env` |
| Database file not found                    | Run `python3 seed.py` to create and seed the database                    |
