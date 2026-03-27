import React from 'react';
import { Trash2, CheckCircle, X } from 'lucide-react';

export function ConfirmModal({ isOpen, onCancel, onConfirm, title, message, confirmText = 'Delete', type = 'danger' }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div className="card" style={{ width: '90%', maxWidth: '400px', textAlign: 'center', padding: '2.5rem', animation: 'fadeIn 0.2s ease-out' }}>
        <div className={`activity-icon ${type === 'danger' ? 'alert' : 'blue'}`} style={{ margin: '0 auto 1.5rem auto', width: '56px', height: '56px' }}>
          {type === 'danger' ? <Trash2 size={28} /> : <CheckCircle size={28} />}
        </div>
        <h2 style={{ marginBottom: '0.75rem' }}>{title || 'Are you sure?'}</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>{message || 'This action cannot be undone.'}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" style={{ backgroundColor: type === 'danger' ? 'var(--color-danger)' : 'var(--color-primary)' }} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}

export function FeedbackModal({ isOpen, onClose, title, message, type = 'success' }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div className="card" style={{ width: '90%', maxWidth: '440px', textAlign: 'center', padding: '3rem 2.5rem', animation: 'fadeIn 0.2s ease-out' }}>
        <div className={`activity-icon ${type === 'success' ? 'green' : 'alert'}`} style={{ margin: '0 auto 1.5rem auto', width: '64px', height: '64px' }}>
          {type === 'success' ? <CheckCircle size={32} /> : <X size={32} />}
        </div>
        <h2 style={{ marginBottom: '1rem' }}>{title}</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>{message}</p>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={onClose}>Great, thanks!</button>
      </div>
    </div>
  );
}
