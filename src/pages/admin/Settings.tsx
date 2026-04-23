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

        {/* Offer Controls */}
        <section>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Active Offers</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center" style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 'var(--border-radius)' }}>
              <div>
                <h4 style={{ fontSize: '1rem' }}>Early Bird Discount (20%)</h4>
                <p className="text-secondary text-sm">Applies to bookings between 6 AM - 9 AM</p>
              </div>
              {/* Custom Toggle Switch */}
              <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{ 
                  position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, 
                  backgroundColor: 'var(--accent-green)', borderRadius: '34px', transition: '0.4s' 
                }}>
                  <span style={{ 
                    position: 'absolute', content: '""', height: '16px', width: '16px', left: '30px', bottom: '4px', 
                    backgroundColor: 'white', borderRadius: '50%', transition: '0.4s' 
                  }}></span>
                </span>
              </label>
            </div>

            <div className="flex justify-between items-center" style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 'var(--border-radius)' }}>
              <div>
                <h4 style={{ fontSize: '1rem' }}>Pickleball Promo (10%)</h4>
                <p className="text-secondary text-sm">Applies to all Pickleball bookings</p>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                <span style={{ 
                  position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, 
                  backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '34px', transition: '0.4s' 
                }}>
                  <span style={{ 
                    position: 'absolute', content: '""', height: '16px', width: '16px', left: '4px', bottom: '4px', 
                    backgroundColor: 'white', borderRadius: '50%', transition: '0.4s' 
                  }}></span>
                </span>
              </label>
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
