-- Create Facilities/Offers Table
CREATE TABLE IF NOT EXISTS public.turf_config (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    base_price INTEGER NOT NULL DEFAULT 1600,
    is_offer_enabled BOOLEAN DEFAULT FALSE,
    offer_title TEXT,
    offer_desc TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id TEXT NOT NULL,
    customer_name TEXT,
    date DATE NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    total_price INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Expenses Table
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,
    amount INTEGER NOT NULL,
    description TEXT,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.turf_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Simple public access policy (for dev, you should restrict this later)
CREATE POLICY "Public Read Access" ON public.turf_config FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.bookings FOR ALL USING (true);
CREATE POLICY "Public Read Access" ON public.expenses FOR ALL USING (true);
