import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { Grant } from "@/data/mockGrants";
import { toast } from "sonner";

interface MatchedGrant extends Grant {
  matchScore: number;
}

interface GrantResultsProps {
  grants: MatchedGrant[];
}

const GrantResults = ({ grants }: GrantResultsProps) => {
  const handleSaveGrant = (grantName: string) => {
    toast.success(`"${grantName}" saved to your list!`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500/10 text-green-600 border-green-500/20";
    if (score >= 60) return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    return "bg-orange-500/10 text-orange-600 border-orange-500/20";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-MY", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (grants.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No matching grants found.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your event details or cause area.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recommended Grants</h2>
        <Badge variant="secondary">{grants.length} matches found</Badge>
      </div>

      <div className="grid gap-4">
        {grants.map((grant) => (
          <Card key={grant.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg">{grant.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {grant.organization}
                  </CardDescription>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${getScoreColor(grant.matchScore)}`}>
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-semibold">{grant.matchScore}%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {grant.category.map((cat) => (
                  <Badge key={cat} variant="outline">
                    {cat}
                  </Badge>
                ))}
              </div>

              <p className="text-sm text-muted-foreground">{grant.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span>
                    {formatCurrency(grant.fundingMin)} - {formatCurrency(grant.fundingMax)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Deadline: {formatDate(grant.deadline)}</span>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm">
                  <span className="font-medium">Eligibility:</span>{" "}
                  <span className="text-muted-foreground">{grant.eligibility}</span>
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSaveGrant(grant.name)}
                  className="flex-1"
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save This Grant
                </Button>
                <Button size="sm" className="flex-1">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GrantResults;
