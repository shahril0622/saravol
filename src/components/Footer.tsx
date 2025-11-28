import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-hero">
                <Heart className="h-6 w-6 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-foreground">SaraVol</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting volunteers with opportunities to make a difference in Kuching.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Volunteers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/browse" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Opportunities
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Organizations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">
                  Register Your NGO
                </Link>
              </li>
              <li>
                <Link to="/ngo/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Post Opportunities
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Kuching Volunteer Matching Portal. Built with ❤️ for the community.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
