import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              About KVMP
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connecting hearts and hands to build a stronger Kuching community
            </p>
          </div>

          {/* Mission Section */}
          <Card className="animate-fade-in bg-card border-border shadow-soft" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary flex-shrink-0">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The Kuching Volunteer Matching Portal (KVMP) was created to bridge the gap between passionate volunteers and organizations making a difference in our community. We believe that everyone has something valuable to contribute, and every organization deserves the support they need to achieve their mission.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="animate-fade-in bg-card border-border shadow-soft" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-secondary">
                    <Heart className="h-8 w-8 text-secondary-foreground" fill="currentColor" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground">Community First</h3>
                <p className="text-muted-foreground text-sm">
                  We prioritize the needs of our local Kuching community and work to strengthen bonds between neighbors.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in bg-card border-border shadow-soft" style={{ animationDelay: "0.3s" }}>
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary">
                    <Users className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground">Inclusivity</h3>
                <p className="text-muted-foreground text-sm">
                  Everyone is welcome regardless of background, experience, or skillset. There's a place for everyone to contribute.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in bg-card border-border shadow-soft" style={{ animationDelay: "0.4s" }}>
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-accent">
                    <Sparkles className="h-8 w-8 text-accent-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground">Impact</h3>
                <p className="text-muted-foreground text-sm">
                  We measure success by the positive change created in our community through meaningful volunteer work.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="animate-fade-in bg-card border-border shadow-soft" style={{ animationDelay: "0.5s" }}>
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-bold text-foreground text-center mb-6">How It Works</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Browse Opportunities</h3>
                    <p className="text-muted-foreground text-sm">
                      Explore various volunteer opportunities posted by local NGOs and organizations across different categories.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Sign Up</h3>
                    <p className="text-muted-foreground text-sm">
                      Create a profile and sign up for opportunities that match your interests and availability.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Make an Impact</h3>
                    <p className="text-muted-foreground text-sm">
                      Show up, contribute your time and skills, and be part of positive change in Kuching.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="animate-fade-in bg-secondary border-0" style={{ animationDelay: "0.6s" }}>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-secondary-foreground mb-3">
                Have Questions?
              </h2>
              <p className="text-secondary-foreground/90 mb-6">
                We're here to help! Reach out to us if you need any assistance or have suggestions.
              </p>
              <a 
                href="mailto:contact@kvmp.org"
                className="text-secondary-foreground hover:underline font-medium"
              >
                contact@kvmp.org
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
