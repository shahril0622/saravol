import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, MoreHorizontal, Pencil, Trash2, Eye, Users, Calendar, Building2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";

// Mock data for NGO's posted opportunities
const mockNGOOpportunities = [
  {
    id: "1",
    title: "Beach Cleanup at Damai",
    category: "Environment",
    date: "2025-03-15",
    region: "Kuching",
    volunteersNeeded: 20,
    volunteersRegistered: 12,
    status: "active",
  },
  {
    id: "5",
    title: "Tree Planting Campaign",
    category: "Environment",
    date: "2025-03-25",
    region: "Kuching",
    volunteersNeeded: 30,
    volunteersRegistered: 20,
    status: "active",
  },
  {
    id: "11",
    title: "River Conservation Workshop",
    category: "Education",
    date: "2025-02-10",
    region: "Kuching",
    volunteersNeeded: 15,
    volunteersRegistered: 15,
    status: "completed",
  },
];

const NGODashboard = () => {
  const [opportunities, setOpportunities] = useState(mockNGOOpportunities);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      setOpportunities(opportunities.filter(opp => opp.id !== deleteId));
      toast.success("Opportunity deleted successfully");
      setDeleteId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary text-primary-foreground">Active</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalVolunteers = opportunities.reduce((sum, opp) => sum + opp.volunteersRegistered, 0);
  const activeOpportunities = opportunities.filter(opp => opp.status === "active").length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">NGO Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your volunteer opportunities
            </p>
          </div>
          <Link to="/ngo/post">
            <Button className="bg-gradient-hero text-primary-foreground hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Post New Opportunity
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Opportunities
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{opportunities.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Opportunities
              </CardTitle>
              <Building2 className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{activeOpportunities}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Sign-ups
              </CardTitle>
              <Users className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalVolunteers}</div>
            </CardContent>
          </Card>
        </div>

        {/* Opportunities Table */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle>Your Opportunities</CardTitle>
            <CardDescription>
              View and manage all your posted volunteer opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {opportunities.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Sign-ups</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunities.map((opportunity) => (
                      <TableRow key={opportunity.id}>
                        <TableCell className="font-medium">{opportunity.title}</TableCell>
                        <TableCell>{opportunity.category}</TableCell>
                        <TableCell>{format(parseISO(opportunity.date), "MMM d, yyyy")}</TableCell>
                        <TableCell>{opportunity.region}</TableCell>
                        <TableCell>
                          {opportunity.volunteersRegistered} / {opportunity.volunteersNeeded}
                        </TableCell>
                        <TableCell>{getStatusBadge(opportunity.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <Link to={`/opportunity/${opportunity.id}`}>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                              </Link>
                              <Link to={`/ngo/edit/${opportunity.id}`}>
                                <DropdownMenuItem>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => setDeleteId(opportunity.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No opportunities posted yet</p>
                <Link to="/ngo/post">
                  <Button className="bg-gradient-hero text-primary-foreground hover:opacity-90">
                    <Plus className="mr-2 h-4 w-4" />
                    Post Your First Opportunity
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the opportunity
              and remove all volunteer sign-ups associated with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default NGODashboard;
