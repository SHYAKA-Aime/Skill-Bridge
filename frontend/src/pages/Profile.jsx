import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Award, BookOpen, Edit3 } from 'lucide-react';
import api from '../services/api';
import { FeedbackModal } from '../components/Modals';

export default function Profile() {
  const [learnerEnrollments, setLearnerEnrollments] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const rawUser = localStorage.getItem('user');
  const user = rawUser ? JSON.parse(rawUser) : null;

  useEffect(() => {
    if (user && user.role === 'learner') {
      const enrolledIds = JSON.parse(localStorage.getItem(`mock_enrollments_${user.id}`) || '[]');
      api.get('/courses/').then(res => {
        setLearnerEnrollments(res.data.filter(c => enrolledIds.includes(c.id)));
      });
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="dashboard-scroll">
      <header className="dashboard-header-flex">
        <div>
          <h1>My Professional Profile</h1>
          <p>Manage your identity and showcase your verified achievements.</p>
        </div>
        <button className="btn btn-secondary" onClick={() => setFeedback({ title: 'Edit Profile', message: 'The profile editor is currently being synchronized with our verified credentialing system. Please check back shortly.' })}>
          <Edit3 size={18} style={{marginRight: '8px'}} /> Edit Profile
        </button>
      </header>

      <div className="dashboard-bento" style={{gridTemplateColumns: '1fr 2fr'}}>
        {/* Left: Identity Card */}
        <div className="card" style={{textAlign: 'center', padding: '3rem 2rem'}}>
           <div className="avatar-large" style={{width: '100px', height: '100px', fontSize: '2.5rem', margin: '0 auto 1.5rem auto'}}>
             {user.name.charAt(0)}
           </div>
           <h2 style={{marginBottom: '0.5rem'}}>{user.name}</h2>
           <span className="tag tag-success" style={{marginBottom: '2rem'}}>Verified Learner</span>
           
           <div style={{textAlign: 'left', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', marginTop: '1.5rem'}}>
             <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'1rem', fontSize:'0.9rem'}}>
               <Mail size={16} color="var(--color-text-muted)" /> {user.email}
             </div>
             <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'1rem', fontSize:'0.9rem'}}>
               <Phone size={16} color="var(--color-text-muted)" /> +250 788 123 456
             </div>
             <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'0.9rem'}}>
               <MapPin size={16} color="var(--color-text-muted)" /> Nairobi, Africa
             </div>
           </div>
        </div>

        {/* Right: Achievements & Skills */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
           <div className="card">
              <h3 style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <Award size={22} color="var(--color-accent)" /> Verified Skills & Certifications
              </h3>
              <div className="tag-group">
                 {learnerEnrollments.map(c => (
                   <div key={c.id} style={{padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '12px', flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <div className="activity-icon green"><Award size={18} /></div>
                      <div>
                        <div style={{fontWeight: '600', fontSize: '0.9rem'}}>{c.title}</div>
                        <div style={{fontSize: '0.75rem', color: 'var(--color-success)'}}>Verified Certificate</div>
                      </div>
                   </div>
                 ))}
                 {learnerEnrollments.length === 0 && <p style={{color: 'var(--color-text-muted)'}}>No skills verified yet. Complete a course to earn badges!</p>}
              </div>
           </div>

           <div className="card">
              <h3 style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <BookOpen size={22} color="var(--color-secondary)" /> Learning History
              </h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Date Enrolled</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {learnerEnrollments.map(c => (
                    <tr key={c.id}>
                      <td style={{fontWeight: '500'}}>{c.title}</td>
                      <td style={{fontSize: '0.85rem'}}>Oct 12, 2023</td>
                      <td><span className="tag tag-success">Completed</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      </div>

      <FeedbackModal 
        isOpen={!!feedback} 
        onClose={() => setFeedback(null)} 
        title={feedback?.title}
        message={feedback?.message}
      />
    </div>
  );
}
