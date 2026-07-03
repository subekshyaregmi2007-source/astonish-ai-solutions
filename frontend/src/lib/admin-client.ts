import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export async function adminFetch(url: string, options?: RequestInit) {
  const token = localStorage.getItem("admin_token") || "";
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      "x-admin-token": token,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("admin_token");
      window.location.href = "/admin";
    }
    throw new Error("Unauthorized or API error");
  }
  return res.json();
}

interface InquiriesParams {
  search?: string;
  status?: string;
  country?: string;
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: string;
}

export function useAdminInquiries(params: InquiriesParams = {}) {
  const queryParams = new URLSearchParams();
  if (params.search) queryParams.set("search", params.search);
  if (params.status) queryParams.set("status", params.status);
  if (params.country) queryParams.set("country", params.country);
  if (params.page) queryParams.set("page", params.page.toString());
  if (params.perPage) queryParams.set("perPage", params.perPage.toString());
  if (params.sortBy) queryParams.set("sortBy", params.sortBy);
  if (params.sortOrder) queryParams.set("sortOrder", params.sortOrder);
  
  return useQuery({
    queryKey: ["admin-inquiries", params],
    queryFn: () => adminFetch(`/api/admin/inquiries?${queryParams.toString()}`),
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => adminFetch("/api/admin/stats"),
  });
}

export function useDeleteInquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      return adminFetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
}

export function useUpdateInquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return adminFetch(`/api/admin/inquiries/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
}

export function useUpdateInquiryStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return adminFetch(`/api/admin/inquiries/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
}

export function useInquiryNotes(inquiryId: number) {
  return useQuery({
    queryKey: ["inquiry-notes", inquiryId],
    queryFn: () => adminFetch(`/api/admin/inquiries/${inquiryId}/notes`),
    enabled: !!inquiryId,
  });
}

export function useAddInquiryNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ inquiryId, note }: { inquiryId: number; note: string }) => {
      return adminFetch(`/api/admin/inquiries/${inquiryId}/notes`, {
        method: "POST",
        body: JSON.stringify({ note }),
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["inquiry-notes", variables.inquiryId] });
    },
  });
}

export function useDeleteInquiryNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ inquiryId, noteId }: { inquiryId: number; noteId: number }) => {
      return adminFetch(`/api/admin/inquiries/${inquiryId}/notes/${noteId}`, {
        method: "DELETE",
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["inquiry-notes", variables.inquiryId] });
    },
  });
}
