import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Upload, ShieldCheck } from 'lucide-react';

export function Payment() {
  const navigate = useNavigate();
  const [refNumber, setRefNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="container flex justify-center items-center" style={{ minHeight: '80vh', padding: '2rem 1rem' }}>
      <div className="card" style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Secure Payment</h2>
        
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '1.5rem', 
          borderRadius: 'var(--border-radius)',
          display: 'inline-block',
          marginBottom: '1.5rem'
        }}>
          {/* Placeholder for QR Code */}
          <QrCode size={200} color="#000" />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Advance Amount: <span className="text-accent-green" style={{ fontWeight: 700 }}>₹500</span></p>
          <p className="text-secondary text-sm">Scan the QR code using any UPI app (GPay, PhonePe, Paytm)</p>
        </div>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>UPI Reference Number (Required)</label>
            <input 
              type="text" 
              placeholder="e.g., 312345678901" 
              value={refNumber}
              onChange={(e) => setRefNumber(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Upload Screenshot (Optional)</label>
            <div style={{ 
              border: '1px dashed rgba(255,255,255,0.2)', 
              borderRadius: 'var(--border-radius)', 
              padding: '1.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: 'rgba(255,255,255,0.02)'
            }}>
              <Upload className="text-secondary mb-2 mx-auto" />
              <span className="text-secondary text-sm">Click to browse or drag & drop</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem' }}
            disabled={!refNumber || isSubmitting}
          >
            {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
          </button>
        </form>

        <p className="text-muted text-sm" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={16} /> Payments are 100% secure and encrypted
        </p>
      </div>
    </div>
  );
}
