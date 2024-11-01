import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Sparkles, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Don't show header in admin routes
  if (isAdminRoute) {
    return null;
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative flex items-center justify-center w-10 h-10">
            <Sparkles className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight">3D Dream Labs</span>
            <span className="text-xs text-muted-foreground block -mt-1">Innovation Unleashed</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex mx-6 items-center space-x-4 lg:space-x-6 flex-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/register-printer">
            <Button variant="outline">Register Printer</Button>
          </Link>
          <Link to="/request-print">
            <Button>Request Print</Button>
          </Link>
          <Link to="/admin/login">
            <Button variant="ghost" size="icon">
              <Shield className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden flex-1 justify-end">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/register-printer"
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    Register Printer
                  </Button>
                </Link>
                <Link
                  to="/request-print"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full">Request Print</Button>
                </Link>
                <Link
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="ghost" className="w-full">
                    <Shield className="mr-2 h-5 w-5" />
                    Admin Login
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}