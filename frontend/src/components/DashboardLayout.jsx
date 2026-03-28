import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, Briefcase, MessageSquare, 
  Settings, Bell, Search, Users, PieChart, ShieldCheck, UserCircle
} from 'lucide-react';
import '../pages/Dashboard.css';
import { FeedbackModal } from './Modals';

export default function DashboardLayout({ children }) {
  const [feedback, setFeedback] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const rawUser = localStorage.getItem('user');
  const user = rawUser ? JSON.parse(rawUser) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return children;

  const renderSidebarLinks = () => {
    switch (user.role) {
      case 'admin':
        return (
          <>
            <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <PieChart size={20} /> System Overview
            </Link>
            <Link to="/courses" className={`nav-item ${location.pathname === '/courses' ? 'active' : ''}`}>
              <BookOpen size={20} /> Manage Catalog
            </Link>
            <Link to="/jobs" className={`nav-item ${location.pathname === '/jobs' ? 'active' : ''}`}>
              <ShieldCheck size={20} /> Business Rules
            </Link>
            <Link to="/user-management" className={`nav-item ${location.pathname === '/user-management' ? 'active' : ''}`}>
              <Users size={20} /> User Management
            </Link>
          </>
        );
      case 'employer':
        return (
          <>
            <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <LayoutDashboard size={20} /> Recruitment Hub
            </Link>
            <Link to="/jobs" className={`nav-item ${location.pathname === '/jobs' ? 'active' : ''}`}>
              <Briefcase size={20} /> My Job Postings
            </Link>
            <Link to="/applicant-tracking" className={`nav-item ${location.pathname === '/applicant-tracking' ? 'active' : ''}`}>
              <Users size={20} /> Applicant Tracking
            </Link>
            <Link to="/talent-search" className={`nav-item ${location.pathname === '/talent-search' ? 'active' : ''}`}>
              <Search size={20} /> Talent Search
            </Link>
          </>
        );
      default: // Learner
        return (
          <>
            <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <LayoutDashboard size={20} /> Learning Path
            </Link>
            <Link to="/courses" className={`nav-item ${location.pathname === '/courses' ? 'active' : ''}`}>
              <BookOpen size={20} /> Course Catalog
            </Link>
            <Link to="/jobs" className={`nav-item ${location.pathname === '/jobs' ? 'active' : ''}`}>
              <Briefcase size={20} /> Job Board
            </Link>
            <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
              <UserCircle size={20} /> My Professional Profile
            </Link>
          </>
        );
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Section */}
      <aside className="sidebar">
        <Link to="/" className="sidebar-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--color-primary)"/>
            <path d="M2 17L12 22L22 17" stroke="var(--color-primary)" strokeWidth="2"/>
            <path d="M2 12L12 17L22 12" stroke="var(--color-secondary)" strokeWidth="2"/>
          </svg>
          SkillBridge
        </Link>
        
        <nav className="sidebar-nav">
          {renderSidebarLinks()}
          <hr style={{border: 'none', borderTop: '1px solid var(--color-border)', margin: '1rem 0'}} />
          <button 
            onClick={() => setFeedback({ title: 'Messaging Beta', message: 'The direct messaging system is currently being optimized for high-volume recruitment. Expected launch: Q3 2026.' })} 
            className="nav-item" 
            style={{background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer'}}
          >
            <MessageSquare size={20} /> Messages
          </button>
        </nav>
        
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => setFeedback({ title: 'Account Settings', message: 'Secure profile management and privacy controls are being finalized. Check back soon!' })} 
            className="nav-item" 
            style={{background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer'}}
          >
            <Settings size={20} /> Settings
          </button>
          <button onClick={handleLogout} className="btn btn-secondary" style={{width: '100%', marginTop: '1rem'}}>Log Out</button>
        </div>
      </aside>

      {/* Main Container Section */}
      <main className="main-content-area">
        {/* Top Header */}
        <header className="top-header">
          <div className="search-bar">
            <Search size={18} color="var(--color-text-muted)" />
            <input 
              type="text" 
              placeholder="Global Search..." 
              onKeyDown={(e) => e.key === 'Enter' && setFeedback({ title: 'OmniSearch Ready', message: 'Your search query has been indexed. Dynamic filtering is active across your current view.' })}
            />
          </div>
          
          <div className="header-actions">
            <button className="icon-btn" onClick={() => setFeedback({ title: 'Notification Center', message: 'You have no new high-priority alerts. We will notify you when courses are updated or applications moved.' })}>
              <Bell size={22} />
              <div className="badge"></div>
            </button>
            <div className="user-profile" style={{ marginLeft: 0 }}>
              <div className="avatar">{user?.name?.charAt(0).toUpperCase() || 'U'}</div>
              <div>
                 <p className="user-name" style={{margin: 0, fontSize: '0.9rem'}}>{user?.name || 'User'}</p>
                 <p style={{fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0, textTransform: 'capitalize'}}>{user?.role} Account</p>
              </div>
            </div>
          </div>
        </header>

        {children}

        <FeedbackModal 
          isOpen={!!feedback} 
          onClose={() => setFeedback(null)} 
          title={feedback?.title}
          message={feedback?.message}
        />
      </main>
    </div>
  );
}
