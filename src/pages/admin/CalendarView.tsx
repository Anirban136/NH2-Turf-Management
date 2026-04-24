import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState<any[]>([]);
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    setLoading(true);
    const dateStr = selectedDate.toISOString().split('T')[0];
    
    // Fetch facilities and bookings in parallel
    const [facilitiesRes, bookingsRes] = await Promise.all([
      supabase.from('turf_config').select('*').order('id'),
      supabase.from('bookings').select('*').eq('date', dateStr)
    ]);

    if (facilitiesRes.error) console.error('Error fetching facilities:', facilitiesRes.error);
    else setFacilities(facilitiesRes.data || []);

    if (bookingsRes.error) console.error('Error fetching bookings:', bookingsRes.error);
    else setBookings(bookingsRes.data || []);

    setLoading(false);
  };

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getBookingsForSlot = (facilityId: string, startTime: string) => {
    const startHour = parseInt(startTime.split(':')[0]);
    const endTime = `${(startHour + 1).toString().padStart(2, '0')}:00`;
    
    // Find all bookings that overlap with this 1-hour slot
    return bookings.filter(b => 
      b.facility_id === facilityId && 
      b.start_time < endTime && 
      b.end_time > startTime
    ).sort((a, b) => a.start_time.localeCompare(b.start_time));
  };

  const renderCell = (facilityId: string, time: string) => {
    const slotBookings = getBookingsForSlot(facilityId, time);
    if (slotBookings.length === 0) return null;

    return (
      <div style={{ display: 'flex', gap: '4px', height: '100%' }}>
        {slotBookings.map((booking) => {
          const isPaid = booking.status === 'confirmed' || booking.status === 'paid';
          // Show info if the booking starts in this hour OR if it's a long booking and this is its first hour in view
          const showInfo = booking.start_time.startsWith(time.split(':')[0]) || (booking.start_time < time && slotBookings.length === 1);
          
          return (
            <div key={booking.id} style={{ 
              flex: 1,
              minWidth: 0,
              backgroundColor: isPaid ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 165, 0, 0.15)', 
              borderLeft: `3px solid ${isPaid ? 'var(--accent-green)' : '#ffa500'}`, 
              padding: '0.4rem', 
              borderRadius: '4px', 
              height: '100%',
              fontSize: '0.7rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              {showInfo ? (
                <>
                  <p style={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {booking.customer_name || 'Guest'}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem' }}>
                    {booking.start_time}-{booking.end_time}
                  </p>
                </>
              ) : (
                <p style={{ color: 'rgba(255,255,255,0.2)', textAlign: 'center', fontWeight: 800 }}>•</p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 style={{ fontSize: '2rem' }}>Schedule Calendar</h1>
        <div className="flex items-center gap-4">
          <button onClick={handlePrevDay} className="btn btn-secondary" style={{ padding: '0.5rem' }}><ChevronLeft /></button>
          <div className="card flex items-center gap-2" style={{ padding: '0.5rem 1rem', margin: 0 }}>
            <CalendarIcon size={18} className="text-accent-blue" />
            <span style={{ fontWeight: 600 }}>{formatDate(selectedDate)}</span>
          </div>
          <button onClick={handleNextDay} className="btn btn-secondary" style={{ padding: '0.5rem' }}><ChevronRight /></button>
        </div>
      </div>

      <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
        <div style={{ minWidth: `${100 + (facilities.length * 200)}px` }}>
          {/* Header Row */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: `100px repeat(${facilities.length}, 1fr)`, 
            borderBottom: '1px solid rgba(255,255,255,0.05)', 
            backgroundColor: 'rgba(255,255,255,0.02)' 
          }}>
            <div style={{ padding: '1rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>Time</div>
            {facilities.map(f => (
              <div key={f.id} style={{ padding: '1rem', fontWeight: 600, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                {f.name}
              </div>
            ))}
          </div>

          {/* Grid Body */}
          {loading ? (
            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Loader2 className="animate-spin" size={40} color="var(--accent-green)" />
            </div>
          ) : (
            timeSlots.map(time => (
              <div key={time} style={{ 
                display: 'grid', 
                gridTemplateColumns: `100px repeat(${facilities.length}, 1fr)`, 
                borderBottom: '1px solid rgba(255,255,255,0.05)', 
                minHeight: '60px' 
              }}>
                <div style={{ padding: '1rem', borderRight: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>{time}</div>
                
                {facilities.map(f => (
                  <div key={f.id} style={{ padding: '0.25rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                    {renderCell(f.id, time)}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
