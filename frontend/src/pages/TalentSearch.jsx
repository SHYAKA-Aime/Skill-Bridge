import React, { useState } from 'react';
import { Search, Filter, User, Award, Globe, MapPin } from 'lucide-react';
import { FeedbackModal } from '../components/Modals';

const mockTalent = [
  { id: 1, name: 'Alice Umutoni', skills: ['React JS', 'Node.js', 'UI Design'], district: 'Gasabo', completion: 95 },
  { id: 2, name: 'Bob Mugisha', skills: ['Python', 'SQL', 'Data Analytics'], district: 'Nyarugenge', completion: 80 },
  { id: 3, name: 'Clementine Ingabire', skills: ['React JS', 'CSS Grid', 'Figma'], district: 'Kicukiro', completion: 100 },
];

export default function TalentSearch() {
  const [query, setQuery] = useState('');
  const [feedback, setFeedback] = useState(null);

  const filteredTalent = mockTalent.filter(t => 
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.skills.some(s => s.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="dashboard-scroll">
      <header className="dashboard-header-flex">
        <div>
          <h1>Talent Search</h1>
          <p>Discover verified candidates based on their SkillBridge academic performance.</p>
        </div>
      </header>

      <div className="card" style={{marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center'}}>
        <div className="search-bar" style={{flex: 1, background: 'var(--color-bg-page)'}}>
          <Search size={18} color="var(--color-text-muted)" />
          <input type="text" placeholder="Search by name or skill (e.g. React)..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <button className="btn btn-secondary" onClick={() => setFeedback({ title: 'Discovery Filters', message: 'Advanced filters for degree, availability, and graduation year are coming soon.' })}><Filter size={18} style={{marginRight: '8px'}} /> Filters</button>
      </div>

      <div className="kpi-grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'}}>
         {filteredTalent.map(talent => (
            <div key={talent.id} className="card" style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
               <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                  <div className="avatar" style={{width: '48px', height: '48px', fontSize: '1.2rem'}}>{talent.name.charAt(0)}</div>
                  <div className="tag tag-success" style={{fontSize: '0.65rem'}}>{talent.completion}% Match</div>
               </div>
               <div>
                  <h3 style={{fontSize: '1.1rem', marginBottom: '0.25rem'}}>{talent.name}</h3>
                  <div style={{display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--color-text-muted)'}}>
                    <MapPin size={12} /> {talent.district}, Africa
                  </div>
               </div>
               <div className="tag-group">
                  {talent.skills.map((s, i) => <span key={i} className="tag" style={{fontSize: '0.7rem'}}>{s}</span>)}
               </div>
               <button className="btn btn-primary" style={{width: '100%', marginTop: 'auto'}} onClick={() => setFeedback({ title: talent.name, message: `Access to full academic transcripts and project portfolios requires a Premium Recruiting Subscription.` })}>View Full Profile</button>
            </div>
         ))}
         {filteredTalent.length === 0 && <p style={{gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)'}}>No talent found matching "{query}". Try searching by skill like "React".</p>}
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
