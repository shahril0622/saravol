import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Opportunity } from "@/data/mockOpportunities";
import { SARAWAK_REGIONS } from "@/data/sarawakRegions";

const categories = [
  "Animal Welfare",
  "Food Aid",
  "Environment",
  "Community Events",
  "Education",
];

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  organization: z.string().min(2, "Organization name is required"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(2, "Location is required"),
  region: z.string().min(1, "Please select a region"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  volunteersNeeded: z.string().min(1, "Number of volunteers is required"),
  contactPreference: z.enum(["email", "whatsapp", "both"]),
  contactEmail: z.string().email("Valid email is required").optional().or(z.literal("")),
  contactWhatsApp: z.string().optional(),
});

interface OpportunityFormProps {
  initialData?: Opportunity;
  onSubmit: (data: Omit<Opportunity, "id">) => void;
  onCancel: () => void;
}

const OpportunityForm = ({ initialData, onSubmit, onCancel }: OpportunityFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      volunteersNeeded: initialData.volunteersNeeded.toString(),
    } : {
      title: "",
      category: "",
      organization: "",
      date: "",
      location: "",
      region: "",
      description: "",
      volunteersNeeded: "",
      contactPreference: "both",
      contactEmail: "",
      contactWhatsApp: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const opportunityData = {
      title: values.title,
      category: values.category,
      organization: values.organization,
      date: values.date,
      location: values.location,
      region: values.region,
      description: values.description,
      volunteersNeeded: parseInt(values.volunteersNeeded),
      contactPreference: values.contactPreference,
      contactEmail: values.contactEmail || "",
      contactWhatsApp: values.contactWhatsApp || "",
    };
    onSubmit(opportunityData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opportunity Title</FormLabel>
              <FormControl>
                <Input placeholder="Beach Cleanup Volunteer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your NGO Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input placeholder="Jan 15, 2025" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="volunteersNeeded"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volunteers Needed</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="20" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Damai Beach" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SARAWAK_REGIONS.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the volunteer opportunity, activities, and requirements..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Preference</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="email">Email Only</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp Only</SelectItem>
                  <SelectItem value="both">Both Email & WhatsApp</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="contact@ngo.org" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactWhatsApp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp Number</FormLabel>
                <FormControl>
                  <Input placeholder="+60123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update Opportunity" : "Post Opportunity"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OpportunityForm;
