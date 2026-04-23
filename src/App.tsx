import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import { UserLayout } from './components/layout/UserLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// User Pages
import { Home } from './pages/user/Home';
import { Booking } from './pages/user/Booking';
import { Payment } from './pages/user/Payment';
import { Dashboard as UserDashboard } from './pages/user/Dashboard';
import { Blog } from './pages/user/Blog';
import { Gallery } from './pages/user/Gallery';
import { Services } from './pages/user/Services';
import { Contacts } from './pages/user/Contacts';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { BookingManagement } from './pages/admin/BookingManagement';
import { CalendarView } from './pages/admin/CalendarView';
import { ExpenseTracker } from './pages/admin/ExpenseTracker';
import { Settings } from './pages/admin/Settings';
import { Offers } from './pages/admin/Offers';
import { AuditLogs } from './pages/admin/AuditLogs';
import { AdminLogin } from './pages/admin/AdminLogin';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('admin_auth') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="book" element={<Booking />} />
          <Route path="payment" element={<Payment />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="blog" element={<Blog />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="services" element={<Services />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="expenses" element={<ExpenseTracker />} />
          <Route path="offers" element={<Offers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="audit-logs" element={<AuditLogs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
