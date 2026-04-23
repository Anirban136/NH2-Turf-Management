import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, Tag, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const FACILITIES = [
  { id: 'f1', name: 'Football / Cricket Turf' },
  { id: 'f2', name: 'Cricket Net Practice' },
  { id: 'p1', name: 'Pickleball Court 1' },
  { id: 'p2', name: 'Pickleball Court 2' },
];

const GENERATE_SLOTS = () => {
  const slots = [];
  let startHour = 6; // 6 AM
  for (let i = 0; i < 30; i++) {
    const hour = Math.floor(startHour + i / 2);
    const mins = i % 2 === 0 ? '00' : '30';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    const timeString = `${displayHour}:${mins} ${ampm}`;
    
    // Random status for demo
    const rand = Math.random();
    let status = 'available';
    if (rand < 0.2) status = 'booked';
    else if (rand < 0.3) status = 'processing';

    slots.push({ id: `slot-${i}`, time: timeString, status, index: i });
  }
  return slots;
};

export function Booking() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [slots] = useState(GENERATE_SLOTS());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState('f1');
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    
    // Define standard defaults
    const defaults: any = {};
    FACILITIES.forEach(f => {
      defaults[f.id] = {
        basePrice: f.id === 'f1' ? 1600 : (f.id === 'f2' ? 500 : 800),
        isOfferEnabled: false,
        offerTitle: "",
        offerDesc: ""
      };
    });

    try {
      const { data, error } = await supabase
        .from('turf_config')
        .select('*');

      if (error) throw error;

      if (data && data.length > 0) {
        const configMap: any = { ...defaults };
        data.forEach((item: any) => {
          configMap[item.id] = {
            basePrice: item.base_price,
            isOfferEnabled: item.is_offer_enabled,
            offerTitle: item.offer_title,
            offerDesc: item.offer_desc
          };
        });
        setConfig(configMap);
      } else {
        setConfig(defaults);
      }
    } catch (err: any) {
      console.error('Error fetching config from Supabase:', err);
      // Fallback to local storage if available
      const local = localStorage.getItem('turf_config_v2');
      if (local) {
        setConfig(JSON.parse(local));
      } else {
        setConfig(defaults);
      }
    } finally {
      setLoading(false);
    }
  };

  const currentFacilityConfig = config?.[selectedId] || { basePrice: 1600, isOfferEnabled: false };

  const handleSlotClick = (slot: any) => {
    if (slot.status !== 'available') return;
    
    if (selectedSlots.includes(slot.id)) {
      setSelectedSlots(selectedSlots.filter(id => id !== slot.id));
    } else {
      setSelectedSlots([...selectedSlots, slot.id]);
    }
  };

  const calculateTotalPrice = () => {
    const numSlots = selectedSlots.length;
    if (numSlots === 0) return 0;

    const pricePerSlot = currentFacilityConfig.basePrice / 2;
    let total = numSlots * pricePerSlot;

    // Special logic for "Buy 1h, Get 30m Free"
    const isBonusTimeOffer = currentFacilityConfig.offerTitle?.toLowerCase().includes('30m free') || currentFacilityConfig.offerTitle?.toLowerCase().includes('30 min free');
    
    if (currentFacilityConfig.isOfferEnabled && isBonusTimeOffer && numSlots >= 3) {
      total -= pricePerSlot;
    }

    return total;
  };

  const getSlotStyle = (slot: any) => {
    if (selectedSlots.includes(slot.id)) {
      return { backgroundColor: 'var(--accent-green)', color: '#000', borderColor: 'var(--accent-green)', fontWeight: 700 };
    }
    switch (slot.status) {
      case 'available': return { backgroundColor: 'transparent', color: 'var(--text-primary)', borderColor: 'rgba(255,255,255,0.2)' };
      case 'booked': return { backgroundColor: 'rgba(231, 76, 60, 0.1)', color: 'var(--status-error)', borderColor: 'rgba(231, 76, 60, 0.3)', cursor: 'not-allowed', opacity: 0.6 };
      case 'processing': return { backgroundColor: 'rgba(241, 196, 15, 0.1)', color: 'var(--status-pending)', borderColor: 'rgba(241, 196, 15, 0.3)', cursor: 'not-allowed', opacity: 0.8 };
      default: return {};
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="animate-spin text-accent-green" size={40} />
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Book your Turf</h1>
      
      <div className="grid grid-cols-2 gap-8" style={{ alignItems: 'flex-start' }}>
        
        {/* Left Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Select Facility</label>
            <select 
              value={selectedId} 
              onChange={(e) => {
                setSelectedId(e.target.value);
                setSelectedSlots([]);
              }}
            >
              {FACILITIES.map(f => (
                <option key={f.id} value={f.id}>
                  {f.name} - ₹{config?.[f.id]?.basePrice || '...'}/hr
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Select Date</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <CalendarIcon size={20} className="text-secondary" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {currentFacilityConfig.isOfferEnabled && (
            <div style={{ padding: '1rem', backgroundColor: 'rgba(0, 255, 136, 0.05)', borderRadius: 'var(--border-radius)', border: '1px solid rgba(0, 255, 136, 0.2)' }}>
              <h4 className="text-accent-green" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Tag size={18} /> {currentFacilityConfig.offerTitle.toUpperCase()}
              </h4>
              <p className="text-sm">{currentFacilityConfig.offerDesc}</p>
            </div>
          )}

          {/* Summary Box */}
          <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Booking Summary</h3>
            <div className="flex justify-between mb-2">
              <span className="text-secondary">Selected Slots</span>
              <span>{selectedSlots.length} ({selectedSlots.length * 30} mins)</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-secondary">Rate per Hour</span>
              <span>₹{currentFacilityConfig.basePrice}</span>
            </div>
            
            {currentFacilityConfig.isOfferEnabled && selectedSlots.length >= 3 && currentFacilityConfig.offerTitle?.toLowerCase().includes('30m free') && (
              <div className="flex justify-between mb-2 text-accent-green">
                <span>Bonus Time Discount</span>
                <span>- ₹{currentFacilityConfig.basePrice / 2}</span>
              </div>
            )}

            <div className="flex justify-between mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Total Payable</span>
              <span className="text-accent-green" style={{ fontSize: '1.25rem', fontWeight: 800 }}>₹{calculateTotalPrice()}</span>
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem' }}
              disabled={selectedSlots.length === 0}
              onClick={() => navigate('/payment')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

        {/* Right Panel - Time Slots */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} className="text-accent-green" /> 
              Select Slots (30 min each)
            </h3>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', 
            gap: '0.75rem',
            maxHeight: '500px',
            overflowY: 'auto',
            paddingRight: '0.5rem'
          }}>
            {slots.map(slot => (
              <div 
                key={slot.id}
                onClick={() => handleSlotClick(slot)}
                style={{
                  padding: '0.75rem 0.5rem',
                  textAlign: 'center',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: slot.status === 'available' ? 'pointer' : 'not-allowed',
                  transition: 'var(--transition)',
                  ...getSlotStyle(slot)
                }}
              >
                {slot.time}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
