import { useState, useEffect } from 'react';
import api from '../services/api';
import { Search, MapPin, Briefcase, Building, Plus, Edit2, Trash2, X } from 'lucide-react';
import { ConfirmModal, FeedbackModal } from '../components/Modals';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [formData, setFormData] = useState({ title: '', employer: '', location: 'Kigali', employment_type: 'Full-time', salary_range: '400k - 600k RWF', description: '' });
  
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isEmployer = user?.role === 'employer' || user?.role === 'admin';

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    api.get('/jobs/').then(res => setJobs(res.data)).catch(console.error);
  };

  const handleApply = (id) => {
    api.post(`/jobs/${id}/apply`).then(res => {
        setFeedback({
            title: 'Application Sent!',
            message: 'Your profile has been shared with the employer. You can track your application status in the dashboard.'
        });
    });
  };

  const handleDelete = async () => {
    if (confirmDelete) {
      await api.delete(`/jobs/${confirmDelete}`);
      setConfirmDelete(null);
      fetchJobs();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingJob) {
      await api.put(`/jobs/${editingJob.id}`, formData);
    } else {
      await api.post('/jobs/', { ...formData, employer: user.company_name || user.name });
    }
    setIsModalOpen(false);
    setEditingJob(null);
    setFormData({ title: '', employer: '', location: 'Kigali', employment_type: 'Full-time', salary_range: '400k - 600k RWF', description: '' });
    fetchJobs();
  };

  const openEdit = (job) => {
    setEditingJob(job);
    setFormData(job);
    setIsModalOpen(true);
  };

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.employer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 3rem 4rem' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative' }}>
        <h1 style={{ fontSize: '2.75rem', marginBottom: '1rem', color: 'var(--color-text-heading)', fontWeight: '800' }}>Find Your Next Career Move</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
          Discover opportunities at top high-growth companies in Rwanda. Your next big step starts here.
        </p>
        {isEmployer && (
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{ position: 'absolute', right: 0, bottom: '-60px' }}>
            <Plus size={18} style={{marginRight: '8px'}}/> Post New Job
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', marginTop: '5rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Search for a position or company..." 
            className="input-field" 
            style={{ paddingLeft: '3rem' }} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredJobs.map(job => (
          <div key={job.id} className="card" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '2rem', position: 'relative' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#F8FAFC', border: '1px solid var(--color-border)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building size={28} color="var(--color-primary)" />
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>{job.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{job.employer}</span>
                  <span className="tag tag-success" style={{fontSize: '0.7rem'}}>New</span>
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><MapPin size={16}/> {job.location}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Briefcase size={16}/> {job.employment_type}</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}>
               {!isEmployer && <button onClick={() => handleApply(job.id)} className="btn btn-secondary">Apply Now</button>}
               {isEmployer && (
                 <div style={{ display: 'flex', gap: '0.5rem' }}>
                   <button onClick={() => openEdit(job)} className="icon-btn" style={{border: '1px solid var(--color-border)'}}><Edit2 size={16}/></button>
                   <button onClick={() => setConfirmDelete(job.id)} className="icon-btn" style={{border: '1px solid var(--color-border)', color: 'var(--color-danger)'}}><Trash2 size={16}/></button>
                 </div>
               )}
               <span style={{ fontWeight: '600', color: 'var(--color-text-heading)', fontSize: '0.85rem' }}>{job.salary_range}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CRUD MODAL */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: 'none', cursor: 'pointer' }}><X size={20}/></button>
            <h2 style={{ marginBottom: '1.5rem' }}>{editingJob ? 'Edit Job' : 'Post New Job'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Job Title</label>
                <input type="text" required className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Description</label>
                <textarea required className="input-field" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Type</label>
                  <select className="input-field" value={formData.employment_type} onChange={e => setFormData({...formData, employment_type: e.target.value})}>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Salary Range</label>
                  <input type="text" className="input-field" value={formData.salary_range} onChange={e => setFormData({...formData, salary_range: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>{editingJob ? 'Update Job' : 'Post Job'}</button>
            </form>
          </div>
        </div>
      )}

      {/* NEW PREMIUM MODALS */}
      <ConfirmModal 
        isOpen={!!confirmDelete} 
        onCancel={() => setConfirmDelete(null)} 
        onConfirm={handleDelete}
        title="Delete Job Listing?"
        message="This will permanently remove the job posting and all pending applications. This action is irreversible."
      />
      
      <FeedbackModal 
        isOpen={!!feedback} 
        onClose={() => setFeedback(null)} 
        title={feedback?.title}
        message={feedback?.message}
      />
    </div>
  );
}
