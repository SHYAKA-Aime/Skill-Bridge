import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Building, Rocket, Code2 } from 'lucide-react';
import './Home.css';

export default function Home() {
  return (
    <div className="landing-page">
      {/* Dynamic Hero */}
      <section className="hero-section">
        <div className="hero-bg-glow"></div>
        <div className="hero-content">
          <div className="pill-badge">
            <Sparkles size={14} className="sparkle-icon" />
            <span>The New Standard for Career Growth</span>
          </div>
          <h1>
            Empower your potential.<br />
            <span className="text-gradient">Accelerate your career.</span>
          </h1>
          <p className="hero-subtitle">
            SkillBridge is the premier platform connecting Africa's top emerging tech talent with world-class employers. Learn rapidly, match instantly.
          </p>
          <div className="hero-ctas">
            <Link to="/login" className="btn btn-primary btn-large">
              Start Learning <ArrowRight size={18} style={{ marginLeft: '8px' }}/>
            </Link>
            <Link to="/login" className="btn btn-secondary btn-large">
              Hire Top Talent
            </Link>
          </div>
        </div>
        
        {/* Abstract UI Mockup */}
        <div className="hero-mockup-wrapper">
          <div className="mockup-window glass-card">
            <div className="mockup-header">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="mockup-body">
              <div className="mockup-skeleton line short"></div>
              <div className="mockup-skeleton line"></div>
              <div className="mockup-skeleton line"></div>
            </div>
            <div className="mockup-main">
              <div className="mockup-skeleton box"></div>
              <div className="mockup-grid">
                 <div className="mockup-skeleton card-sm"></div>
                 <div className="mockup-skeleton card-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Features Grid */}
      <section className="features-section">
        <div className="features-header">
          <h2>Engineered for excellence</h2>
          <p>Everything you need to scale your skills and career, built perfectly into one platform.</p>
        </div>
        
        <div className="bento-grid">
          <div className="bento-item glass-card feature-code">
            <Code2 size={28} className="feature-icon text-blue" />
            <h3>Master Modern Tech</h3>
            <p>Access high-caliber courses in React, Python, and Data Science. Built by industry leaders for the modern developer.</p>
          </div>
          
          <div className="bento-item glass-card feature-match span-2">
            <Rocket size={28} className="feature-icon text-orange" />
            <h3>Algorithmic Job Matching</h3>
            <p>Skip the endless applications. Our system automatically matches your verified skills with active hiring pipelines at top companies in Nairobi.</p>
            <div className="match-visual">
               <div className="match-pill">Your Pipeline</div>
               <div className="match-line"></div>
               <div className="match-pill active">Junior React Developer</div>
            </div>
          </div>
          
          <div className="bento-item glass-card feature-employer span-full">
            <div className="employer-content">
               <Building size={28} className="feature-icon text-green" />
               <div style={{ flexGrow: 1 }}>
                  <h3>The Ultimate Hiring Engine</h3>
                  <p>For employers, SkillBridge provides a steady stream of pre-vetted, highly trained professionals. Source with absolute certainty.</p>
               </div>
               <Link to="/login" className="btn btn-secondary">Create Employer Account</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
