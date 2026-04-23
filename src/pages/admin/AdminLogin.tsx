import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck, Trophy } from 'lucide-react';

export function AdminLogin() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') { // Default PIN
      localStorage.setItem('admin_auth', 'true');
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#0a0a0a',
      background: 'radial-gradient(circle at center, rgba(0, 255, 136, 0.05) 0%, transparent 70%)'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '3rem' }}>
        <div className="text-center mb-8">
          <div style={{ 
            width: '64px', 
            height: '64px', 
            backgroundColor: 'rgba(0, 255, 136, 0.1)', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            border: '1px solid rgba(0, 255, 136, 0.2)'
          }}>
            <Trophy className="text-accent-green" size={32} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Admin Access</h1>
          <p className="text-secondary">Enter your PIN to continue</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div style={{ position: 'relative' }}>
            <input 
              type="password" 
              placeholder="Enter Admin PIN" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className={error ? 'border-error' : ''}
              style={{ 
                textAlign: 'center', 
                fontSize: '1.5rem', 
                letterSpacing: '0.5rem',
                paddingLeft: '3rem',
                paddingRight: '3rem',
                height: '60px'
              }}
              autoFocus
            />
            <Lock size={20} className="text-secondary" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          {error && (
            <p className="text-status-error text-center" style={{ fontSize: '0.875rem' }}>
              Invalid Access PIN. Please try again.
            </p>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}>
            Login to Dashboard <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-muted" style={{ fontSize: '0.75rem' }}>
          <ShieldCheck size={14} />
          <span>SECURE ADMINISTRATIVE PORTAL</span>
        </div>
      </div>

      <style>{`
        .border-error {
          border-color: var(--status-error) !important;
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
}
