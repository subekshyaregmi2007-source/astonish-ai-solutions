import { useAdminStats, useAdminInquiries, useDeleteInquiry, useUpdateInquiry, useUpdateInquiryStatus, useInquiryNotes, useAddInquiryNote, useDeleteInquiryNote } from "@/lib/admin-client";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Users, Globe, Briefcase, Pencil, Trash2, X, Check, Search, Filter, Download, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  
  // Fetch data with filters
  const { data: inquiriesData, isLoading: inquiriesLoading } = useAdminInquiries({
    search: searchTerm,
    status: statusFilter,
    country: countryFilter,
    page,
    perPage
  });
  
  const inquiries = inquiriesData?.data || [];
  const pagination = inquiriesData?.pagination;
  
  const { data: stats, isLoading: statsLoading, error: statsError } = useAdminStats();
  const deleteInquiry = useDeleteInquiry();
  const updateInquiry = useUpdateInquiry();
  const updateStatus = useUpdateInquiryStatus();
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [notesDialogId, setNotesDialogId] = useState<number | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      setLocation("/admin");
    }
  }, [setLocation]);

  const handleEdit = (inquiry: any) => {
    setEditingId(inquiry.id);
    setEditForm({
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      companyName: inquiry.companyName,
      country: inquiry.country,
      jobTitle: inquiry.jobTitle,
      jobDetails: inquiry.jobDetails,
    });
  };

  const handleSaveEdit = () => {
    if (editingId && editForm) {
      updateInquiry.mutate(
        { id: editingId, data: editForm },
        {
          onSuccess: () => {
            toast({ title: "Success", description: "Inquiry updated successfully" });
            setEditingId(null);
            setEditForm(null);
          },
          onError: () => {
            toast({ variant: "destructive", title: "Error", description: "Failed to update inquiry" });
          },
        }
      );
    }
  };

  const handleDelete = (id: number) => {
    deleteInquiry.mutate(id, {
      onSuccess: () => {
        toast({ title: "Success", description: "Inquiry deleted successfully" });
        setDeleteConfirmId(null);
      },
      onError: () => {
        toast({ variant: "destructive", title: "Error", description: "Failed to delete inquiry" });
      },
    });
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    updateStatus.mutate(
      { id, status: newStatus },
      {
        onSuccess: () => {
          toast({ title: "Success", description: "Status updated" });
        },
        onError: () => {
          toast({ variant: "destructive", title: "Error", description: "Failed to update status" });
        },
      }
    );
  };

  const exportToCSV = () => {
    if (!inquiries || inquiries.length === 0) return;
    
    const headers = ["Name", "Email", "Phone", "Company", "Country", "Job Title", "Status", "Created At"];
    const rows = inquiries.map(inq => [
      inq.name,
      inq.email,
      inq.phone,
      inq.companyName,
      inq.country,
      inq.jobTitle,
      inq.status,
      format(new Date(inq.createdAt), 'yyyy-MM-dd HH:mm')
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inquiries-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Success", description: "CSV file downloaded" });
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      new: { color: "bg-green-100 text-green-800", label: "New" },
      in_progress: { color: "bg-yellow-100 text-yellow-800", label: "In Progress" },
      resolved: { color: "bg-blue-100 text-blue-800", label: "Resolved" },
      archived: { color: "bg-gray-100 text-gray-800", label: "Archived" }
    };
    const badge = badges[status as keyof typeof badges] || badges.new;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const uniqueCountries = Array.from(new Set(inquiries?.map(i => i.country) || []));

  if (statsError) return null;

  return (
    <div className="min-h-screen bg-[#F4FBF6] text-[#1A3326]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <nav className="border-b border-[#AECFBE] sticky top-0 z-50 bg-[#F4FBF6]/90 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 h-16 flex items-center justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1A3326]">Admin Panel</div>
          <button
            onClick={() => { localStorage.removeItem("admin_token"); setLocation("/admin"); }}
            className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] hover:text-[#2E8B57] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 md:px-16 py-16">
        <div className="editorial-line mb-10" />
        <h1 className="text-[40px] font-extralight tracking-[-0.02em] text-[#1A3326] mb-16">Overview</h1>

        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-[#AECFBE] mb-16">
            {[1,2,3].map(i => <Skeleton key={i} className="h-36 bg-[#D8EDE0] border-r border-b border-[#AECFBE]" />)}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-[#AECFBE] mb-16">
            {[
              { icon: Users, label: "Total Inquiries", value: stats.totalInquiries },
              { icon: Globe, label: "Unique Countries", value: stats.inquiriesByCountry.length },
              { icon: Briefcase, label: "Unique Roles", value: stats.inquiriesByJobTitle.length },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="border-r border-b border-[#AECFBE] p-10">
                <div className="flex items-center gap-2 mb-6 text-[#3D6B52]">
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">{label}</span>
                </div>
                <div className="text-[48px] font-thin text-[#2E8B57] leading-none">{value}</div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="border border-[#AECFBE]">
          <div className="px-8 py-5 border-b border-[#AECFBE] flex items-center justify-between">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1A3326]">Recent Inquiries</h2>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-[#2E8B57] text-white text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-[#1E7045] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>

          {/* Search & Filters */}
          <div className="px-8 py-4 border-b border-[#AECFBE] bg-[#EAF5EE]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#3D6B52]" />
                <input
                  type="text"
                  placeholder="Search by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-[#AECFBE] text-[#1A3326] placeholder-[#8AAF9A] text-sm focus:outline-none focus:border-[#2E8B57]"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="px-4 py-2 bg-white border border-[#AECFBE] text-[#1A3326] text-sm focus:outline-none focus:border-[#2E8B57]"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="archived">Archived</option>
              </select>
              <select
                value={countryFilter}
                onChange={(e) => { setCountryFilter(e.target.value); setPage(1); }}
                className="px-4 py-2 bg-white border border-[#AECFBE] text-[#1A3326] text-sm focus:outline-none focus:border-[#2E8B57]"
              >
                <option value="all">All Countries</option>
                {uniqueCountries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            {(searchTerm || statusFilter !== "all" || countryFilter !== "all") && (
              <button
                onClick={() => { setSearchTerm(""); setStatusFilter("all"); setCountryFilter("all"); setPage(1); }}
                className="mt-3 text-xs text-[#2E8B57] hover:text-[#1E7045] flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear Filters
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="border-b border-[#AECFBE]">
                <tr>
                  {["Date", "Name", "Company", "Role", "Country", "Status", "Actions"].map(h => (
                    <th key={h} className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inquiriesLoading ? (
                  [1,2,3,4,5].map(i => (
                    <tr key={i} className="border-b border-[#AECFBE]">
                      {[1,2,3,4,5,6,7].map(j => (
                        <td key={j} className="px-6 py-4"><Skeleton className="h-4 w-24 bg-[#D8EDE0]" /></td>
                      ))}
                    </tr>
                  ))
                ) : inquiries && inquiries.length > 0 ? (
                  inquiries.map(inquiry => (
                    <tr key={inquiry.id} className="border-b border-[#AECFBE] hover:bg-[#EAF5EE] transition-colors">
                      <td className="px-6 py-4 text-[#3D6B52] whitespace-nowrap text-xs">{format(new Date(inquiry.createdAt), 'MMM dd, HH:mm')}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-[#1A3326]">{inquiry.name}</div>
                        <div className="text-xs text-[#3D6B52] mt-0.5">{inquiry.email}</div>
                      </td>
                      <td className="px-6 py-4 text-[#3D6B52]">{inquiry.companyName}</td>
                      <td className="px-6 py-4 text-[#3D6B52]">{inquiry.jobTitle}</td>
                      <td className="px-6 py-4 text-[#3D6B52]">{inquiry.country}</td>
                      <td className="px-6 py-4">
                        <select
                          value={inquiry.status}
                          onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                          className="px-2 py-1 text-xs border border-[#AECFBE] rounded focus:outline-none focus:border-[#2E8B57]"
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setNotesDialogId(inquiry.id)}
                            className="p-2 text-[#2E8B57] hover:bg-[#E5F2EB] rounded transition-colors"
                            title="Notes"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(inquiry)}
                            className="p-2 text-[#2E8B57] hover:bg-[#E5F2EB] rounded transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(inquiry.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-[#3D6B52] text-sm">No inquiries found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="px-8 py-4 border-t border-[#AECFBE] flex items-center justify-between">
              <div className="text-sm text-[#3D6B52]">
                Showing {((page - 1) * perPage) + 1} to {Math.min(page * perPage, pagination.total)} of {pagination.total} inquiries
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 text-[#3D6B52] hover:bg-[#E5F2EB] disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-3 py-1 text-sm rounded transition-colors ${
                          page === pageNum
                            ? "bg-[#2E8B57] text-white"
                            : "text-[#3D6B52] hover:bg-[#E5F2EB]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className="p-2 text-[#3D6B52] hover:bg-[#E5F2EB] disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={editingId !== null} onOpenChange={() => { setEditingId(null); setEditForm(null); }}>
        <DialogContent className="bg-[#F4FBF6] border-[#AECFBE] max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#1A3326] text-xl">Edit Inquiry</DialogTitle>
          </DialogHeader>
          {editForm && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] block mb-2">Name</label>
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-[#E5F2EB] border border-[#AECFBE] text-[#1A3326] h-11 px-4 text-sm focus:outline-none focus:border-[#2E8B57]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] block mb-2">Email</label>
                  <input
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full bg-[#E5F2EB] border border-[#AECFBE] text-[#1A3326] h-11 px-4 text-sm focus:outline-none focus:border-[#2E8B57]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] block mb-2">Phone</label>
                  <input
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full bg-[#E5F2EB] border border-[#AECFBE] text-[#1A3326] h-11 px-4 text-sm focus:outline-none focus:border-[#2E8B57]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] block mb-2">Company</label>
                  <input
                    value={editForm.companyName}
                    onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                    className="w-full bg-[#E5F2EB] border border-[#AECFBE] text-[#1A3326] h-11 px-4 text-sm focus:outline-none focus:border-[#2E8B57]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] block mb-2">Country</label>
                  <input
                    value={editForm.country}
                    onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                    className="w-full bg-[#E5F2EB] border border-[#AECFBE] text-[#1A3326] h-11 px-4 text-sm focus:outline-none focus:border-[#2E8B57]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] block mb-2">Job Title</label>
                  <input
                    value={editForm.jobTitle}
                    onChange={(e) => setEditForm({ ...editForm, jobTitle: e.target.value })}
                    className="w-full bg-[#E5F2EB] border border-[#AECFBE] text-[#1A3326] h-11 px-4 text-sm focus:outline-none focus:border-[#2E8B57]"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] block mb-2">Details</label>
                <textarea
                  value={editForm.jobDetails}
                  onChange={(e) => setEditForm({ ...editForm, jobDetails: e.target.value })}
                  className="w-full bg-[#E5F2EB] border border-[#AECFBE] text-[#1A3326] px-4 py-3 text-sm focus:outline-none focus:border-[#2E8B57] min-h-[100px]"
                />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={() => { setEditingId(null); setEditForm(null); }}
                  className="px-6 py-2.5 border border-[#AECFBE] text-[#3D6B52] text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#E5F2EB] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={updateInquiry.isPending}
                  className="px-6 py-2.5 bg-[#2E8B57] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#1E7045] disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {updateInquiry.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent className="bg-[#F4FBF6] border-[#AECFBE]">
          <DialogHeader>
            <DialogTitle className="text-[#1A3326] text-xl">Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="text-[#3D6B52] text-sm py-4">
            Are you sure you want to delete this inquiry? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="px-6 py-2.5 border border-[#AECFBE] text-[#3D6B52] text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#E5F2EB] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              disabled={deleteInquiry.isPending}
              className="px-6 py-2.5 bg-red-600 text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              {deleteInquiry.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notes Dialog */}
      <NotesDialog 
        inquiryId={notesDialogId} 
        onClose={() => setNotesDialogId(null)} 
      />
    </div>
  );
}

// Notes Dialog Component
function NotesDialog({ inquiryId, onClose }: { inquiryId: number | null; onClose: () => void }) {
  const { data: notes, isLoading } = useInquiryNotes(inquiryId || 0);
  const addNote = useAddInquiryNote();
  const deleteNote = useDeleteInquiryNote();
  const [newNote, setNewNote] = useState("");
  const { toast } = useToast();

  const handleAddNote = () => {
    if (!inquiryId || !newNote.trim()) return;
    
    addNote.mutate(
      { inquiryId, note: newNote.trim() },
      {
        onSuccess: () => {
          setNewNote("");
          toast({ title: "Success", description: "Note added" });
        },
        onError: () => {
          toast({ variant: "destructive", title: "Error", description: "Failed to add note" });
        },
      }
    );
  };

  const handleDeleteNote = (noteId: number) => {
    if (!inquiryId) return;
    
    deleteNote.mutate(
      { inquiryId, noteId },
      {
        onSuccess: () => {
          toast({ title: "Success", description: "Note deleted" });
        },
        onError: () => {
          toast({ variant: "destructive", title: "Error", description: "Failed to delete note" });
        },
      }
    );
  };

  return (
    <Dialog open={inquiryId !== null} onOpenChange={onClose}>
      <DialogContent className="bg-[#F4FBF6] border-[#AECFBE] max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-[#1A3326] text-xl">Internal Notes</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-4 my-4">
          {isLoading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <Skeleton key={i} className="h-20 bg-[#D8EDE0]" />)}
            </div>
          ) : notes && notes.length > 0 ? (
            notes.map((note: any) => (
              <div key={note.id} className="bg-[#EAF5EE] border border-[#AECFBE] p-4 rounded">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs text-[#3D6B52]">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="font-medium">{note.createdBy}</span>
                    <span>•</span>
                    <span>{format(new Date(note.createdAt), 'MMM dd, yyyy HH:mm')}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                    title="Delete note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[#1A3326] text-sm whitespace-pre-wrap">{note.note}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-[#3D6B52] text-sm py-8">No notes yet. Add one below.</p>
          )}
        </div>

        <div className="border-t border-[#AECFBE] pt-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note..."
            className="w-full bg-[#E5F2EB] border border-[#AECFBE] text-[#1A3326] placeholder-[#8AAF9A] px-4 py-3 text-sm focus:outline-none focus:border-[#2E8B57] min-h-[80px] resize-none"
          />
          <div className="flex gap-3 justify-end mt-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-[#AECFBE] text-[#3D6B52] text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#E5F2EB] transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleAddNote}
              disabled={!newNote.trim() || addNote.isPending}
              className="px-6 py-2.5 bg-[#2E8B57] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#1E7045] disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              {addNote.isPending ? "Adding..." : "Add Note"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
