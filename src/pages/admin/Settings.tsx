import React from 'react';
import { Save } from 'lucide-react';

export function Settings() {
  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Platform Settings</h1>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Pricing Controls */}
        <section>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Pricing Configuration</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Football Turf Hourly Rate (₹)</label>
              <input type="number" defaultValue={1200} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Cricket Net Hourly Rate (₹)</label>
              <input type="number" defaultValue={500} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Pickleball Hourly Rate (₹)</label>
              <input type="number" defaultValue={800} />
            </div>
          </div>
        </section>

        {/* Operational Settings */}
        <section>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Operational Rules</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Buffer Time Between Bookings (mins)</label>
              <input type="number" defaultValue={0} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Minimum Advance Payment (₹)</label>
              <input type="number" defaultValue={500} />
            </div>
          </div>
        </section>

        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
