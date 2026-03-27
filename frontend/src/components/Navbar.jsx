import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <nav className="navbar glass">
      <div className="navbar-brand">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--color-primary)"/>
            <path d="M2 17L12 22L22 17" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          SkillBridge
        </Link>
      </div>
      <div className="navbar-links">
        {user && user.name && (
           <>
             <Link to="/">Dashboard</Link>
             <Link to="/courses">Courses</Link>
             <Link to="/jobs">Jobs</Link>
           </>
        )}
        {user && user.name ? (
           <div className="user-profile">
             <div className="avatar">
               {user.name.charAt(0).toUpperCase()}
             </div>
             <span className="user-name">{user.name.split(' ')[0]}</span>
             <button onClick={handleLogout} className="btn btn-secondary btn-small" style={{marginLeft: '0.5rem'}}>Log Out</button>
           </div>
        ) : (
           <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '1rem' }}>
             <Link to="/login" className="btn btn-secondary" style={{padding: '0.5rem 1rem'}}>Log In</Link>
             <Link to="/register" className="btn btn-primary" style={{padding: '0.5rem 1rem'}}>Sign Up</Link>
           </div>
        )}
      </div>
    </nav>
  );
}
