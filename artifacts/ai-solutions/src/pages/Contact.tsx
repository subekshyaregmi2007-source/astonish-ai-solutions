import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useCreateInquiry } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Phone is required"),
  companyName: z.string().min(2, "Company name is required"),
  country: z.string().min(2, "Country is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  jobDetails: z.string().min(10, "Please provide some details"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const createInquiry = useCreateInquiry();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      country: "",
      jobTitle: "",
      jobDetails: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    createInquiry.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "Inquiry Submitted",
            description: "We will get back to you shortly.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong. Please try again.",
          });
        },
      }
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>
      <Navbar />
      <PageTransition className="container mx-auto px-6 py-20 relative z-10 flex items-center justify-center min-h-[90vh]">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
              Let's Talk Future.
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Ready to transform your digital employee experience? Reach out to our global team of experts.
            </p>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Global Headquarters</h4>
                <p className="text-lg">Sunderland, UK</p>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Email</h4>
                <p className="text-lg">future@ai-solutions.com</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-white/5 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase text-xs tracking-wider">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Doe" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase text-xs tracking-wider">Work Email</FormLabel>
                        <FormControl>
                          <Input placeholder="jane@company.com" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase text-xs tracking-wider">Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+44 ..." className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase text-xs tracking-wider">Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Corp" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} data-testid="input-company" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase text-xs tracking-wider">Country</FormLabel>
                        <FormControl>
                          <Input placeholder="UK" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} data-testid="input-country" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase text-xs tracking-wider">Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="CTO" className="bg-background/50 border-white/10 focus-visible:ring-primary h-12" {...field} data-testid="input-jobtitle" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="jobDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase text-xs tracking-wider">How can we help?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about your challenges..." className="bg-background/50 border-white/10 focus-visible:ring-primary min-h-[120px]" {...field} data-testid="input-jobdetails" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={createInquiry.isPending}
                  className="w-full py-4 bg-primary text-background font-bold uppercase tracking-wider rounded hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all disabled:opacity-50"
                  data-testid="button-submit-contact"
                >
                  {createInquiry.isPending ? "Submitting..." : "Send Message"}
                </button>
              </form>
            </Form>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}
