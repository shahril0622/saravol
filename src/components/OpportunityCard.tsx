import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface OpportunityCardProps {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  volunteersNeeded: number;
  organization: string;
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "animal welfare": "bg-accent text-accent-foreground",
    "food aid": "bg-secondary text-secondary-foreground",
    "environment": "bg-accent text-accent-foreground",
    "events": "bg-primary text-primary-foreground",
  };
  return colors[category.toLowerCase()] || "bg-muted text-muted-foreground";
};

const OpportunityCard = ({
  id,
  title,
  category,
  date,
  location,
  description,
  volunteersNeeded,
  organization,
}: OpportunityCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-hover animate-fade-in bg-gradient-card border-border">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge className={getCategoryColor(category)}>
            {category}
          </Badge>
          <span className="text-sm text-muted-foreground">{organization}</span>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-secondary" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 text-accent" />
            <span>{volunteersNeeded} volunteers needed</span>
          </div>
        </div>
        <Link to={`/opportunity/${id}`}>
          <Button className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;
