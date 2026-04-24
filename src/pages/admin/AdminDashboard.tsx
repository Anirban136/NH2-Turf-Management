import React, { useState, useEffect } from 'react';
import { IndianRupee, CalendarDays, TrendingUp, Wallet, Users, ChevronDown, Calendar, Filter, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    todayRevenue: 0,
    monthlyRevenue: 0,
    totalBookings: 0,
    netProfit: 0,
    avgValue: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

      // Fetch Bookings
      const { data: bookings } = await supabase.from('bookings').select('total_price, date');
      // Fetch Expenses
      const { data: expenses } = await supabase.from('expenses').select('amount, date');

      const b = bookings || [];
      const e = expenses || [];

      const todayRevenue = b
        .filter(bk => bk.date === today)
        .reduce((sum, bk) => sum + bk.total_price, 0);

      const monthlyRevenue = b
        .filter(bk => new Date(bk.date) >= new Date(startOfMonth))
        .reduce((sum, bk) => sum + bk.total_price, 0);

      const monthlyExpenses = e
        .filter(exp => new Date(exp.date) >= new Date(startOfMonth))
        .reduce((sum, exp) => sum + exp.amount, 0);

      const totalBookings = b.length;
      const netProfit = monthlyRevenue - monthlyExpenses;
      const avgValue = totalBookings > 0 ? monthlyRevenue / b.filter(bk => new Date(bk.date) >= new Date(startOfMonth)).length : 0;

      setData({
        todayRevenue,
        monthlyRevenue,
        totalBookings,
        netProfit,
        avgValue: Math.round(avgValue)
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
    setLoading(false);
  };

  const metrics = [
    { label: 'TODAY REVENUE', value: `₹${data.todayRevenue.toLocaleString()}`, change: '+12% vs yesterday', icon: IndianRupee, color: 'var(--accent-green)' },
    { label: 'MONTHLY REVENUE', value: `₹${(data.monthlyRevenue / 1000).toFixed(1)}k`, change: '+5% vs last month', icon: Wallet, color: 'var(--accent-blue)' },
    { label: 'TOTAL BOOKINGS', value: data.totalBookings.toString(), change: '-2% vs average', icon: CalendarDays, color: 'var(--accent-green)' },
    { label: 'NET PROFIT', value: `₹${(data.netProfit / 1000).toFixed(1)}k`, change: '85% progress', icon: TrendingUp, color: 'var(--accent-blue)', isProgress: true },
    { label: 'AVG VALUE', value: `₹${data.avgValue}`, change: 'Per booking slot', icon: Users, color: 'var(--accent-green)' },
  ];

  if (loading) {
    return (
      <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={48} color="var(--accent-green)" />
      </div>
    );
  }

  return (
    <div style={{ color: '#fff' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Overview</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>Real-time performance metrics across all facilities.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: 'none', padding: '0.625rem 1rem', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
            <Calendar size={14} /> Today <ChevronDown size={14} />
          </button>
          <button style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: 'none', padding: '0.625rem 1rem', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
            <Filter size={14} /> Filters
          </button>
        </div>
      </div>
      
      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} style={{ 
              backgroundColor: 'rgba(255,255,255,0.03)', 
              padding: '1.5rem', 
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.05)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.625rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{m.label}</p>
                <Icon size={16} color={m.color} />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{m.value}</h3>
              {m.isProgress ? (
                <div style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '1rem' }}>
                  <div style={{ width: '70%', height: '100%', backgroundColor: 'var(--accent-green)', borderRadius: '2px', boxShadow: '0 0 10px var(--accent-green)' }}></div>
                </div>
              ) : (
                <p style={{ fontSize: '0.75rem', color: m.change.startsWith('+') ? 'var(--accent-green)' : (m.change.startsWith('-') ? '#ff4d4d' : 'rgba(255,255,255,0.4)'), fontWeight: 600 }}>{m.change}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Charts Middle Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {/* Revenue vs Expense Chart */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Revenue vs Expense</h4>
            <button style={{ color: 'rgba(255,255,255,0.3)', border: 'none', background: 'none', cursor: 'pointer' }}>•••</button>
          </div>
          <div style={{ position: 'relative', height: '240px' }}>
            {/* Simple SVG Chart */}
            <svg width="100%" height="100%" viewBox="0 0 800 240" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 180 Q 100 160 200 120 T 400 140 T 600 100 T 800 160 L 800 240 L 0 240 Z" fill="url(#lineGradient)" />
              <path d="M 0 180 Q 100 160 200 120 T 400 140 T 600 100 T 800 160" stroke="var(--accent-blue)" strokeWidth="4" fill="none" />
              {[0, 200, 400, 600, 800].map((x, i) => (
                <circle key={i} cx={x} cy={[180, 120, 140, 100, 160][i]} r="6" fill="#000" stroke="var(--accent-blue)" strokeWidth="3" />
              ))}
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* Facility Performance */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2.5rem' }}>Facility Performance</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { label: 'Football Turf', value: 85, color: 'var(--accent-green)' },
              { label: 'Cricket Net', value: 62, color: 'var(--accent-blue)' },
              { label: 'Pickleball 1', value: 40, color: 'var(--accent-green)' },
              { label: 'Pickleball 2', value: 90, color: 'var(--accent-blue)' },
            ].map((f, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.75rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>{f.label}</span>
                  <span style={{ fontWeight: 700 }}>{f.value}%</span>
                </div>
                <div style={{ height: '12px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                  <div style={{ width: `${f.value}%`, height: '100%', backgroundColor: f.color, borderRadius: '6px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Utilization Heatmap Bottom */}
      <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Utilization Heatmap</h4>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>Booking density across time slots and days.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.625rem', color: 'rgba(255,255,255,0.4)' }}>
            <span>Low</span>
            <div style={{ display: 'flex', gap: '2px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: 'rgba(0, 255, 136, 0.05)', borderRadius: '2px' }}></div>
              <div style={{ width: '12px', height: '12px', backgroundColor: 'rgba(0, 255, 136, 0.2)', borderRadius: '2px' }}></div>
              <div style={{ width: '12px', height: '12px', backgroundColor: 'rgba(0, 255, 136, 0.5)', borderRadius: '2px' }}></div>
              <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--accent-green)', borderRadius: '2px' }}></div>
            </div>
            <span>High</span>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4px' }}>
          {Array.from({ length: 84 }).map((_, i) => {
            // Simplified logic: more activity in evenings (slots 8-12) and weekends (rows 5, 6)
            const row = Math.floor(i / 12);
            const col = i % 12;
            const isWeekend = row >= 5;
            const isEvening = col >= 8;
            
            let opacity = 0.05;
            if (isWeekend && isEvening) opacity = 0.8;
            else if (isWeekend || isEvening) opacity = 0.3;
            else if (i % 7 === 0) opacity = 0.2;

            return (
              <div key={i} style={{ 
                height: '32px', 
                backgroundColor: `rgba(0, 255, 136, ${opacity})`,
                borderRadius: '4px'
              }}></div>
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.625rem' }}>
          <span>6 AM</span><span>9 AM</span><span>12 PM</span><span>3 PM</span><span>6 PM</span><span>9 PM</span><span>12 AM</span>
        </div>
      </div>
    </div>
  );
}
