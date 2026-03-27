import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { FeedbackModal } from '../components/Modals';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg-page)' }}>
      {/* Left Branding Side */}
      <div style={{ flex: 1, backgroundColor: 'var(--color-primary)', color: 'white', padding: '4rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)', borderRadius: '50%' }}></div>
        
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: '800', fontSize: '1.5rem', zIndex: 10, letterSpacing: '-0em' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          SkillBridge
        </Link>

        <div style={{ marginTop: 'auto', marginBottom: 'auto', zIndex: 10, maxWidth: '500px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.875rem', fontWeight: '600', marginBottom: '2.5rem', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Sparkles size={16} color="#60A5FA" /> Unleash your career potential
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem', color: 'white' }}>
            Enter the future of work.
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            Join thousands of emerging tech talents and hundreds of high-growth companies building Rwanda's digital ecosystem.
          </p>
        </div>
      </div>

      {/* Right Login Side */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '2rem' }}>
            <ArrowLeft size={16} /> Back to home
          </Link>
          
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome back</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem' }}>Please enter your credentials to access your account.</p>

          {error && (
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', padding: '1rem', borderRadius: 'var(--border-radius-btn)', marginBottom: '1.5rem', fontSize: '0.875rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label className="input-label">Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" placeholder="name@company.com" required disabled={isLoading} />
            </div>
            
            <div className="input-group" style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="input-label" style={{ margin: 0 }}>Password</label>
                <button type="button" onClick={() => setFeedback({ title: 'Password Reset', message: 'If this email is registered, we have sent instructions to reset your password.' })} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '500', cursor: 'pointer' }}>Forgot password?</button>
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field" placeholder="••••••••" required style={{ marginTop: '0.45rem' }} disabled={isLoading} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.95rem', fontSize: '1rem' }} disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Don't have an account? <Link to="/register" style={{ fontWeight: '600', color: 'var(--color-primary)' }}>Sign up</Link>
          </p>

          <FeedbackModal 
            isOpen={!!feedback} 
            onClose={() => setFeedback(null)} 
            title={feedback?.title}
            message={feedback?.message}
          />
          
          {/* Developer Test Credentials helper */}
          <div style={{ marginTop: '4rem', padding: '1.5rem', backgroundColor: 'transparent', borderRadius: '12px', border: '1px dashed var(--color-border)', fontSize: '0.75rem' }}>
            <p style={{ fontWeight: '600', color: 'var(--color-text-heading)', marginBottom: '0.5rem' }}>Developer Test Credentials</p>
            <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>Learner Account: shyaka@skillbridge.rw / password123</p>
            <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>Employer Account: hr@tech.rw / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
