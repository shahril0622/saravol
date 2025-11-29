import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GrantMatchingForm, { EventFormData } from "@/components/GrantMatchingForm";
import GrantResults from "@/components/GrantResults";
import { mockGrants, Grant } from "@/data/mockGrants";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MatchedGrant extends Grant {
  matchScore: number;
}

const GrantPlanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [matchedGrants, setMatchedGrants] = useState<MatchedGrant[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const calculateMatchScore = (grant: Grant, formData: EventFormData): number => {
    let score = 0;
    const causeArea = formData.causeArea.toLowerCase();
    const objectives = formData.objectives.toLowerCase();
    const beneficiaries = formData.targetBeneficiaries.toLowerCase();
    const budget = parseInt(formData.estimatedBudget) || 0;

    // Category match (up to 40 points)
    const categoryMatch = grant.category.some(
      (cat) => cat.toLowerCase().includes(causeArea) || causeArea.includes(cat.toLowerCase())
    );
    if (categoryMatch) score += 40;

    // Keyword matching (up to 30 points)
    const allText = `${causeArea} ${objectives} ${beneficiaries}`;
    const matchedKeywords = grant.keywords.filter((keyword) =>
      allText.includes(keyword.toLowerCase())
    );
    score += Math.min(matchedKeywords.length * 6, 30);

    // Budget alignment (up to 20 points)
    if (budget >= grant.fundingMin && budget <= grant.fundingMax) {
      score += 20;
    } else if (budget < grant.fundingMin && budget >= grant.fundingMin * 0.5) {
      score += 10;
    } else if (budget > grant.fundingMax && budget <= grant.fundingMax * 1.5) {
      score += 10;
    }

    // Random variance for realism (up to 10 points)
    score += Math.floor(Math.random() * 11);

    return Math.min(score, 100);
  };

  const handleFormSubmit = async (formData: EventFormData) => {
    setIsLoading(true);
    setHasSearched(true);

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Calculate match scores for all grants
    const scoredGrants: MatchedGrant[] = mockGrants
      .map((grant) => ({
        ...grant,
        matchScore: calculateMatchScore(grant, formData),
      }))
      .filter((grant) => grant.matchScore >= 30) // Only show relevant matches
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6); // Top 6 matches

    setMatchedGrants(scoredGrants);
    setIsLoading(false);
  };

  const handleReset = () => {
    setMatchedGrants(null);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/ngo/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                AI Grant Matching
              </h1>
              <p className="text-muted-foreground mt-1">
                Plan your future events and discover matching grant opportunities
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary animate-pulse" />
            </div>
            <p className="mt-6 text-lg font-medium text-foreground">
              Analyzing grant opportunities…
            </p>
            <p className="text-muted-foreground mt-2">
              Matching your event with available funding sources
            </p>
          </div>
        ) : hasSearched && matchedGrants ? (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button variant="outline" onClick={handleReset}>
                Plan Another Event
              </Button>
            </div>
            <GrantResults grants={matchedGrants} />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <GrantMatchingForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GrantPlanner;
