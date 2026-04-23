import React, { useState } from 'react';
import { Search, Filter, Check, X, CreditCard } from 'lucide-react';

export function BookingManagement() {
  const [bookings, setBookings] = useState([
    { id: 'B-101', user: 'Rahul Sharma', facility: 'Football Turf', time: '2026-04-23 18:00', status: 'pending', totalPrice: 1600, advancePaid: 500, payment: 'Partial' },
    { id: 'B-102', user: 'Amit Kumar', facility: 'Pickleball 1', time: '2026-04-23 19:30', status: 'approved', totalPrice: 800, advancePaid: 800, payment: 'Paid' },
    { id: 'B-103', user: 'Sneha Gupta', facility: 'Cricket Net', time: '2026-04-24 07:00', status: 'approved', totalPrice: 600, advancePaid: 500, payment: 'Partial' },
    { id: 'B-104', user: 'Vikram Singh', facility: 'Football Turf', time: '2026-04-24 20:00', status: 'rejected', totalPrice: 1600, advancePaid: 500, payment: 'Refunded' },
  ]);

  const handleAction = (id: string, action: string) => {
    setBookings(bookings.map(b => {
      if (b.id === id) {
        if (action === 'approve') return { ...b, status: 'approved' };
        if (action === 'reject') return { ...b, status: 'rejected' };
        if (action === 'paid') return { ...b, payment: 'Paid', advancePaid: b.totalPrice };
      }
      return b;
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <span className="badge badge-success">Approved</span>;
      case 'rejected': return <span className="badge badge-error">Rejected</span>;
      case 'pending': return <span className="badge badge-pending">Pending</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'Paid': return <span className="text-accent-green" style={{ fontWeight: 600 }}>Paid</span>;
      case 'Partial': return <span className="text-status-pending" style={{ fontWeight: 600, color: 'var(--status-pending)' }}>Partial</span>;
      case 'Unpaid': return <span className="text-status-error" style={{ fontWeight: 600, color: 'var(--status-error)' }}>Unpaid</span>;
      default: return <span className="text-secondary">{status}</span>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 style={{ fontSize: '2rem' }}>Booking Management</h1>
        <div className="flex gap-4">
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search user or ID..." 
              style={{ paddingLeft: '2.5rem', width: '250px', backgroundColor: 'var(--bg-card)' }}
            />
            <Search size={18} className="text-secondary" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
          <button className="btn btn-secondary"><Filter size={18} /> Filters</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table>
          <thead style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Facility</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Advance</th>
              <th>Remaining</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td style={{ fontWeight: 600 }}>{b.id}</td>
                <td>{b.user}</td>
                <td>{b.facility}</td>
                <td>{b.time}</td>
                <td>{getStatusBadge(b.status)}</td>
                <td style={{ fontWeight: 600, color: 'var(--accent-green)' }}>₹{b.advancePaid}</td>
                <td style={{ fontWeight: 600, color: b.totalPrice - b.advancePaid > 0 ? 'var(--status-error)' : 'var(--accent-green)' }}>
                  ₹{b.totalPrice - b.advancePaid}
                </td>
                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    {b.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleAction(b.id, 'approve')}
                          style={{ padding: '0.5rem', backgroundColor: 'rgba(46, 204, 113, 0.1)', color: 'var(--status-success)', borderRadius: 'var(--border-radius)' }}
                          title="Approve"
                        ><Check size={16} /></button>
                        <button 
                          onClick={() => handleAction(b.id, 'reject')}
                          style={{ padding: '0.5rem', backgroundColor: 'rgba(231, 76, 60, 0.1)', color: 'var(--status-error)', borderRadius: 'var(--border-radius)' }}
                          title="Reject"
                        ><X size={16} /></button>
                      </>
                    )}
                    {b.status === 'approved' && b.totalPrice - b.advancePaid > 0 && (
                       <button 
                       onClick={() => handleAction(b.id, 'paid')}
                       style={{ 
                         padding: '0.4rem 0.8rem', 
                         backgroundColor: 'var(--accent-green)', 
                         color: '#000', 
                         borderRadius: 'var(--border-radius)',
                         fontSize: '0.875rem',
                         fontWeight: 600,
                         display: 'flex',
                         alignItems: 'center',
                         gap: '0.4rem'
                       }}
                       title="Mark Full Payment"
                     >
                       <CreditCard size={16} /> Paid
                     </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
