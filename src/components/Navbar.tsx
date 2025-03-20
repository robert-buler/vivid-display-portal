
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center space-x-2">
            <span className="h-8 w-8 rounded-full bg-primary"></span>
            <span className="text-xl font-bold">NetSaas</span>
          </a>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </a>
          <a href="#product" className="text-sm font-medium transition-colors hover:text-primary">
            Product
          </a>
          <a href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
            Pricing
          </a>
          <a href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
            Testimonials
          </a>
          <a href="/docs" className="text-sm font-medium transition-colors hover:text-primary">
            Documentation
          </a>
          <Button variant="outline" size="sm" className="ml-4" onClick={() => window.location.href="/login"}>
            Log in
          </Button>
          <Button size="sm" onClick={() => window.location.href="/signup"}>
            Sign up
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-b">
          <nav className="flex flex-col space-y-4">
            <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </a>
            <a href="#product" className="text-sm font-medium transition-colors hover:text-primary">
              Product
            </a>
            <a href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Testimonials
            </a>
            <a href="/docs" className="text-sm font-medium transition-colors hover:text-primary">
              Documentation
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => window.location.href="/login"}>
                Log in
              </Button>
              <Button size="sm" onClick={() => window.location.href="/signup"}>
                Sign up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
