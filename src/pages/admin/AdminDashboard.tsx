import React from 'react';
import { IndianRupee, CalendarDays, Clock, Activity } from 'lucide-react';

export function AdminDashboard() {
  const metrics = [
    { label: 'Today Revenue', value: '₹14,500', icon: IndianRupee, color: 'var(--accent-green)' },
    { label: 'Total Bookings', value: '24', icon: CalendarDays, color: 'var(--accent-blue)' },
    { label: 'Pending Payments', value: '₹2,500', icon: Clock, color: 'var(--status-pending)' },
    { label: 'Utilization', value: '85%', icon: Activity, color: 'var(--status-info)' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Dashboard Overview</h1>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ 
                padding: '1rem', 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                borderRadius: 'var(--border-radius)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon size={28} color={m.color} />
              </div>
              <div>
                <p className="text-secondary text-sm" style={{ marginBottom: '0.25rem' }}>{m.label}</p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1 }}>{m.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Placeholder Chart 1 */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Revenue Trend (Last 7 Days)</h3>
          <div style={{ 
            height: '250px', 
            backgroundColor: 'rgba(255,255,255,0.02)', 
            border: '1px dashed rgba(255,255,255,0.1)',
            borderRadius: 'var(--border-radius)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '1rem',
            gap: '1rem'
          }}>
            {/* Simple CSS Bar Chart Simulation */}
            {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
                <div style={{ 
                  width: '100%', 
                  height: `${h}%`, 
                  backgroundColor: 'var(--accent-green)', 
                  opacity: 0.8,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4
                }}></div>
                <span className="text-muted text-sm mt-2">D{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder Chart 2 */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Booking Activity</h3>
          <div style={{ 
            height: '250px', 
            backgroundColor: 'rgba(255,255,255,0.02)', 
            border: '1px dashed rgba(255,255,255,0.1)',
            borderRadius: 'var(--border-radius)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '1rem',
            gap: '1rem'
          }}>
             {/* Simple CSS Line/Bar Chart Simulation */}
             {[30, 40, 25, 50, 45, 70, 85].map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
                <div style={{ 
                  width: '100%', 
                  height: `${h}%`, 
                  backgroundColor: 'var(--accent-blue)', 
                  opacity: 0.8,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4
                }}></div>
                <span className="text-muted text-sm mt-2">D{i+1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
