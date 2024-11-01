import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-primary-400" strokeWidth={1.5} />
              <div>
                <span className="font-bold text-xl">3D Dream Labs</span>
                <span className="text-xs text-primary-400 block -mt-1">Innovation Unleashed</span>
              </div>
            </Link>
            <p className="text-primary-200">
              South Africa's premier network connecting 3D printer owners with people who need printing services.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-primary-400">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary-400">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary-400">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary-400">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-primary-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-primary-200 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-200 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/register-printer" className="text-primary-200 hover:text-white transition-colors">
                  Register Printer
                </Link>
              </li>
              <li>
                <Link to="/request-print" className="text-primary-200 hover:text-white transition-colors">
                  Request Print
                </Link>
              </li>
              <li>
                <Link to="/print-requests" className="text-primary-200 hover:text-white transition-colors">
                  View Print Requests
                </Link>
              </li>
              <li>
                <Link to="/my-requests" className="text-primary-200 hover:text-white transition-colors">
                  My Print Requests
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-primary-200">contact@3ddreamlabs.co.za</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-primary-200">+27 (0) 87 123 4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-1" />
                <span className="text-primary-200">
                  123 Print Street<br />
                  Cape Town, 8001<br />
                  South Africa
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <p className="text-primary-200 text-sm">
              &copy; {new Date().getFullYear()} 3D Dream Labs. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 md:justify-end text-sm text-primary-200">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/faq" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}