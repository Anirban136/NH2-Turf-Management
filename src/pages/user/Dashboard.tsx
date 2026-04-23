import React from 'react';
import { Calendar, Clock, Award, Tag } from 'lucide-react';

export function Dashboard() {
  const bookings = [
    { id: 1, facility: 'Football Turf', date: '2026-04-25', time: '6:00 PM', status: 'Upcoming', amount: 1200 },
    { id: 2, facility: 'Pickleball Court 1', date: '2026-04-20', time: '7:30 AM', status: 'Completed', amount: 800 },
    { id: 3, facility: 'Cricket Net', date: '2026-04-18', time: '5:00 PM', status: 'Completed', amount: 500 },
  ];

  const upcomingBooking = bookings[0];

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>My Dashboard</h1>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Highlight Upcoming Booking */}
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar className="text-accent-blue" /> Next Match
            </h2>
            <div className="card" style={{ 
              background: 'linear-gradient(135deg, rgba(0, 191, 255, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
              borderColor: 'rgba(0, 191, 255, 0.2)'
            }}>
              <div className="flex justify-between items-center mb-4">
                <h3 style={{ fontSize: '1.25rem' }}>{upcomingBooking.facility}</h3>
                <span className="badge badge-info">{upcomingBooking.status}</span>
              </div>
              <div className="flex gap-6 text-secondary">
                <div className="flex items-center gap-2">
                  <Calendar size={18} /> {upcomingBooking.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} /> {upcomingBooking.time}
                </div>
              </div>
            </div>
          </section>

          {/* All Bookings */}
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Booking History</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {bookings.map(booking => (
                <div key={booking.id} className="card flex justify-between items-center" style={{ padding: '1rem 1.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{booking.facility}</h4>
                    <p className="text-secondary text-sm">{booking.date} at {booking.time}</p>
                  </div>
                  <div className="text-right">
                    <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>₹{booking.amount}</p>
                    <span className={`badge ${booking.status === 'Upcoming' ? 'badge-info' : 'badge-success'}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Loyalty Points */}
          <div className="card text-center" style={{ 
            background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
            borderColor: 'rgba(0, 255, 136, 0.2)'
          }}>
            <Award size={40} className="text-accent-green mx-auto mb-2" />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Loyalty Points</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>1,250</p>
            <p className="text-secondary text-sm mt-2">100 points = ₹10 off on next booking</p>
          </div>

          {/* Offers */}
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Tag size={20} className="text-accent-blue" /> Exclusive Offers
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 'var(--border-radius)' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>10% Off on Pickleball</h4>
                <p className="text-secondary text-sm">Valid until Sunday. Use code PKL10.</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 'var(--border-radius)' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Refer a Friend</h4>
                <p className="text-secondary text-sm">Get 500 points when they book their first turf.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
