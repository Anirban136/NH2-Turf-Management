import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export function CalendarView() {
  const timeSlots = Array.from({ length: 15 }, (_, i) => `${i + 6}:00`);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 style={{ fontSize: '2rem' }}>Schedule Calendar</h1>
        <div className="flex items-center gap-4">
          <button className="btn btn-secondary" style={{ padding: '0.5rem' }}><ChevronLeft /></button>
          <div className="card flex items-center gap-2" style={{ padding: '0.5rem 1rem', margin: 0 }}>
            <CalendarIcon size={18} className="text-accent-blue" />
            <span style={{ fontWeight: 600 }}>April 24, 2026</span>
          </div>
          <button className="btn btn-secondary" style={{ padding: '0.5rem' }}><ChevronRight /></button>
        </div>
      </div>

      <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
        <div style={{ minWidth: '800px' }}>
          {/* Header Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div style={{ padding: '1rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>Time</div>
            <div style={{ padding: '1rem', fontWeight: 600, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' }}>Football Turf</div>
            <div style={{ padding: '1rem', fontWeight: 600, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' }}>Pickleball 1</div>
            <div style={{ padding: '1rem', fontWeight: 600, textAlign: 'center' }}>Cricket Net</div>
          </div>

          {/* Time Slots */}
          {timeSlots.map(time => (
            <div key={time} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ padding: '1rem', borderRight: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>{time}</div>
              
              {/* Football Cell */}
              <div style={{ padding: '0.5rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                {time === '18:00' && (
                  <div style={{ backgroundColor: 'rgba(0, 191, 255, 0.2)', borderLeft: '4px solid var(--accent-blue)', padding: '0.5rem', borderRadius: '4px', height: '100%' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Rahul Sharma</p>
                    <p className="text-secondary" style={{ fontSize: '0.75rem' }}>B-101 (Pending)</p>
                  </div>
                )}
              </div>
              
              {/* Pickleball Cell */}
              <div style={{ padding: '0.5rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                {time === '8:00' && (
                  <div style={{ backgroundColor: 'rgba(46, 204, 113, 0.2)', borderLeft: '4px solid var(--status-success)', padding: '0.5rem', borderRadius: '4px', height: '100%' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Amit Kumar</p>
                    <p className="text-secondary" style={{ fontSize: '0.75rem' }}>B-102 (Paid)</p>
                  </div>
                )}
              </div>

              {/* Cricket Cell */}
              <div style={{ padding: '0.5rem' }}>
                {/* Empty */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
