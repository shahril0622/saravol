import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OpportunityCard from "@/components/OpportunityCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

// Mock data
const mockOpportunities = [
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
  {
    id: "4",
    title: "Community Sports Day",
    category: "Events",
    date: "March 22, 2025",
    location: "Padang Merdeka, Kuching",
    description: "Help organize and run a fun sports day for local communities. Great for energetic volunteers!",
    volunteersNeeded: 25,
    organization: "Kuching Sports Club",
  },
  {
    id: "5",
    title: "Tree Planting Campaign",
    category: "Environment",
    date: "March 25, 2025",
    location: "Santubong Area",
    description: "Join our reforestation effort to plant native trees and restore natural habitats.",
    volunteersNeeded: 30,
    organization: "Green Kuching Initiative",
  },
  {
    id: "6",
    title: "Elderly Care Visit",
    category: "Events",
    date: "March 28, 2025",
    location: "Kuching Senior Center",
    description: "Spend quality time with elderly residents - chat, play games, and bring joy to their day.",
    volunteersNeeded: 12,
    organization: "Silver Years Foundation",
  },
];

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredOpportunities = mockOpportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || opp.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesLocation = !locationFilter || opp.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-1">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Volunteer Opportunities
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect opportunity to make a difference in your community
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-card border-border">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="food aid">Food Aid</SelectItem>
                <SelectItem value="animal welfare">Animal Welfare</SelectItem>
                <SelectItem value="events">Events</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-card border-border"
            />
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredOpportunities.length} {filteredOpportunities.length === 1 ? 'opportunity' : 'opportunities'}
          </p>
        </div>

        {/* Opportunities Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity, index) => (
              <div key={opportunity.id} style={{ animationDelay: `${index * 0.05}s` }}>
                <OpportunityCard {...opportunity} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-xl text-muted-foreground mb-4">No opportunities found</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setLocationFilter("");
              }}
              className="text-primary hover:underline font-medium"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Browse;
