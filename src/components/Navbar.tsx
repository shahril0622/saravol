import { Button } from "@/components/ui/button";
import { Heart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-6 w-6 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-foreground">KVMP</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/browse" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Browse Opportunities
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About
            </Link>
            <div className="flex items-center gap-3 ml-4">
              <Link to="/login">
                <Button variant="outline" className="border-primary text-foreground hover:bg-primary hover:text-primary-foreground">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in">
            <Link 
              to="/browse" 
              className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Opportunities
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-3 space-y-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full border-primary text-foreground hover:bg-primary hover:text-primary-foreground">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
