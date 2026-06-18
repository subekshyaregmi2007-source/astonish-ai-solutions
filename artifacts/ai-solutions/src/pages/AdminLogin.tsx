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
    defaultValues: { password: "" },
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
          toast({ variant: "destructive", title: "Access Denied", description: "Invalid credentials." });
        },
      }
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4FBF6] text-[#1A3326] px-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm border border-[#AECFBE] p-10"
      >
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 border border-[#AECFBE] flex items-center justify-center text-[#2E8B57]">
            <Lock className="w-5 h-5" />
          </div>
        </div>

        <h1 className="text-2xl font-light tracking-tight text-center text-[#1A3326] mb-1">Admin Portal</h1>
        <p className="text-[#3D6B52] text-center text-sm mb-10">Sign in to manage AI-Solutions</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-admin-login">
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52]">Passphrase</FormLabel>
                <FormControl>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[#E5F2EB] border border-[#AECFBE] text-[#1A3326] placeholder-[#8AAF9A] h-12 px-4 text-[15px] focus:outline-none focus:border-[#2E8B57] transition-colors"
                    {...field}
                    data-testid="input-password"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )} />
            <button
              type="submit"
              disabled={adminLogin.isPending}
              className="w-full py-3.5 bg-[#2E8B57] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#1E7045] disabled:opacity-50 transition-colors"
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
