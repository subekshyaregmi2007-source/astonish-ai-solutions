import { useAdminStats, useAdminInquiries } from "@/lib/admin-client";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Users, Globe, Briefcase } from "lucide-react";
import { format } from "date-fns";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { data: stats, isLoading: statsLoading, error: statsError } = useAdminStats();
  const { data: inquiries, isLoading: inquiriesLoading } = useAdminInquiries();

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      setLocation("/admin");
    }
  }, [setLocation]);

  if (statsError) {
    // handled by admin-client redirecting to /admin if 401
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-white/5 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-display font-bold tracking-widest uppercase text-primary">Admin_Panel</div>
          <button 
            onClick={() => { localStorage.removeItem("admin_token"); setLocation("/admin"); }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm uppercase tracking-wider"
          >
            <LogOut className="w-4 h-4" /> Disconnect
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-display font-bold mb-8">System Overview</h1>

        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[1,2,3].map(i => <Skeleton key={i} className="h-32 bg-muted/20 rounded-xl" />)}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-white/5 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-primary/20"><Users className="w-12 h-12" /></div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Total Inquiries</div>
              <div className="text-5xl font-display font-bold text-foreground">{stats.totalInquiries}</div>
            </div>
            <div className="bg-card border border-white/5 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-primary/20"><Globe className="w-12 h-12" /></div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Unique Countries</div>
              <div className="text-5xl font-display font-bold text-foreground">{stats.inquiriesByCountry.length}</div>
            </div>
            <div className="bg-card border border-white/5 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-primary/20"><Briefcase className="w-12 h-12" /></div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Unique Roles</div>
              <div className="text-5xl font-display font-bold text-foreground">{stats.inquiriesByJobTitle.length}</div>
            </div>
          </div>
        ) : null}

        <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-xl font-display font-bold">Recent Inquiries</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-muted/10 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Company</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Country</th>
                </tr>
              </thead>
              <tbody>
                {inquiriesLoading ? (
                  [1,2,3,4,5].map(i => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="px-6 py-4"><Skeleton className="h-4 w-24 bg-muted/20" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-32 bg-muted/20" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-32 bg-muted/20" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-24 bg-muted/20" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-20 bg-muted/20" /></td>
                    </tr>
                  ))
                ) : inquiries && inquiries.length > 0 ? (
                  inquiries.map(inquiry => (
                    <tr key={inquiry.id} className="border-b border-white/5 hover:bg-muted/5 transition-colors">
                      <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{format(new Date(inquiry.createdAt), 'MMM dd, HH:mm')}</td>
                      <td className="px-6 py-4 font-medium text-foreground">
                        <div>{inquiry.name}</div>
                        <div className="text-xs text-muted-foreground">{inquiry.email}</div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{inquiry.companyName}</td>
                      <td className="px-6 py-4 text-muted-foreground">{inquiry.jobTitle}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase font-bold tracking-wider">
                          {inquiry.country}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No inquiries found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
