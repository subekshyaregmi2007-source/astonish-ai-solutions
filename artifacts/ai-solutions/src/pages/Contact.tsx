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
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans">
      <Navbar />
      <PageTransition>
        <div className="container mx-auto px-6 py-24 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="max-w-md">
              <h1 className="text-[48px] md:text-[56px] font-bold text-[#111827] tracking-tight mb-6 leading-tight">
                Let's Talk Future.
              </h1>
              <p className="text-lg text-[#6B7280] leading-relaxed mb-12">
                Ready to transform your digital employee experience? Reach out to our global team of experts.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-2">Global Headquarters</h4>
                  <p className="text-[#6B7280]">Sunderland, UK</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111827] mb-2">Email</h4>
                  <p className="text-[#6B7280]">future@ai-solutions.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 md:p-10 shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#374151] font-medium text-sm">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" className="bg-white border-[#E5E7EB] h-12 text-[15px]" {...field} data-testid="input-name" />
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
                          <FormLabel className="text-[#374151] font-medium text-sm">Work Email</FormLabel>
                          <FormControl>
                            <Input placeholder="jane@company.com" className="bg-white border-[#E5E7EB] h-12 text-[15px]" {...field} data-testid="input-email" />
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
                          <FormLabel className="text-[#374151] font-medium text-sm">Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+44 ..." className="bg-white border-[#E5E7EB] h-12 text-[15px]" {...field} data-testid="input-phone" />
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
                          <FormLabel className="text-[#374151] font-medium text-sm">Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Corp" className="bg-white border-[#E5E7EB] h-12 text-[15px]" {...field} data-testid="input-company" />
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
                          <FormLabel className="text-[#374151] font-medium text-sm">Country</FormLabel>
                          <FormControl>
                            <Input placeholder="UK" className="bg-white border-[#E5E7EB] h-12 text-[15px]" {...field} data-testid="input-country" />
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
                          <FormLabel className="text-[#374151] font-medium text-sm">Job Title</FormLabel>
                          <FormControl>
                            <Input placeholder="CTO" className="bg-white border-[#E5E7EB] h-12 text-[15px]" {...field} data-testid="input-jobtitle" />
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
                        <FormLabel className="text-[#374151] font-medium text-sm">How can we help?</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your challenges..." className="bg-white border-[#E5E7EB] min-h-[120px] text-[15px] resize-y" {...field} data-testid="input-jobdetails" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={createInquiry.isPending}
                    className="w-full py-4 bg-[#111827] text-white font-medium rounded-lg hover:bg-[#1f2937] transition-colors disabled:opacity-50 mt-4"
                    data-testid="button-submit-contact"
                  >
                    {createInquiry.isPending ? "Submitting..." : "Send Message"}
                  </button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}