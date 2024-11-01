import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import PrinterRegistration from '@/pages/PrinterRegistration';
import PrintRequest from '@/pages/PrintRequest';
import PrintRequests from '@/pages/PrintRequests';
import PrintRequestDetails from '@/pages/PrintRequestDetails';
import ContactClient from '@/pages/ContactClient';
import MyPrintRequests from '@/pages/MyPrintRequests';
import AdminLogin from '@/pages/admin/Login';
import AdminDashboard from '@/pages/admin/Dashboard';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register-printer" element={<PrinterRegistration />} />
            <Route path="/request-print" element={<PrintRequest />} />
            <Route path="/print-requests" element={<PrintRequests />} />
            <Route path="/print-requests/:id" element={<PrintRequestDetails />} />
            <Route path="/contact-client/:id" element={<ContactClient />} />
            <Route path="/my-requests" element={<MyPrintRequests />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}