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
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-md p-10 bg-card/40 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.2)]">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-display font-bold text-center tracking-wide mb-2">SYSTEM ACCESS</h1>
        <p className="text-muted-foreground text-center mb-10 uppercase tracking-widest text-xs">AI-Solutions Admin Portal</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" data-testid="form-admin-login">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="ENTER PASSPHRASE" 
                      className="bg-black/50 border-primary/30 text-center tracking-widest uppercase focus-visible:ring-primary h-14 font-mono text-lg shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" 
                      {...field} 
                      data-testid="input-password" 
                    />
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />
            <button
              type="submit"
              disabled={adminLogin.isPending}
              className="w-full py-4 bg-primary text-background font-bold uppercase tracking-widest rounded hover:shadow-[0_0_20px_rgba(0,212,255,0.6)] transition-all disabled:opacity-50"
              data-testid="button-submit-login"
            >
              {adminLogin.isPending ? "AUTHENTICATING..." : "AUTHORIZE"}
            </button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
