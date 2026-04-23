import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  CreditCard, 
  Settings, 
  ClipboardList,
  LogOut,
  Tag,
  ExternalLink
} from 'lucide-react';

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/bookings', label: 'Bookings', icon: ClipboardList },
    { path: '/admin/calendar', label: 'Calendar', icon: Calendar },
    { path: '/admin/expenses', label: 'Expenses', icon: CreditCard },
    { path: '/admin/offers', label: 'Offers', icon: Tag },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
    { path: '/admin/audit-logs', label: 'Audit Logs', icon: ClipboardList },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '280px', 
        backgroundColor: '#111', 
        borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 1000
      }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <Link to="/" className="flex items-center gap-3">
            <img src="/assets/images/logo.png" alt="Logo" style={{ height: '40px', width: 'auto' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Admin Panel</span>
          </Link>
        </div>

        <nav style={{ padding: '1rem', flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="flex items-center gap-3 transition-all"
                    style={{ 
                      padding: '0.875rem 1.25rem',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: isActive ? '#000' : 'rgba(255,255,255,0.6)',
                      backgroundColor: isActive ? 'var(--accent-green)' : 'transparent',
                      fontWeight: isActive ? 700 : 500,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
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

        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => window.open('/', '_blank')}
            className="flex items-center gap-3 transition-colors"
            style={{ 
              width: '100%', 
              padding: '0.875rem 1.25rem', 
              borderRadius: '12px', 
              border: 'none',
              backgroundColor: 'transparent',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              fontSize: '1rem',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <ExternalLink size={20} />
            <span>Visit Website</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 transition-colors"
            style={{ 
              width: '100%', 
              padding: '0.875rem 1.25rem', 
              borderRadius: '12px', 
              border: 'none',
              backgroundColor: 'transparent',
              color: '#e74c3c',
              cursor: 'pointer',
              fontSize: '1rem',
              textAlign: 'left',
              fontWeight: 600
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(231, 76, 60, 0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <LogOut size={20} />
            <span>Exit Admin Mode</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto', backgroundColor: '#0a0a0a' }}>
        <Outlet />
      </main>
    </div>
  );
}
