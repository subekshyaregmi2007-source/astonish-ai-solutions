import { useAdminLogin } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

const loginSchema = z.object({
  password: z.string().min(1, "Password required"),
});

export default function AdminLogin() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const adminLogin = useAdminLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    adminLogin.mutate(
      { data },
      {
        onSuccess: (res) => {
          localStorage.setItem("admin_token", res.token);
          setLocation("/admin/dashboard");
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "Invalid credentials.",
          });
        },
      }
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] text-[#111827] font-sans px-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm p-8 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm"
      >
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#374151]">
            <Lock className="w-5 h-5" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-1">Admin Portal</h1>
        <p className="text-[#6B7280] text-center text-sm mb-8">Sign in to manage AI-Solutions</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-admin-login">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#374151] font-medium text-sm">Passphrase</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-white border-[#E5E7EB] h-12" 
                      {...field} 
                      data-testid="input-password" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              disabled={adminLogin.isPending}
              className="w-full py-3 bg-[#111827] text-white font-medium rounded-lg hover:bg-[#1f2937] transition-colors disabled:opacity-50"
              data-testid="button-submit-login"
            >
              {adminLogin.isPending ? "Authenticating..." : "Sign In"}
            </button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}