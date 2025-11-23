import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Registration successful! Please check your email.");
    }, 1500);
  };

  const handleNgoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Registration successful! We'll review your application.");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-1 flex items-center justify-center">
        <Card className="w-full max-w-2xl animate-fade-in bg-gradient-card border-border shadow-soft">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-hero">
                <Heart className="h-8 w-8 text-primary-foreground" fill="currentColor" />
              </div>
            </div>
            <CardTitle className="text-2xl">Join KVMP</CardTitle>
            <CardDescription>
              Create your account to start making a difference
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="volunteer" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
                <TabsTrigger value="ngo">NGO / Organization</TabsTrigger>
              </TabsList>
              
              <TabsContent value="volunteer">
                <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="v-name">Full Name</Label>
                      <Input
                        id="v-name"
                        type="text"
                        placeholder="John Doe"
                        required
                        className="bg-background border-border"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="v-email">Email</Label>
                      <Input
                        id="v-email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="v-phone">Phone Number</Label>
                    <Input
                      id="v-phone"
                      type="tel"
                      placeholder="+60 12-345 6789"
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="v-password">Password</Label>
                    <Input
                      id="v-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="v-skills">Skills / Interests (Optional)</Label>
                    <Input
                      id="v-skills"
                      type="text"
                      placeholder="e.g., Teaching, Photography, Environmental Care"
                      className="bg-background border-border"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-soft"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Volunteer Account"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="ngo">
                <form onSubmit={handleNgoSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="n-org">Organization Name</Label>
                    <Input
                      id="n-org"
                      type="text"
                      placeholder="Green Kuching Initiative"
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="n-contact">Contact Person</Label>
                      <Input
                        id="n-contact"
                        type="text"
                        placeholder="Jane Smith"
                        required
                        className="bg-background border-border"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="n-email">Email</Label>
                      <Input
                        id="n-email"
                        type="email"
                        placeholder="contact@organization.org"
                        required
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="n-phone">Phone Number</Label>
                    <Input
                      id="n-phone"
                      type="tel"
                      placeholder="+60 12-345 6789"
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="n-password">Password</Label>
                    <Input
                      id="n-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="n-description">Organization Description</Label>
                    <Input
                      id="n-description"
                      type="text"
                      placeholder="Brief description of your organization"
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-soft"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Register Organization"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
