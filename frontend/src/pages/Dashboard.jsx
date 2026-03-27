import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area
} from 'recharts';
import { 
  LayoutDashboard, BookOpen, Briefcase, MessageSquare, 
  Settings, Bell, Search, TrendingUp, CheckCircle, Clock,
  Plus, Edit2, Trash2, Users, Eye, Target, Award, Rocket
} from 'lucide-react';
import api from '../services/api';
import './Dashboard.css';
import { FeedbackModal } from '../components/Modals';

const chartData = [
  { name: 'Mon', hours: 2, activity: 40 },
  { name: 'Tue', hours: 3, activity: 60 },
  { name: 'Wed', hours: 1.5, activity: 30 },
  { name: 'Thu', hours: 4, activity: 80 },
  { name: 'Fri', hours: 2.5, activity: 50 },
  { name: 'Sat', hours: 5, activity: 90 },
  { name: 'Sun', hours: 3, activity: 70 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [applications, setApplications] = useState([]);
  const [courses, setCourses] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [learnerEnrollments, setLearnerEnrollments] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [feedback, setFeedback] = useState(null);
  
  const rawUser = localStorage.getItem('user');
  const user = rawUser ? JSON.parse(rawUser) : null;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role === 'employer' || user.role === 'admin') {
      api.get('/employer/applications').then(res => setApplications(res.data));
      api.get('/courses/').then(res => setCourses(res.data));
      api.get('/jobs/').then(res => setJobs(res.data));
    }

    if (user.role === 'learner') {
        const enrolledIds = JSON.parse(localStorage.getItem(`mock_enrollments_${user.id}`) || '[]');
        api.get('/courses/').then(res => {
            setLearnerEnrollments(res.data.filter(c => enrolledIds.includes(c.id)));
        });
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleAction = (item, type) => {
    setFeedback({
      title: 'Action Triggered',
      message: `${type} action initiated for ${item.title || item.userName}. This feature is partially implemented with mock responses.`
    });
  };

  // --- ADMIN VIEW ---
  if (user.role === 'admin') {
    return (
      <div className="dashboard-scroll">
        <header className="dashboard-header-flex">
          <div>
            <h1>Platform Overview</h1>
            <p>Global metrics and system-wide catalog management.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/courses')}>
            <Plus size={18} /> Add New Resource
          </button>
        </header>

        <div className="kpi-grid">
           <div className="kpi-card glass-morph">
              <div className="kpi-header"><span>Verified Users</span><Users size={18} /></div>
              <div className="kpi-value">1,280</div>
              <div className="kpi-trend trend-up"><TrendingUp size={14} /> +12% this month</div>
           </div>
           <div className="kpi-card glass-morph">
              <div className="kpi-header"><span>Course Completions</span><CheckCircle size={18} /></div>
              <div className="kpi-value">4.2k</div>
              <div className="kpi-trend trend-up"><TrendingUp size={14} /> +5.4% velocity</div>
           </div>
           <div className="kpi-card glass-morph">
              <div className="kpi-header"><span>Job Placements</span><Target size={18} /></div>
              <div className="kpi-value">342</div>
              <div className="kpi-trend trend-up"><TrendingUp size={14} /> +18 vs last month</div>
           </div>
        </div>

        <div className="dashboard-bento" style={{gridTemplateColumns: '2fr 1fr'}}>
           <div className="chart-container card">
              <h3 className="section-title">Platform Engagement Activity</h3>
              <div style={{height: '300px'}}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorAct" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-muted)', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-muted)', fontSize: 12}} />
                    <Tooltip />
                    <Area type="monotone" dataKey="activity" stroke="var(--color-accent)" fillOpacity={1} fill="url(#colorAct)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>
           <div className="list-container card">
              <h3 className="section-title">System Status</h3>
              <div className="activity-list">
                 <div className="activity-item"><div className="activity-icon blue"><Rocket size={16}/></div><div className="activity-content"><h4>PWA Engine</h4><p style={{color: 'var(--color-success)'}}>Healthy</p></div></div>
                 <div className="activity-item"><div className="activity-icon green"><Award size={16}/></div><div className="activity-content"><h4>Auth Service</h4><p style={{color: 'var(--color-success)'}}>Active</p></div></div>
                 <div className="activity-item"><div className="activity-icon alert"><Settings size={16}/></div><div className="activity-content"><h4>Mock Database</h4><p>Operational</p></div></div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // --- EMPLOYER VIEW ---
  if (user.role === 'employer') {
    return (
      <div className="dashboard-scroll">
        <header className="dashboard-header-flex">
          <div>
            <h1>Recruitment Hub</h1>
            <p>Track your hiring pipeline and discover top verified talent.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/jobs')}>
            <Plus size={18} /> Create Job Posting
          </button>
        </header>

        <div className="kpi-grid">
           <div className="kpi-card">
              <div className="kpi-header"><span>Active Postings</span><Briefcase size={18} /></div>
              <div className="kpi-value">{jobs.length}</div>
           </div>
           <div className="kpi-card">
              <div className="kpi-header"><span>New Applicants</span><Users size={18} /></div>
              <div className="kpi-value">{applications.length}</div>
              <div className="badge-trend">+4 today</div>
           </div>
           <div className="kpi-card">
              <div className="kpi-header"><span>Average Fit Score</span><Target size={18} /></div>
              <div className="kpi-value">82%</div>
           </div>
        </div>

        <div className="card" style={{padding: 0}}>
           <div style={{padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h3 className="section-title" style={{margin: 0}}>Recent Applications</h3>
              <div style={{fontSize: '0.85rem', color: 'var(--color-text-muted)'}}>Last 30 days</div>
           </div>
           <div style={{overflowX: 'auto'}}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Verified Learning Path</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Score</th>
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
                      <td>
                        <div className="tag-group">
                           {app.skills?.map((s, i) => <span key={i} className="tag tag-success" style={{fontSize: '0.65rem'}}>{s}</span>)}
                           {!app.skills?.length && <span style={{fontSize: '0.75rem', opacity: 0.5}}>No platform courses yet</span>}
                        </div>
                      </td>
                      <td>{jobs.find(j => j.id === app.jobId)?.title || 'React Dev'}</td>
                      <td><span className="tag" style={{background: 'rgba(59,130,246,0.1)', color: 'var(--color-accent)'}}>Reviewing</span></td>
                      <td><div className="score-ring">94</div></td>
                      <td><button className="icon-btn" onClick={() => setSelectedApplicant(app)}><Eye size={18}/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>

        {selectedApplicant && (
           <div className="modal-overlay">
              <div className="card modal-content" style={{maxWidth: '600px'}}>
                 <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem'}}>
                    <h2>Professional Profile</h2>
                    <button className="icon-btn" onClick={() => setSelectedApplicant(null)}>×</button>
                 </div>
                 <div style={{display:'flex', gap:'1.5rem', marginBottom:'2rem'}}>
                    <div className="avatar-large">{selectedApplicant.userName.charAt(0)}</div>
                    <div>
                       <h3>{selectedApplicant.userName}</h3>
                       <p>{selectedApplicant.userEmail}</p>
                       <div className="tag tag-success" style={{marginTop:'0.5rem'}}>Verified Talent</div>
                    </div>
                 </div>
                 <h4>SkillBridge Verified Courses</h4>
                 <div style={{marginTop:'1rem', display:'flex', flexDirection:'column', gap:'0.75rem'}}>
                    {selectedApplicant.skills?.map((s, i) => (
                       <div key={i} style={{padding:'0.75rem', border:'1px solid var(--color-border)', borderRadius:'8px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                          <span style={{fontWeight:'500'}}>{s}</span>
                          <span style={{color:'var(--color-success)', fontSize:'0.8rem'}}>Completed ✓</span>
                       </div>
                    ))}
                    {!selectedApplicant.skills?.length && <p>No courses completed yet.</p>}
                 </div>
                 <button className="btn btn-primary" style={{width:'100%', marginTop:'2rem'}} onClick={() => setFeedback({ title: 'Invitation Sent!', message: 'The candidate has been notified of your interview request.' })}>Invite to Interview</button>
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

  // --- LEARNER VIEW ---
  return (
    <div className="dashboard-scroll">
      <header className="dashboard-header-flex">
        <div>
          <h1>Welcome back, {user.name.split(' ')[0]}!</h1>
          <p>Your skill journey is 65% complete. You're doing great!</p>
        </div>
        <Link to="/courses" className="btn btn-accent">Continue Learning</Link>
      </header>

      <div className="kpi-grid">
        <div className="kpi-card card-gradient-primary">
          <div className="kpi-header"><span>Active Courses</span><BookOpen size={18} /></div>
          <div className="kpi-value">{learnerEnrollments.length}</div>
        </div>
        <div className="kpi-card card-gradient-secondary">
          <div className="kpi-header"><span>Total Study Hours</span><Clock size={18} /></div>
          <div className="kpi-value">24.5h</div>
        </div>
        <div className="kpi-card card-gradient-accent">
          <div className="kpi-header"><span>Certificates Earned</span><Award size={18} /></div>
          <div className="kpi-value">2</div>
        </div>
      </div>

      <div className="dashboard-bento">
        <div className="card">
           <h3 className="section-title">Weekly Growth Velocity</h3>
           <div style={{height: '220px'}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="hours" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
        <div className="card">
           <h3 className="section-title">Course Progress</h3>
           <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
              {learnerEnrollments.map(c => (
                 <div key={c.id}>
                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.85rem', marginBottom:'0.5rem'}}>
                       <span>{c.title}</span>
                       <span style={{fontWeight:'700'}}>75%</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{width:'75%'}}></div></div>
                 </div>
              ))}
              {learnerEnrollments.length === 0 && <p style={{color:'var(--color-text-muted)', fontSize:'0.9rem'}}>No active courses. Check the catalog!</p>}
           </div>
        </div>
      </div>
    </div>
  );
}
