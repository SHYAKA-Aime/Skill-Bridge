import React, { useState, useEffect } from 'react';
import { Users, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import api from '../services/api';
import { FeedbackModal } from '../components/Modals';

export default function ApplicantTracking() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const rawUser = localStorage.getItem('user');
  const user = rawUser ? JSON.parse(rawUser) : null;

  useEffect(() => {
    if (user && user.role === 'employer') {
      api.get('/employer/applications').then(res => setApplications(res.data));
      api.get('/jobs/').then(res => setJobs(res.data));
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="dashboard-scroll">
      <header className="dashboard-header-flex">
        <div>
          <h1>Applicant Tracking System</h1>
          <p>Manage your talent pipeline and move candidates through the hiring funnel.</p>
        </div>
      </header>

      <div className="kpi-grid">
         <div className="kpi-card">
            <div className="kpi-header"><span>New Applicants</span><Clock size={18} /></div>
            <div className="kpi-value">{applications.length}</div>
         </div>
         <div className="kpi-card">
            <div className="kpi-header"><span>In Interview</span><Users size={18} /></div>
            <div className="kpi-value">3</div>
         </div>
         <div className="kpi-card">
            <div className="kpi-header"><span>Hired</span><CheckCircle size={18} /></div>
            <div className="kpi-value">1</div>
         </div>
      </div>

      <div className="card" style={{padding: 0}}>
         <table className="data-table">
            <thead>
               <tr>
                  <th>Candidate</th>
                  <th>Position</th>
                  <th>Verified Skills</th>
                  <th>Status</th>
                  <th>Match</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {applications.map(app => (
                  <tr key={app.id}>
                     <td>
                        <div style={{fontWeight:'600'}}>{app.userName}</div>
                        <div style={{fontSize:'0.75rem', opacity: 0.6}}>{app.userEmail}</div>
                     </td>
                     <td>{jobs.find(j => j.id === app.jobId)?.title || 'React Dev'}</td>
                     <td>
                        <div className="tag-group">
                           {app.skills?.map((s, i) => <span key={i} className="tag tag-success" style={{fontSize: '0.65rem'}}>{s}</span>)}
                        </div>
                     </td>
                     <td><span className="tag" style={{background: 'rgba(59,130,246,0.1)', color: 'var(--color-accent)'}}>Reviewing</span></td>
                     <td><div className="score-ring">94</div></td>
                     <td style={{display: 'flex', gap: '8px'}}>
                        <button className="icon-btn" onClick={() => setSelectedApplicant(app)} title="View Profile"><Eye size={18}/></button>
                        <button className="icon-btn" style={{color: 'var(--color-success)'}} onClick={() => setFeedback({ title: 'Application Approved', message: `${app.userName} has been moved to the next stage in your recruitment pipeline.` })} title="Approve"><CheckCircle size={18}/></button>
                        <button className="icon-btn" style={{color: 'var(--color-danger)'}} onClick={() => setFeedback({ title: 'Candidate Rejected', message: 'The candidate has been notified of the decision. Hiring records updated.' })} title="Reject"><XCircle size={18}/></button>
                     </td>
                  </tr>
               ))}
               {applications.length === 0 && <tr><td colSpan="6" style={{textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)'}}>No active applications to track.</td></tr>}
            </tbody>
         </table>
      </div>

      {selectedApplicant && (
           <div className="modal-overlay">
              <div className="card modal-content" style={{maxWidth: '600px'}}>
                 <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem'}}>
                    <h2>Candidate Deep-Dive</h2>
                    <button className="icon-btn" onClick={() => setSelectedApplicant(null)}>×</button>
                 </div>
                 <div style={{display:'flex', gap:'1.5rem', marginBottom:'2rem'}}>
                    <div className="avatar-large">{selectedApplicant.userName.charAt(0)}</div>
                    <div>
                       <h3>{selectedApplicant.userName}</h3>
                       <p>{selectedApplicant.userEmail}</p>
                       <div className="tag tag-success" style={{marginTop:'0.5rem'}}>Verified SkillBridge Talent</div>
                    </div>
                 </div>
                 <h4>Verified Achievement Record</h4>
                 <div style={{marginTop:'1rem', display:'flex', flexDirection:'column', gap:'0.75rem'}}>
                    {selectedApplicant.skills?.map((s, i) => (
                       <div key={i} style={{padding:'0.75rem', border:'1px solid var(--color-border)', borderRadius:'8px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                          <span style={{fontWeight:'500'}}>{s}</span>
                          <span style={{color:'var(--color-success)', fontSize:'0.8rem'}}>Certified ✓</span>
                       </div>
                    ))}
                    {!selectedApplicant.skills?.length && <p>No courses completed yet.</p>}
                 </div>
                 <div style={{display: 'flex', gap: '1rem', marginTop: '2rem'}}>
                    <button className="btn btn-primary" style={{flex: 1}} onClick={() => setFeedback({ title: 'Interview Scheduled!', message: 'The candidate has been notified to pick a time slot.' })}>Advance to Interview</button>
                    <button className="btn btn-secondary" style={{flex: 1}} onClick={() => { setSelectedApplicant(null); setFeedback({ title: 'Candidate Rejected', message: 'Hiring pipeline updated. Feedback sent.' }); }}>Reject Candidate</button>
                 </div>
              </div>
           </div>
        )}

        <FeedbackModal 
          isOpen={!!feedback} 
          onClose={() => setFeedback(null)} 
          title={feedback?.title}
          message={feedback?.message}
        />
    </div>
  );
}
