import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { mockOpportunities } from "@/data/mockOpportunities";

const OpportunityDetail = () => {
  const { id } = useParams();
  const opportunity = mockOpportunities.find(opp => opp.id === id);

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

  const spotsLeft = opportunity.volunteersNeeded - (opportunity.volunteersRegistered || 0);

  const handleSignUp = () => {
    if (opportunity.organizationEmail) {
      const subject = encodeURIComponent(`Volunteer Sign Up: ${opportunity.title}`);
      const body = encodeURIComponent(`Hi,\n\nI would like to sign up as a volunteer for "${opportunity.title}" on ${format(parseISO(opportunity.date), "MMMM d, yyyy")}.\n\nPlease let me know the next steps.\n\nThank you!`);
      window.open(`mailto:${opportunity.organizationEmail}?subject=${subject}&body=${body}`, '_blank');
      toast.success("Opening your email client...");
    } else {
      toast.error("Email contact not available for this opportunity");
    }
  };

  const handleWhatsApp = () => {
    if (opportunity.organizationPhone) {
      const message = encodeURIComponent(`Hi! I'm interested in volunteering for: ${opportunity.title} on ${format(parseISO(opportunity.date), "MMMM d, yyyy")}. Could you share more details?`);
      const phone = opportunity.organizationPhone.replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
      toast.success("Opening WhatsApp...");
    } else {
      toast.error("WhatsApp contact not available for this opportunity");
    }
  };

  const showEmailButton = opportunity.contactPreference === "email" || opportunity.contactPreference === "both" || !opportunity.contactPreference;
  const showWhatsAppButton = opportunity.contactPreference === "whatsapp" || opportunity.contactPreference === "both";

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
                      <p className="text-sm text-muted-foreground">{format(parseISO(opportunity.date), "MMMM d, yyyy")}</p>
                      {opportunity.time && (
                        <p className="text-sm text-muted-foreground">{opportunity.time}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-secondary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">{opportunity.location}</p>
                      <p className="text-sm text-muted-foreground">{opportunity.region}, Sarawak</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Volunteers</p>
                      <p className="text-sm text-muted-foreground">
                        {opportunity.volunteersRegistered || 0} / {opportunity.volunteersNeeded} registered
                      </p>
                      <p className={`text-sm font-medium ${spotsLeft <= 5 ? 'text-destructive' : 'text-primary'}`}>
                        {spotsLeft} spots left
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

                {opportunity.requirements && opportunity.requirements.length > 0 && (
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
                  {spotsLeft > 0 
                    ? `${spotsLeft} spots remaining` 
                    : "This opportunity is full"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {showEmailButton && (
                  <Button 
                    onClick={handleSignUp}
                    className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-soft"
                    disabled={spotsLeft <= 0}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Sign Up via Email
                  </Button>
                )}
                {showWhatsAppButton && (
                  <Button 
                    onClick={handleWhatsApp}
                    variant="outline"
                    className="w-full border-accent text-foreground hover:bg-accent hover:text-accent-foreground"
                    disabled={spotsLeft <= 0}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact via WhatsApp
                  </Button>
                )}
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
                {opportunity.organizationEmail && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Email:</p>
                    <a 
                      href={`mailto:${opportunity.organizationEmail}`}
                      className="text-primary hover:underline break-all"
                    >
                      {opportunity.organizationEmail}
                    </a>
                  </div>
                )}
                {opportunity.organizationPhone && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Phone/WhatsApp:</p>
                    <a 
                      href={`tel:${opportunity.organizationPhone}`}
                      className="text-primary hover:underline"
                    >
                      {opportunity.organizationPhone}
                    </a>
                  </div>
                )}
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
