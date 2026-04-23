import React, { useState, useEffect } from 'react';
import { Tag, Save, CheckCircle, Info, ChevronRight } from 'lucide-react';

const FACILITIES = [
  { id: 'f1', name: 'Football / Cricket Turf', type: 'Turf' },
  { id: 'f2', name: 'Cricket Net Practice', type: 'Nets' },
  { id: 'p1', name: 'Pickleball Court 1', type: 'Pickleball' },
  { id: 'p2', name: 'Pickleball Court 2', type: 'Pickleball' },
];

export function Offers() {
  const [facilitiesConfig, setFacilitiesConfig] = useState<any>({});
  const [selectedId, setSelectedId] = useState(FACILITIES[0].id);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedConfig = localStorage.getItem('turf_config_v2');
    if (savedConfig) {
      setFacilitiesConfig(JSON.parse(savedConfig));
    } else {
      // Default config
      const initial: any = {};
      FACILITIES.forEach(f => {
        initial[f.id] = {
          basePrice: f.id === 'f1' ? 1600 : (f.id === 'f2' ? 500 : 800),
          isOfferEnabled: false,
          offerTitle: "Special Discount",
          offerDesc: "Get 10% off this week!"
        };
      });
      setFacilitiesConfig(initial);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('turf_config_v2', JSON.stringify(facilitiesConfig));
    // Backwards compatibility for the booking page (using the old key for football)
    localStorage.setItem('turf_config', JSON.stringify({
      basePrice: facilitiesConfig['f1'].basePrice,
      isBonusTimeEnabled: facilitiesConfig['f1'].isOfferEnabled
    }));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const currentConfig = facilitiesConfig[selectedId] || {};

  const updateConfig = (field: string, value: any) => {
    setFacilitiesConfig({
      ...facilitiesConfig,
      [selectedId]: { ...currentConfig, [field]: value }
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Offers & Pricing</h1>
          <p className="text-secondary">Configure selective offers for different courts and facilities.</p>
        </div>
        <button 
          onClick={handleSave} 
          className="btn btn-primary flex items-center gap-2"
          style={{ padding: '0.75rem 2rem' }}
        >
          {saved ? <CheckCircle size={20} /> : <Save size={20} />}
          {saved ? 'Settings Saved' : 'Save All Changes'}
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left: Facility List */}
        <div className="col-span-4 flex flex-col gap-3">
          {FACILITIES.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedId(f.id)}
              className="card flex items-center justify-between transition-all"
              style={{ 
                padding: '1.25rem',
                border: selectedId === f.id ? '2px solid var(--accent-green)' : '1px solid rgba(255,255,255,0.05)',
                backgroundColor: selectedId === f.id ? 'rgba(0,255,136,0.05)' : 'var(--bg-card)',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <div>
                <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.type}</span>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginTop: '0.25rem' }}>{f.name}</h3>
              </div>
              <ChevronRight size={20} className={selectedId === f.id ? 'text-accent-green' : 'text-muted'} />
            </button>
          ))}
        </div>

        {/* Right: Configuration Form */}
        <div className="col-span-8 flex flex-col gap-6">
          <div className="card" style={{ padding: '2.5rem' }}>
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
              <Tag className="text-accent-green" size={24} />
              <h2 style={{ fontSize: '1.5rem' }}>Settings for {FACILITIES.find(f => f.id === selectedId)?.name}</h2>
            </div>

            <div className="grid grid-cols-2 gap-10">
              {/* Pricing */}
              <div>
                <h3 className="mb-4" style={{ fontSize: '1.125rem', fontWeight: 600 }}>Standard Rate</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-secondary mb-2 block text-sm">Hourly Price (₹)</label>
                    <input 
                      type="number" 
                      value={currentConfig.basePrice || ''}
                      onChange={(e) => updateConfig('basePrice', parseInt(e.target.value))}
                      style={{ fontSize: '1.25rem', fontWeight: 700, padding: '1rem' }}
                    />
                  </div>
                  <p className="text-muted text-xs">
                    * This price will be used as the base for all duration calculations.
                  </p>
                </div>
              </div>

              {/* Offer Toggle */}
              <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex justify-between items-center mb-6">
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Special Offer</h3>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={currentConfig.isOfferEnabled || false}
                      onChange={(e) => updateConfig('isOfferEnabled', e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-secondary mb-2 block text-sm">Offer Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 10% Off"
                      value={currentConfig.offerTitle || ''}
                      onChange={(e) => updateConfig('offerTitle', e.target.value)}
                      disabled={!currentConfig.isOfferEnabled}
                    />
                  </div>
                  <div>
                    <label className="text-secondary mb-2 block text-sm">Description</label>
                    <textarea 
                      rows={2}
                      placeholder="Offer details..."
                      value={currentConfig.offerDesc || ''}
                      onChange={(e) => updateConfig('offerDesc', e.target.value)}
                      disabled={!currentConfig.isOfferEnabled}
                      style={{ 
                        width: '100%', 
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        color: 'white'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {currentConfig.isOfferEnabled && (
              <div className="mt-8 p-4 rounded-lg bg-accent-green/5 border border-accent-green/20 flex items-center gap-3">
                <Info size={20} className="text-accent-green" />
                <p className="text-sm text-accent-green">
                  <strong>Live Preview:</strong> {currentConfig.offerTitle} — {currentConfig.offerDesc}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(255,255,255,0.1);
          transition: .4s;
          border-radius: 34px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 18px; width: 18px;
          left: 3px; bottom: 3px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        input:checked + .slider { background-color: var(--accent-green); }
        input:checked + .slider:before { transform: translateX(26px); }
      `}</style>
    </div>
  );
}
