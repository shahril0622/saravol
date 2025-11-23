import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OpportunityCard from "@/components/OpportunityCard";
import { Heart, Users, Calendar, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-volunteer.jpg";

// Mock data for featured opportunities
const featuredOpportunities = [
  {
    id: "1",
    title: "Beach Cleanup at Damai",
    category: "Environment",
    date: "March 15, 2025",
    location: "Damai Beach, Kuching",
    description: "Join us for a morning of beach cleaning to protect our marine life and keep our beaches beautiful.",
    volunteersNeeded: 20,
    organization: "Green Kuching Initiative",
  },
  {
    id: "2",
    title: "Food Distribution Drive",
    category: "Food Aid",
    date: "March 18, 2025",
    location: "City Centre, Kuching",
    description: "Help distribute meals to families in need across various locations in Kuching.",
    volunteersNeeded: 15,
    organization: "Kuching Food Bank",
  },
  {
    id: "3",
    title: "Animal Shelter Support",
    category: "Animal Welfare",
    date: "March 20, 2025",
    location: "Kuching Animal Shelter",
    description: "Spend time caring for rescued animals - feeding, cleaning, and providing companionship.",
    volunteersNeeded: 10,
    organization: "Sarawak Animal Society",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
              Make a Difference in Kuching
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Connect with meaningful volunteer opportunities and help build a stronger, more caring community together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/browse">
                <Button size="lg" className="w-full sm:w-auto bg-card text-foreground hover:bg-card/90 shadow-hover">
                  Browse Opportunities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-card text-card bg-transparent hover:bg-card/10">
                  Register Your NGO
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2 animate-slide-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-hero mb-4">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">100+</h3>
              <p className="text-muted-foreground">Active Opportunities</p>
            </div>
            <div className="text-center space-y-2 animate-slide-in" style={{ animationDelay: "0.1s" }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-hero mb-4">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">500+</h3>
              <p className="text-muted-foreground">Volunteers Registered</p>
            </div>
            <div className="text-center space-y-2 animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-hero mb-4">
                <Calendar className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">50+</h3>
              <p className="text-muted-foreground">Partner Organizations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Opportunities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start making an impact today. Browse our latest volunteer opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOpportunities.map((opportunity, index) => (
              <div key={opportunity.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <OpportunityCard {...opportunity} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/browse">
              <Button size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-soft">
                View All Opportunities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to Get Involved?
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Whether you're looking to volunteer or represent an organization, we're here to help you make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-card text-foreground hover:bg-card/90">
                  Sign Up as Volunteer
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-card text-card bg-transparent hover:bg-card/10">
                  Register as NGO
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
