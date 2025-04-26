import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import BookingConfirmation from './pages/BookingConfirmation';
import AdminDashboard from './pages/AdminDashboard';
import PaymentFeedback from './pages/PaymentFeedback';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Services from './pages/Services';

// Components
import Chatbot from './components/Chatbot';

// Context
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/payment-feedback" element={<PaymentFeedback />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/*" element={<Services />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Chatbot />
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;