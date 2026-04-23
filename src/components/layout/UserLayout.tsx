import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { LogIn, Menu, X, Trophy } from 'lucide-react';

export function UserLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Stage 1: Wait for entry animation
    const timer1 = setTimeout(() => {
      setIsMinimized(true);
    }, 1500);

    // Stage 2: Fade out splash overlay
    const timer2 = setTimeout(() => {
      setShowSplash(false);
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Book Now', path: '/book' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Blog', path: '/blog' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Services', path: '/services' },
    { name: 'Contacts', path: '/contacts' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Splash Screen Overlay */}
      {showSplash && (
        <div className={`splash-overlay ${isMinimized ? 'fading-out' : ''}`} style={{ opacity: isMinimized ? 0 : 1 }}>
          <img 
            src="/assets/images/logo.png" 
            alt="NH2 Turf" 
            className={`splash-logo ${isMinimized ? 'minimized' : ''}`} 
          />
        </div>
      )}

      {/* Main Content (Fade in after splash) */}
      <div className={!showSplash ? 'content-fade-in' : ''} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', opacity: showSplash ? 0 : 1 }}>
        
        {/* Navbar */}
        <nav style={{ 
          backgroundColor: 'rgba(10, 10, 10, 0.8)', 
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div className="container flex justify-between items-center" style={{ height: '70px' }}>
            <div className="flex items-center gap-4">
              {/* Hamburger Button */}
              <button 
                onClick={() => setIsSidebarOpen(true)}
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', padding: '0.5rem', display: 'flex', alignItems: 'center' }}
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="flex items-center gap-2">
                <img src="/assets/images/logo.png" alt="NH2 Turf" style={{ height: '50px', width: 'auto' }} />
                <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginLeft: '0.5rem' }}>NH2 TURF</span>
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/book" style={{ fontWeight: 600 }} className="desktop-only">Book Now</Link>
              <Link to="/admin" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                <LogIn size={18} /> Admin
              </Link>
            </div>
          </div>
        </nav>

        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
              backdropFilter: 'blur(4px)'
            }}
          />
        )}

        {/* Sidebar Drawer */}
        <aside style={{
          position: 'fixed',
          top: 0,
          left: isSidebarOpen ? 0 : '-300px',
          width: '300px',
          height: '100%',
          backgroundColor: 'var(--bg-card)',
          zIndex: 1001,
          transition: '0.3s ease-in-out',
          padding: '2rem 1.5rem',
          boxShadow: '10px 0 30px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
              <img src="/assets/images/logo.png" alt="NH2 Turf" style={{ height: '32px' }} />
              <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Menu</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              style={{ background: 'none', color: 'var(--text-secondary)' }}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsSidebarOpen(false)}
                style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 500, 
                  color: 'var(--text-primary)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--border-radius)',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Link to="/admin" onClick={() => setIsSidebarOpen(false)} className="btn btn-secondary" style={{ width: '100%' }}>
              Admin Panel
            </Link>
          </div>
        </aside>
        
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>

        <footer style={{ 
          padding: '3rem 0', 
          backgroundColor: 'var(--bg-card)', 
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          marginTop: 'auto'
        }}>
          <div className="container text-center text-muted">
            <p>&copy; {new Date().getFullYear()} NH2 Turf Booking Platform. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none; }
        }
      `}</style>
    </div>
  );
}
