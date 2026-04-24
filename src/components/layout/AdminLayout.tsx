import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  CreditCard, 
  Settings, 
  ClipboardList,
  LogOut,
  Tag,
  ExternalLink,
  Plus,
  X
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTurfModal, setShowTurfModal] = useState(false);
  const [newTurf, setNewTurf] = useState({ id: '', name: '', base_price: 1600 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/bookings', label: 'Facility Management', icon: ClipboardList },
    { path: '/admin/calendar', label: 'Booking Grid', icon: Calendar },
    { path: '/admin/expenses', label: 'Expenses', icon: CreditCard },
    { path: '/admin/support', label: 'Support', icon: ExternalLink },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/');
  };

  const handleAddTurf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTurf.id || !newTurf.name) {
      alert('Please fill all fields');
      return;
    }
    
    setIsSubmitting(true);
    const { error } = await supabase
      .from('turf_config')
      .insert([newTurf]);

    if (error) {
      alert(`Error adding turf: ${error.message}`);
    } else {
      setShowTurfModal(false);
      setNewTurf({ id: '', name: '', base_price: 1600 });
      // Refresh the page or relevant components
      window.location.reload();
    }
    setIsSubmitting(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#fff' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '280px', 
        backgroundColor: '#0a0a0a', 
        borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 1000,
        padding: '1.5rem'
      }}>
        {/* User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px', 
            overflow: 'hidden',
            border: '2px solid var(--accent-green)'
          }}>
            <img src="https://ui-avatars.com/api/?name=Admin&background=00ff88&color=000" alt="Admin" style={{ width: '100%', height: '100%' }} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Admin Console</h4>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>Stadium Hub</p>
          </div>
        </div>

        {/* Add New Turf Button */}
        <button 
          onClick={() => setShowTurfModal(true)}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: 'var(--accent-green)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2.5rem',
            cursor: 'pointer',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            letterSpacing: '0.05em'
          }}
        >
          <Plus size={18} /> ADD NEW TURF
        </button>

        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="flex items-center gap-3 transition-all"
                    style={{ 
                      padding: '1rem 1.25rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: isActive ? 'var(--accent-green)' : 'rgba(255,255,255,0.4)',
                      backgroundColor: isActive ? 'rgba(0, 255, 136, 0.05)' : 'transparent',
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%', 
              padding: '0.875rem 1.25rem', 
              borderRadius: '8px', 
              border: 'none',
              backgroundColor: 'transparent',
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto', backgroundColor: '#0a0a0a' }}>
        <Outlet />
      </main>

      {/* Add Turf Modal */}
      {showTurfModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#111', padding: '2.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Add New Facility</h2>
              <button onClick={() => setShowTurfModal(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleAddTurf} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Facility ID (Slug)</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. p3, cricket2"
                  value={newTurf.id}
                  onChange={(e) => setNewTurf({...newTurf, id: e.target.value})}
                  style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.875rem', borderRadius: '8px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Facility Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Pickleball Court 3"
                  value={newTurf.name}
                  onChange={(e) => setNewTurf({...newTurf, name: e.target.value})}
                  style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.875rem', borderRadius: '8px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Base Price (₹/hr)</label>
                <input 
                  type="number" 
                  required
                  value={newTurf.base_price}
                  onChange={(e) => setNewTurf({...newTurf, base_price: parseInt(e.target.value)})}
                  style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.875rem', borderRadius: '8px', color: '#fff' }}
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{ 
                  marginTop: '1rem',
                  padding: '1rem', 
                  borderRadius: '8px', 
                  border: 'none', 
                  backgroundColor: 'var(--accent-green)', 
                  color: '#000', 
                  fontWeight: 700, 
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Adding...' : 'Generate New Facility'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
