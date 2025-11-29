import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { causeAreas } from "@/data/mockGrants";
import { SARAWAK_REGIONS } from "@/data/sarawakRegions";

export interface EventFormData {
  title: string;
  causeArea: string;
  expectedDate: string;
  location: string;
  estimatedBudget: string;
  targetBeneficiaries: string;
  objectives: string;
}

interface GrantMatchingFormProps {
  onSubmit: (data: EventFormData) => void;
  isLoading: boolean;
}

const GrantMatchingForm = ({ onSubmit, isLoading }: GrantMatchingFormProps) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    causeArea: "",
    expectedDate: "",
    location: "",
    estimatedBudget: "",
    targetBeneficiaries: "",
    objectives: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof EventFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Event / Program Details</CardTitle>
        <CardDescription>
          Fill in your upcoming event details and we'll find matching grant opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Youth Environmental Awareness Camp"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="causeArea">Cause Area / Category *</Label>
            <Select
              value={formData.causeArea}
              onValueChange={(value) => handleChange("causeArea", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select cause area" />
              </SelectTrigger>
              <SelectContent>
                {causeAreas.map((cause) => (
                  <SelectItem key={cause} value={cause}>
                    {cause}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expectedDate">Expected Date *</Label>
              <Input
                id="expectedDate"
                type="date"
                value={formData.expectedDate}
                onChange={(e) => handleChange("expectedDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => handleChange("location", value)}
                required
              >
                <SelectTrigger>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estimatedBudget">Estimated Budget (RM) *</Label>
              <Input
                id="estimatedBudget"
                type="number"
                placeholder="e.g., 25000"
                value={formData.estimatedBudget}
                onChange={(e) => handleChange("estimatedBudget", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetBeneficiaries">Target Beneficiaries *</Label>
              <Input
                id="targetBeneficiaries"
                placeholder="e.g., 100 youth aged 15-25"
                value={formData.targetBeneficiaries}
                onChange={(e) => handleChange("targetBeneficiaries", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="objectives">Objectives / Description *</Label>
            <Textarea
              id="objectives"
              placeholder="Describe your event objectives, expected outcomes, and impact..."
              value={formData.objectives}
              onChange={(e) => handleChange("objectives", e.target.value)}
              rows={4}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Find Matching Grants"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GrantMatchingForm;
