import { useState, useEffect } from 'react';
import api from '../services/api';
import { Search, Filter, Clock, Signal, Award, Plus, Edit2, Trash2, X } from 'lucide-react';
import { ConfirmModal, FeedbackModal } from '../components/Modals';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // Course ID to delete
  const [feedback, setFeedback] = useState(null); // { title: '', message: '' }
  const [formData, setFormData] = useState({ title: '', description: '', category: 'Software Engineering', difficulty: 'Beginner', duration_hours: 10, instructor: '' });
  
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    api.get('/courses/').then(res => setCourses(res.data)).catch(console.error);
  };

  const handleEnroll = (id) => {
    api.post(`/courses/${id}/enroll`).then(res => {
        setFeedback({ 
            title: 'Enrollment Successful!', 
            message: 'You have been enrolled in this course. You can now access all learning materials from your dashboard.' 
        });
    });
  };

  const handleDelete = async () => {
    if (confirmDelete) {
      await api.delete(`/courses/${confirmDelete}`);
      setConfirmDelete(null);
      fetchCourses();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCourse) {
      await api.put(`/courses/${editingCourse.id}`, formData);
    } else {
      await api.post('/courses/', formData);
    }
    setIsModalOpen(false);
    setEditingCourse(null);
    setFormData({ title: '', description: '', category: 'Software Engineering', difficulty: 'Beginner', duration_hours: 10, instructor: '' });
    fetchCourses();
  };

  const openEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
    setIsModalOpen(true);
  };

  const filteredCourses = courses.filter(c => 
    (category === 'All' || c.category.includes(category)) &&
    (c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 3rem 4rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--color-text-heading)' }}>Course Catalog</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px' }}>Master modern tech skills that are in high demand in the industry.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {isAdmin && (
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} style={{marginRight: '8px'}}/> Create Course
            </button>
          )}
          <div style={{ position: 'relative' }}>
            <Search size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search for a course..." 
              className="input-field" 
              style={{ paddingLeft: '3rem', width: '300px', borderRadius: '99px' }} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {['All', 'Software', 'Data', 'UI/UX'].map(cat => (
          <button 
            key={cat}
            className="tag" 
            onClick={() => setCategory(cat)} 
            style={{ 
              background: category === cat ? 'var(--color-primary)' : 'white', 
              color: category === cat ? 'white' : 'var(--color-text-body)', 
              padding: '0.55rem 1.25rem',
              border: category === cat ? 'none' : '1px solid var(--color-border)',
              cursor: 'pointer'
            }}
          >
            {cat === 'All' ? 'All Courses' : `${cat} Engineering`}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {filteredCourses.map(course => (
          <div key={course.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
            <div style={{ height: '160px', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(15,23,42,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--color-border)', position: 'relative' }}>
              <Award size={48} color="rgba(15,23,42,0.15)"/>
              {isAdmin && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => openEdit(course)} className="icon-btn" style={{backgroundColor: 'white'}}><Edit2 size={14}/></button>
                  <button onClick={() => setConfirmDelete(course.id)} className="icon-btn" style={{backgroundColor: 'white', color: 'var(--color-danger)'}}><Trash2 size={14}/></button>
                </div>
              )}
            </div>
            <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <span className="tag" style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--color-accent)' }}>{course.category}</span>
                <span style={{ fontWeight: '600', color: 'var(--color-primary)', fontSize: '0.8rem' }}>FREE</span>
              </div>
              
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: '1.3' }}>{course.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{course.description}</p>

              {!isAdmin && (
                <button onClick={() => handleEnroll(course.id)} className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }}>Enroll Now</button>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'var(--color-text-body)', fontSize: '0.85rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)', marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Clock size={16}/> {course.duration_hours}h</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Signal size={16}/> {course.difficulty}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CRUD MODAL */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', position: 'relative', animation: 'fadeIn 0.3s ease-out' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: 'none', cursor: 'pointer' }}><X size={20}/></button>
            <h2 style={{ marginBottom: '1.5rem' }}>{editingCourse ? 'Edit Course' : 'Create New Course'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Course Title</label>
                <input type="text" required className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Description</label>
                <textarea required className="input-field" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Category</label>
                  <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option>Software Engineering</option>
                    <option>Data Science</option>
                    <option>UI/UX Design</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Difficulty</label>
                  <select className="input-field" value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>{editingCourse ? 'Update Course' : 'Create Course'}</button>
            </form>
          </div>
        </div>
      )}

      {/* NEW PREMIUM MODALS */}
      <ConfirmModal 
        isOpen={!!confirmDelete} 
        onCancel={() => setConfirmDelete(null)} 
        onConfirm={handleDelete}
        title="Delete Course?"
        message="This will permanently remove the course and all enrollment records. This action is irreversible."
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
