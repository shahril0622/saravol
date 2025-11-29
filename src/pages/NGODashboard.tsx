import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import OpportunityForm from "@/components/OpportunityForm";
import { mockOpportunities, Opportunity } from "@/data/mockOpportunities";
import { toast } from "sonner";

const NGODashboard = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);

  const handleAddOpportunity = (data: Omit<Opportunity, "id">) => {
    const maxId = opportunities.length > 0 
      ? Math.max(...opportunities.map(o => parseInt(o.id)))
      : 0;
    const newOpportunity: Opportunity = {
      ...data,
      id: (maxId + 1).toString(),
    };
    setOpportunities([newOpportunity, ...opportunities]);
    setIsDialogOpen(false);
    toast.success("Opportunity posted successfully!");
  };

  const handleEditOpportunity = (data: Omit<Opportunity, "id">) => {
    if (!editingOpportunity) return;
    setOpportunities(
      opportunities.map((opp) =>
        opp.id === editingOpportunity.id ? { ...data, id: editingOpportunity.id } : opp
      )
    );
    setEditingOpportunity(null);
    setIsDialogOpen(false);
    toast.success("Opportunity updated successfully!");
  };

  const handleDeleteOpportunity = (id: string) => {
    setOpportunities(opportunities.filter((opp) => opp.id !== id));
    toast.success("Opportunity deleted successfully!");
  };

  const openEditDialog = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingOpportunity(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">NGO Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your volunteer opportunities
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/ngo/grant-planner">
              <Button variant="outline">
                <Sparkles className="mr-2 h-4 w-4" />
                Grant Planner
              </Button>
            </Link>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingOpportunity(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Post New Opportunity
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingOpportunity ? "Edit Opportunity" : "Post New Opportunity"}
                </DialogTitle>
              </DialogHeader>
              <OpportunityForm
                initialData={editingOpportunity || undefined}
                onSubmit={editingOpportunity ? handleEditOpportunity : handleAddOpportunity}
                onCancel={closeDialog}
              />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-4">
          {opportunities.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No opportunities posted yet.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Click "Post New Opportunity" to get started.
                </p>
              </CardContent>
            </Card>
          ) : (
            opportunities.map((opportunity) => (
              <Card key={opportunity.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{opportunity.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {opportunity.organization} • {opportunity.category}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditDialog(opportunity)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteOpportunity(opportunity.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>📅 {opportunity.date}</p>
                    <p>📍 {opportunity.location}, {opportunity.region}</p>
                    <p>👥 {opportunity.volunteersNeeded} volunteers needed</p>
                    <p className="mt-4 text-foreground">{opportunity.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NGODashboard;
