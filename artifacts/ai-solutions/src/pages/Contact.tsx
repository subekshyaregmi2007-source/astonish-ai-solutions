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

const inputClass =
  "w-full bg-[#0d0d0d] border border-[#262626] text-[#e5e2e1] placeholder-[#6b7280] h-12 px-4 text-[15px] focus:outline-none focus:border-[#8B5CF6] transition-colors";

const textareaClass =
  "w-full bg-[#0d0d0d] border border-[#262626] text-[#e5e2e1] placeholder-[#6b7280] px-4 py-3 text-[15px] focus:outline-none focus:border-[#8B5CF6] transition-colors resize-y min-h-[140px]";

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
          toast({ title: "Inquiry Submitted", description: "We will get back to you shortly." });
          form.reset();
        },
        onError: () => {
          toast({ variant: "destructive", title: "Error", description: "Something went wrong. Please try again." });
        },
      }
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <PageTransition>
        <div className="pt-36 pb-32 px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="editorial-line mb-12" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8B5CF6] mb-6">Contact</p>
              <h1 className="text-[48px] md:text-[64px] font-extralight tracking-[-0.03em] text-[#e5e2e1] leading-none mb-8">
                Let's Talk Future.
              </h1>
              <p className="text-[#cbc3d7] text-lg leading-relaxed mb-16">
                Ready to transform your digital employee experience? Reach out to our global team of experts.
              </p>

              <div className="border-t border-[#262626] space-y-0">
                <div className="border-b border-[#262626] py-8">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] mb-2">Global Headquarters</div>
                  <div className="text-[#e5e2e1]">Sunderland, UK</div>
                </div>
                <div className="border-b border-[#262626] py-8">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] mb-2">Email</div>
                  <div className="text-[#e5e2e1]">future@ai-solutions.com</div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="border border-[#262626] p-8 md:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7]">Full Name</FormLabel>
                        <FormControl>
                          <input placeholder="Jane Doe" className={inputClass} {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7]">Work Email</FormLabel>
                        <FormControl>
                          <input placeholder="jane@company.com" className={inputClass} {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7]">Phone</FormLabel>
                        <FormControl>
                          <input placeholder="+44 ..." className={inputClass} {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="companyName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7]">Company</FormLabel>
                        <FormControl>
                          <input placeholder="Acme Corp" className={inputClass} {...field} data-testid="input-company" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="country" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7]">Country</FormLabel>
                        <FormControl>
                          <input placeholder="UK" className={inputClass} {...field} data-testid="input-country" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="jobTitle" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7]">Job Title</FormLabel>
                        <FormControl>
                          <input placeholder="CTO" className={inputClass} {...field} data-testid="input-jobtitle" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="jobDetails" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7]">How can we help?</FormLabel>
                      <FormControl>
                        <textarea placeholder="Tell us about your challenges..." className={textareaClass} {...field} data-testid="input-jobdetails" />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )} />

                  <button
                    type="submit"
                    disabled={createInquiry.isPending}
                    className="w-full py-4 bg-[#8B5CF6] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#7C3AED] disabled:opacity-50 transition-colors mt-2"
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
