import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { SARAWAK_REGIONS, OPPORTUNITY_CATEGORIES } from "@/data/sarawakRegions";
import { Link } from "react-router-dom";

const PostOpportunity = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    region: "",
    date: undefined as Date | undefined,
    time: "",
    description: "",
    volunteersNeeded: "",
    requirements: "",
    contactPreference: "both",
    organizationEmail: "",
    organizationPhone: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.category || !formData.region || !formData.date || !formData.description || !formData.volunteersNeeded) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.contactPreference === "email" || formData.contactPreference === "both") {
      if (!formData.organizationEmail) {
        toast.error("Please provide an email address");
        return;
      }
    }

    if (formData.contactPreference === "whatsapp" || formData.contactPreference === "both") {
      if (!formData.organizationPhone) {
        toast.error("Please provide a phone number for WhatsApp");
        return;
      }
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Opportunity posted successfully!");
      navigate("/ngo/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1 max-w-3xl">
        <Link to="/ngo/dashboard" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-2xl">Post New Opportunity</CardTitle>
            <CardDescription>
              Create a new volunteer opportunity for your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Opportunity Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Beach Cleanup at Damai"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="bg-card border-border"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="bg-card border-border">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {OPPORTUNITY_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="volunteersNeeded">Volunteers Needed *</Label>
                    <Input
                      id="volunteersNeeded"
                      type="number"
                      min="1"
                      placeholder="e.g., 20"
                      value={formData.volunteersNeeded}
                      onChange={(e) => handleInputChange("volunteersNeeded", e.target.value)}
                      className="bg-card border-border"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Time */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Location & Time</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="region">Region *</Label>
                    <Select value={formData.region} onValueChange={(value) => handleInputChange("region", value)}>
                      <SelectTrigger className="bg-card border-border">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {SARAWAK_REGIONS.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Specific Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Damai Beach"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="bg-card border-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-card border-border",
                            !formData.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => setFormData(prev => ({ ...prev, date }))}
                          initialFocus
                          disabled={(date) => date < new Date()}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      placeholder="e.g., 8:00 AM - 12:00 PM"
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                      className="bg-card border-border"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the volunteer opportunity, what volunteers will be doing, and the impact they'll make..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-card border-border min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements (Optional)</Label>
                  <Textarea
                    id="requirements"
                    placeholder="List any requirements or things volunteers should bring (one per line)"
                    value={formData.requirements}
                    onChange={(e) => handleInputChange("requirements", e.target.value)}
                    className="bg-card border-border"
                  />
                </div>
              </div>

              {/* Contact Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Contact Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  How would you like volunteers to contact you?
                </p>
                
                <RadioGroup
                  value={formData.contactPreference}
                  onValueChange={(value) => handleInputChange("contactPreference", value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email-only" />
                    <Label htmlFor="email-only" className="font-normal">Email only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="whatsapp" id="whatsapp-only" />
                    <Label htmlFor="whatsapp-only" className="font-normal">WhatsApp only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both" className="font-normal">Both email and WhatsApp</Label>
                  </div>
                </RadioGroup>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(formData.contactPreference === "email" || formData.contactPreference === "both") && (
                    <div className="space-y-2">
                      <Label htmlFor="organizationEmail">Contact Email *</Label>
                      <Input
                        id="organizationEmail"
                        type="email"
                        placeholder="contact@yourorganization.org"
                        value={formData.organizationEmail}
                        onChange={(e) => handleInputChange("organizationEmail", e.target.value)}
                        className="bg-card border-border"
                      />
                    </div>
                  )}

                  {(formData.contactPreference === "whatsapp" || formData.contactPreference === "both") && (
                    <div className="space-y-2">
                      <Label htmlFor="organizationPhone">WhatsApp Number *</Label>
                      <Input
                        id="organizationPhone"
                        type="tel"
                        placeholder="+60123456789"
                        value={formData.organizationPhone}
                        onChange={(e) => handleInputChange("organizationPhone", e.target.value)}
                        className="bg-card border-border"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/ngo/dashboard")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-hero text-primary-foreground hover:opacity-90"
                >
                  {isSubmitting ? "Posting..." : "Post Opportunity"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default PostOpportunity;
