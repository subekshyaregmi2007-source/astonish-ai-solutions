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

  if (statsError) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <nav className="border-b border-[#262626] sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 h-16 flex items-center justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e5e2e1]">Admin Panel</div>
          <button
            onClick={() => { localStorage.removeItem("admin_token"); setLocation("/admin"); }}
            className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a8c4b0] hover:text-[#6ee7b7] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 md:px-16 py-16">
        <div className="editorial-line mb-10" />
        <h1 className="text-[40px] font-extralight tracking-[-0.02em] text-[#e5e2e1] mb-16">Overview</h1>

        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-[#262626] mb-16">
            {[1,2,3].map(i => <Skeleton key={i} className="h-36 bg-[#131313] border-r border-b border-[#262626]" />)}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-[#262626] mb-16">
            {[
              { icon: Users, label: "Total Inquiries", value: stats.totalInquiries },
              { icon: Globe, label: "Unique Countries", value: stats.inquiriesByCountry.length },
              { icon: Briefcase, label: "Unique Roles", value: stats.inquiriesByJobTitle.length },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="border-r border-b border-[#262626] p-10">
                <div className="flex items-center gap-2 mb-6 text-[#a8c4b0]">
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">{label}</span>
                </div>
                <div className="text-[48px] font-thin text-[#6ee7b7] leading-none">{value}</div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="border border-[#262626]">
          <div className="px-8 py-5 border-b border-[#262626]">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e5e2e1]">Recent Inquiries</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="border-b border-[#262626]">
                <tr>
                  {["Date", "Name", "Company", "Role", "Country"].map(h => (
                    <th key={h} className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a8c4b0]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inquiriesLoading ? (
                  [1,2,3,4,5].map(i => (
                    <tr key={i} className="border-b border-[#262626]">
                      {[1,2,3,4,5].map(j => (
                        <td key={j} className="px-6 py-4"><Skeleton className="h-4 w-24 bg-[#131313]" /></td>
                      ))}
                    </tr>
                  ))
                ) : inquiries && inquiries.length > 0 ? (
                  inquiries.map(inquiry => (
                    <tr key={inquiry.id} className="border-b border-[#262626] hover:bg-[#0a0a0a] transition-colors">
                      <td className="px-6 py-4 text-[#a8c4b0] whitespace-nowrap text-xs">{format(new Date(inquiry.createdAt), 'MMM dd, HH:mm')}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-[#e5e2e1]">{inquiry.name}</div>
                        <div className="text-xs text-[#a8c4b0] mt-0.5">{inquiry.email}</div>
                      </td>
                      <td className="px-6 py-4 text-[#a8c4b0]">{inquiry.companyName}</td>
                      <td className="px-6 py-4 text-[#a8c4b0]">{inquiry.jobTitle}</td>
                      <td className="px-6 py-4 text-[#a8c4b0]">{inquiry.country}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[#a8c4b0] text-sm">No inquiries found.</td>
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
