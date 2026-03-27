import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import Jobs from './pages/Jobs';
import Profile from './pages/Profile';
import ApplicantTracking from './pages/ApplicantTracking';
import TalentSearch from './pages/TalentSearch';
import UserManagement from './pages/UserManagement';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("Uncaught error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', marginTop: '20vh' }}>
          <h2 style={{color: 'var(--color-danger)'}}>Something went wrong.</h2>
          <p>The application encountered an unexpected error. Please refresh the page.</p>
          <button className="btn btn-primary" style={{marginTop: '1rem'}} onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}


function AppLayout() {
  const location = useLocation();
  const rawUser = localStorage.getItem('user');
  const user = rawUser ? JSON.parse(rawUser) : null;
  const isLogin = location.pathname === '/login';

  // Explicit login screen gets raw edge-to-edge canvas
  if (isLogin || location.pathname === '/register') {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );    
  }

  // General unauthenticated traffic goes to Marketing Home
  if (!user) {
    return (
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Authenticated State retains Advanced Layout dynamically spanning all internal pages
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/applicant-tracking" element={<ApplicantTracking />} />
        <Route path="/talent-search" element={<TalentSearch />} />
        <Route path="/user-management" element={<UserManagement />} />
      </Routes>
    </DashboardLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router basename="/Skill-Bridge">
        <AppLayout />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
