# NH2 Turf Management Platform

A premium sports facility management and booking platform.

## 🚀 Features
- **Cinematic UI**: Splash screen animations and hero video backgrounds.
- **Booking Engine**: Multi-slot selection with dynamic price calculation.
- **Offers & Promotions**: Admin-controlled selective offers per facility.
- **Admin Dashboard**: Secure PIN-protected management of bookings, expenses, and settings.

## 🛠️ Tech Stack
- **Frontend**: React + Vite + TypeScript
- **Styling**: Vanilla CSS (Premium Custom Design)
- **Database**: Supabase
- **Icons**: Lucide React

## 📦 Setup & Installation

### 1. Local Environment
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env.local` file in the root directory.
4. Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

### 2. Supabase Configuration
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Create a new project.
3. Open the **SQL Editor**.
4. Copy and paste the contents of `supabase/migrations/schema.sql` and run it to create your tables.

### 3. Run Locally
```bash
npm run dev
```

## 🔐 Admin Access
- **Default Access**: `/admin`
- **Default PIN**: `1234`
