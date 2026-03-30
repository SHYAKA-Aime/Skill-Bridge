import React, { useState } from 'react';
import { Users, Shield, UserX, UserCheck, MoreVertical, Trash2 } from 'lucide-react';
import { ConfirmModal, FeedbackModal } from '../components/Modals';

const mockUsersData = [
  { id: 1, name: 'Platform Admin', email: 'admin@skillbridge.africa', role: 'admin', status: 'Active' },
  { id: 2, name: 'Patrick Shyaka', email: 'shyaka@skillbridge.africa', role: 'learner', status: 'Active' },
  { id: 3, name: 'TechAfrica HR', email: 'hr@tech.africa', role: 'employer', status: 'Active' },
  { id: 4, name: 'John Doe', email: 'john@example.com', role: 'learner', status: 'Suspended' },
];

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsersData);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleDelete = () => {
    setUsers(users.filter(u => u.id !== confirmDelete));
    setConfirmDelete(null);
    setFeedback({ title: 'Account Deleted', message: 'The user account and associated data have been purged from the system.' });
  };

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
    setFeedback({ title: 'Status Updated', message: 'User access privileges have been modified successfully.' });
  };

  return (
    <div className="dashboard-scroll">
      <header className="dashboard-header-flex">
        <div>
          <h1>User Management</h1>
          <p>Control platform access, manage roles, and review account security.</p>
        </div>
      </header>

      <div className="kpi-grid">
         <div className="kpi-card glass-morph">
            <div className="kpi-header"><span>Total Accounts</span><Users size={18} /></div>
            <div className="kpi-value">1,284</div>
         </div>
         <div className="kpi-card glass-morph">
            <div className="kpi-header"><span>Active Now</span><Shield size={18} /></div>
            <div className="kpi-value">42</div>
         </div>
      </div>

      <div className="card" style={{padding: 0}}>
         <table className="data-table">
            <thead>
               <tr>
                  <th>User</th>
                  <th>Internal Role</th>
                  <th>Status</th>
                  <th>Security Log</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {users.map(u => (
                  <tr key={u.id}>
                     <td>
                        <div style={{fontWeight: '600'}}>{u.name}</div>
                        <div style={{fontSize: '0.75rem', opacity: 0.6}}>{u.email}</div>
                     </td>
                     <td>
                        <span className="tag" style={{textTransform: 'capitalize'}}>{u.role}</span>
                     </td>
                     <td>
                        <span className={`tag ${u.status === 'Active' ? 'tag-success' : ''}`} style={{background: u.status === 'Suspended' ? 'rgba(239,68,68,0.1)' : '', color: u.status === 'Suspended' ? 'var(--color-danger)' : ''}}>
                           {u.status}
                        </span>
                     </td>
                     <td style={{fontSize: '0.8rem', color: 'var(--color-text-muted)'}}>Last login: 2h ago</td>
                     <td style={{display: 'flex', gap: '4px'}}>
                        <button className="icon-btn" onClick={() => toggleStatus(u.id)} title={u.status === 'Active' ? 'Suspend Account' : 'Activate Account'}>
                           {u.status === 'Active' ? <UserX size={18} color="var(--color-danger)" /> : <UserCheck size={18} color="var(--color-success)" />}
                        </button>
                        <button className="icon-btn" onClick={() => setConfirmDelete(u.id)} title="Delete Account">
                           <Trash2 size={18} color="var(--color-text-muted)" />
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

      <ConfirmModal 
        isOpen={!!confirmDelete} 
        onCancel={() => setConfirmDelete(null)} 
        onConfirm={handleDelete}
        title="Delete User Account?"
        message="This will completely remove the user access. Professional records associated with this account will be archived."
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
