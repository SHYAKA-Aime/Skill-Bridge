import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { ArrowLeft, Sparkles, User, Building } from 'lucide-react';

export default function Register() {
  const [role, setRole] = useState('learner');
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '',
    district: '', company_name: '', industry: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const endpoint = role === 'learner' ? '/auth/register/learner' : '/auth/register/employer';
    const payload = role === 'learner'
      ? { name: formData.name, email: formData.email, password: formData.password, phone: formData.phone, district: formData.district }
      : { name: formData.name, email: formData.email, password: formData.password, phone: formData.phone, company_name: formData.company_name, industry: formData.industry };

    try {
      await api.post(endpoint, payload);
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg-page)' }}>
      {/* Left Branding Side */}
      <div style={{ flex: 1, backgroundColor: 'var(--color-primary)', color: 'white', padding: '4rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)', borderRadius: '50%' }}></div>

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
            <Sparkles size={16} color="#10B981" /> Join the movement
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem', color: 'white' }}>
            Build your future, today.
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            Whether you're a learner ready to master in-demand skills, or an employer searching for top talent — SkillBridge is your launchpad.
          </p>
        </div>
      </div>

      {/* Right Registration Side */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: '460px' }}>
          <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '2rem' }}>
            <ArrowLeft size={16} /> Back to login
          </Link>

          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Create your account</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Select your role and fill in the details below.</p>

          {/* Role Toggle */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
            <button
              type="button"
              onClick={() => setRole('learner')}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.85rem 1rem', borderRadius: '12px', cursor: 'pointer',
                fontWeight: '600', fontSize: '0.9rem', fontFamily: 'inherit',
                transition: 'all 0.2s',
                border: role === 'learner' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                backgroundColor: role === 'learner' ? 'rgba(15,23,42,0.04)' : 'white',
                color: role === 'learner' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                boxShadow: role === 'learner' ? '0 0 0 3px rgba(15,23,42,0.08)' : 'none'
              }}
            >
              <User size={18} /> Learner
            </button>
            <button
              type="button"
              onClick={() => setRole('employer')}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.85rem 1rem', borderRadius: '12px', cursor: 'pointer',
                fontWeight: '600', fontSize: '0.9rem', fontFamily: 'inherit',
                transition: 'all 0.2s',
                border: role === 'employer' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                backgroundColor: role === 'employer' ? 'rgba(15,23,42,0.04)' : 'white',
                color: role === 'employer' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                boxShadow: role === 'employer' ? '0 0 0 3px rgba(15,23,42,0.08)' : 'none'
              }}
            >
              <Building size={18} /> Employer
            </button>
          </div>

          {error && (
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', padding: '1rem', borderRadius: 'var(--border-radius-btn)', marginBottom: '1.5rem', fontSize: '0.875rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', padding: '1rem', borderRadius: 'var(--border-radius-btn)', marginBottom: '1.5rem', fontSize: '0.875rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              {success}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label className="input-label">{role === 'employer' ? 'HR Manager Name' : 'Full Name'}</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="Enter your full name" required disabled={isLoading} />
            </div>

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="name@company.com" required disabled={isLoading} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label className="input-label">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" placeholder="••••••••" required disabled={isLoading} />
              </div>
              <div className="input-group">
                <label className="input-label">Phone Number (Optional)</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-field" placeholder="+250 7XX XXX XXX" disabled={isLoading} />
              </div>
            </div>

            {role === 'learner' && (
              <div className="input-group">
                <label className="input-label">Current District</label>
                <select name="district" value={formData.district} onChange={handleChange} className="input-field" style={{ cursor: 'pointer' }} disabled={isLoading}>
                  <option value="">Select district</option>
                  <option value="Gasabo">Gasabo</option>
                  <option value="Kicukiro">Kicukiro</option>
                  <option value="Nyarugenge">Nyarugenge</option>
                  <option value="Burera">Burera</option>
                  <option value="Gakenke">Gakenke</option>
                  <option value="Gicumbi">Gicumbi</option>
                  <option value="Musanze">Musanze</option>
                  <option value="Rulindo">Rulindo</option>
                  <option value="Huye">Huye</option>
                  <option value="Muhanga">Muhanga</option>
                  <option value="Nyanza">Nyanza</option>
                  <option value="Rubavu">Rubavu</option>
                  <option value="Rusizi">Rusizi</option>
                  <option value="Nyagatare">Nyagatare</option>
                  <option value="Rwamagana">Rwamagana</option>
                </select>
              </div>
            )}

            {role === 'employer' && (
              <>
                <div className="input-group">
                  <label className="input-label">Company Name</label>
                  <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} className="input-field" placeholder="e.g. Tech Rwanda Ltd" required disabled={isLoading} />
                </div>
                <div className="input-group">
                  <label className="input-label">Industry</label>
                  <select name="industry" value={formData.industry} onChange={handleChange} className="input-field" style={{ cursor: 'pointer' }} disabled={isLoading}>
                    <option value="">Select industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', marginTop: '0.75rem' }} disabled={isLoading}>
              {isLoading ? 'Creating account...' : `Create ${role === 'learner' ? 'Learner' : 'Employer'} Account`}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Already have an account? <Link to="/login" style={{ fontWeight: '600', color: 'var(--color-primary)' }}>Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
