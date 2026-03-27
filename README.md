# SkillBridge Rwanda

SkillBridge Rwanda is a high-performance **Progressive Web Application (PWA)** engineered to connect Rwanda's emerging tech talent with world-class employers. Built with a focus on verified achievement and seamless recruitment pipelines.

## 🚀 Key Features

- **Multi-Role Ecosystem**: Tailored experiences for **Learners**, **Employers**, and **System Admins**.
- **Verified SkillBadges**: Authentic academic validation where employers see exactly which courses a candidate has completed on-platform.
- **Premium UX/UI**: Modern glassmorphism design, smooth micro-animations, and custom modal systems (no native browser dialogs).
- **Recruitment Engine**: Full Applicant Tracking System (ATS) for employers to manage candidates from discovery to interview.
- **Offline Ready**: Full PWA support with service workers for unreliable connectivity environments.
100% professional localization.

## 🛠 Tech Stack

| Layer    | Technology |
|----------|------------|
| **Frontend** | React 19, Vite, Lucide Icons, Recharts (Analytics) |
| **Logic**    | Custom Hooks, Mock Service Layer (LocalStorage Persistent) |
| **Styling**  | Vanilla CSS (Stitch UI Design System) |
| **PWA**      | vite-plugin-pwa, Workbox |

## 📦 Project Architecture

```
SkillBridge/
├── root/             # Global configuration & deployment
├── backend/          # Flask REST API (Python)
└── frontend/         # React SPA (Vite/PWA)
    ├── src/
    │   ├── pages/    # Role-specific dashboard logic
    │   ├── components/ # Shared Layouts & Custom Modals
    │   └── services/ # Mock API & Data Persistence
```

## 🚥 Getting Started

### 1. Installation
```bash
git clone https://github.com/SHYAKA-Aime/Skill-Bridge.git
cd Skill-Bridge/frontend
npm install
```

### 2. Development
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## 🧪 Developer Test Credentials

| Role      | Email                  | Password    |
|-----------|------------------------|-------------|
| **Learner**   | `shyaka@skillbridge.rw` | `password123` |
| **Employer**  | `hr@tech.rw`           | `password123` |
| **Admin**     | `admin@skillbridge.rw` | `password123` |

---

Built with ❤️ for **SkillBridge Rwanda**.
