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
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans">
      <nav className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-[#111827]">Admin Panel</div>
          <button 
            onClick={() => { localStorage.removeItem("admin_token"); setLocation("/admin"); }}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-[#111827]">Overview</h1>

        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[1,2,3].map(i => <Skeleton key={i} className="h-32 bg-gray-200 rounded-xl" />)}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-[#6B7280]">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Total Inquiries</span>
              </div>
              <div className="text-[40px] font-bold text-[#111827] leading-none">{stats.totalInquiries}</div>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-[#6B7280]">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">Unique Countries</span>
              </div>
              <div className="text-[40px] font-bold text-[#111827] leading-none">{stats.inquiriesByCountry.length}</div>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-[#6B7280]">
                <Briefcase className="w-5 h-5" />
                <span className="text-sm font-medium">Unique Roles</span>
              </div>
              <div className="text-[40px] font-bold text-[#111827] leading-none">{stats.inquiriesByJobTitle.length}</div>
            </div>
          </div>
        ) : null}

        <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E5E7EB]">
            <h2 className="text-lg font-bold text-[#111827]">Recent Inquiries</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs font-semibold text-[#6B7280] bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Country</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {inquiriesLoading ? (
                  [1,2,3,4,5].map(i => (
                    <tr key={i}>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-24 bg-gray-100" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-32 bg-gray-100" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-32 bg-gray-100" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-24 bg-gray-100" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-20 bg-gray-100" /></td>
                    </tr>
                  ))
                ) : inquiries && inquiries.length > 0 ? (
                  inquiries.map(inquiry => (
                    <tr key={inquiry.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="px-6 py-4 text-[#6B7280] whitespace-nowrap">{format(new Date(inquiry.createdAt), 'MMM dd, HH:mm')}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-[#111827]">{inquiry.name}</div>
                        <div className="text-xs text-[#6B7280] mt-0.5">{inquiry.email}</div>
                      </td>
                      <td className="px-6 py-4 text-[#374151]">{inquiry.companyName}</td>
                      <td className="px-6 py-4 text-[#374151]">{inquiry.jobTitle}</td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-[#374151]">
                          {inquiry.country}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-[#6B7280]">No inquiries found.</td>
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