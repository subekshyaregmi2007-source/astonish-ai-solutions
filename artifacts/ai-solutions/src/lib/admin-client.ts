import { useQuery } from "@tanstack/react-query";

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

export function useAdminInquiries() {
  return useQuery({
    queryKey: ["admin-inquiries"],
    queryFn: () => adminFetch("/api/admin/inquiries"),
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => adminFetch("/api/admin/stats"),
  });
}
