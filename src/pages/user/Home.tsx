import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Star, Play } from 'lucide-react';

/**
 * HERO VIDEO CONFIGURATION
 * Local: /hero-video.mp4
 */
const HERO_VIDEO_URL = "/hero-video.mp4";

export function Home() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const savedConfig = localStorage.getItem('turf_config_v2');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const getPrice = (id: string, defaultPrice: number) => {
    return config?.[id]?.basePrice || defaultPrice;
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        minHeight: '85vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        backgroundColor: '#000'
      }}>
        {/* Background Video */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.7
            }}
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
        </div>
        
        {/* Subtle Bottom Shadow Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '30%',
          background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 100%)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/book" className="btn btn-primary" style={{ fontSize: '1.25rem', padding: '1rem 2.5rem', boxShadow: '0 10px 30px rgba(0, 255, 136, 0.3)' }}>
            Book Your Slot <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      {/* New Intro Section below the video */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-dark)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              backgroundColor: 'rgba(0, 255, 136, 0.05)', 
              padding: '0.5rem 1rem', 
              borderRadius: '99px', 
              marginBottom: '1.5rem', 
              border: '1px solid rgba(0, 255, 136, 0.1)'
            }}>
              <Star size={16} className="text-accent-green" />
              <span className="text-accent-green" style={{ fontSize: '0.875rem', fontWeight: 600 }}>PREMIUM TURF EXPERIENCE</span>
            </div>
            
            <h1 style={{ 
              fontSize: '4rem', 
              lineHeight: 1, 
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
              fontWeight: 800
            }}>
              Elevate Your Game <br/>
              <span className="text-accent-green">Book Instantly</span>
            </h1>
            
            <p style={{ 
              fontSize: '1.5rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              lineHeight: 1.4
            }}>
              Professional Turf for Cricket, Football & Pickleball. Experience the best playing surface in the city.
            </p>

            <div className="flex gap-4 mt-8">
              <Link to="/gallery" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>
                View Gallery
              </Link>
              <div className="flex items-center gap-2 text-secondary" style={{ fontSize: '0.875rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play size={14} fill="currentColor" />
                </div>
                <span>WATCH THE ACTION ABOVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our World-Class Facilities</h2>
            <p className="text-secondary" style={{ fontSize: '1.25rem' }}>Choose your sport and start playing.</p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {[
              { id: 'f1', title: 'Football / Cricket Turf', price: `₹${getPrice('f1', 1600)}/hr`, img: 'https://images.unsplash.com/photo-1518605368461-1e1e111e1f57?auto=format&fit=crop&q=80&w=800' },
              { id: 'f2', title: 'Cricket Net Practice', price: `₹${getPrice('f2', 500)}/hr`, img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800' },
              { id: 'p1', title: 'Pickleball Court', price: `₹${getPrice('p1', 800)}/hr`, img: 'https://images.unsplash.com/photo-1616168593309-844fb25cbb12?auto=format&fit=crop&q=80&w=800' }
            ].map((facility, i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', transform: 'translateY(0)', transition: '0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')} onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
                <img src={facility.img} alt={facility.title} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{facility.title}</h3>
                  <p className="text-accent-green" style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '2rem' }}>{facility.price}</p>
                  <Link to="/book" className="btn btn-secondary text-center" style={{ marginTop: 'auto', width: '100%', padding: '1rem' }}>
                    Select Slot
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tournaments Section */}
      <section style={{ padding: '6rem 0', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="container">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>Exclusive Tournaments <br/>& Offers</h2>
              <p className="text-secondary" style={{ fontSize: '1.25rem', marginBottom: '2.5rem' }}>
                Experience the thrill of competition. Join our leagues or host your own corporate events.
              </p>
              <div className="flex flex-col gap-6">
                <div className="card flex items-center gap-6" style={{ backgroundColor: 'rgba(0, 255, 136, 0.05)', borderColor: 'rgba(0, 255, 136, 0.2)', padding: '2rem' }}>
                  <Trophy className="text-accent-green" size={40} />
                  <div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Weekend Football League</h4>
                    <p className="text-secondary">Register your team by Friday. ₹10,000 Prize Pool.</p>
                  </div>
                </div>
                <div className="card flex items-center gap-6" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)', borderColor: 'rgba(0, 191, 255, 0.2)', padding: '2rem' }}>
                  <Star className="text-accent-blue" size={40} />
                  <div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Early Bird Discount</h4>
                    <p className="text-secondary">Book between 6 AM - 9 AM and get 20% off.</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=600" alt="Gallery 1" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: 'var(--border-radius)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }} />
              <img src="https://images.unsplash.com/photo-1519315901367-f34f9c240951?auto=format&fit=crop&q=80&w=600" alt="Gallery 2" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: 'var(--border-radius)', marginTop: '4rem', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
