import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";

// This would come from a database in a real app
const mockOpportunities: Record<string, any> = {
  "1": {
    title: "Beach Cleanup at Damai",
    category: "Environment",
    date: "March 15, 2025",
    time: "8:00 AM - 12:00 PM",
    location: "Damai Beach, Kuching",
    description: "Join us for a morning of beach cleaning to protect our marine life and keep our beaches beautiful. We'll provide all necessary equipment including gloves, bags, and refreshments. This is a great opportunity to meet like-minded people while making a real difference to our local environment.",
    volunteersNeeded: 20,
    volunteersRegistered: 12,
    organization: "Green Kuching Initiative",
    organizationEmail: "contact@greenkuching.org",
    organizationPhone: "+60 12-345 6789",
    requirements: [
      "No prior experience needed",
      "Wear comfortable clothing and closed shoes",
      "Bring sun protection (hat, sunscreen)",
      "Water will be provided"
    ],
  },
};

const OpportunityDetail = () => {
  const { id } = useParams();
  const opportunity = mockOpportunities[id || ""];

  if (!opportunity) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center flex-1">
          <h1 className="text-2xl font-bold text-foreground mb-4">Opportunity not found</h1>
          <Link to="/browse">
            <Button className="bg-gradient-hero text-primary-foreground hover:opacity-90">
              Browse Opportunities
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSignUp = () => {
    toast.success("Sign up successful! Check your email for confirmation.");
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi! I'm interested in volunteering for: ${opportunity.title}`);
    window.open(`https://wa.me/${opportunity.organizationPhone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <Link to="/browse" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to opportunities
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-fade-in bg-gradient-card border-border">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-accent text-accent-foreground">
                  {opportunity.category}
                </Badge>
                <CardTitle className="text-3xl">{opportunity.title}</CardTitle>
                <CardDescription className="text-base">
                  Organized by {opportunity.organization}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Date & Time</p>
                      <p className="text-sm text-muted-foreground">{opportunity.date}</p>
                      <p className="text-sm text-muted-foreground">{opportunity.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-secondary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">{opportunity.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Volunteers</p>
                      <p className="text-sm text-muted-foreground">
                        {opportunity.volunteersRegistered} / {opportunity.volunteersNeeded} registered
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">About this opportunity</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {opportunity.description}
                  </p>
                </div>

                {opportunity.requirements && (
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {opportunity.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="animate-fade-in sticky top-20 bg-gradient-card border-border" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Join {opportunity.volunteersRegistered} other volunteers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleSignUp}
                  className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-soft"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Sign Up via Email
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  variant="outline"
                  className="w-full border-accent text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact via WhatsApp
                </Button>
                <p className="text-xs text-muted-foreground text-center pt-2">
                  You'll receive confirmation details after signing up
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in bg-gradient-card border-border" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Contact Organizer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-foreground">{opportunity.organization}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Email:</p>
                  <a 
                    href={`mailto:${opportunity.organizationEmail}`}
                    className="text-primary hover:underline break-all"
                  >
                    {opportunity.organizationEmail}
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Phone:</p>
                  <a 
                    href={`tel:${opportunity.organizationPhone}`}
                    className="text-primary hover:underline"
                  >
                    {opportunity.organizationPhone}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OpportunityDetail;
