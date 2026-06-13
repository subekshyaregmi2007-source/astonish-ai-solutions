import { Router } from "express";
import { db, inquiriesTable } from "@workspace/db";
import { AdminLoginBody } from "@workspace/api-zod";
import { sql } from "drizzle-orm";

const router = Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_TOKEN = "ai-solutions-admin-secret-token-2024";

function requireAdmin(req: any, res: any, next: any) {
  const token = req.headers["x-admin-token"];
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

router.post("/admin/login", async (req, res) => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Validation failed" });
  }
  if (parsed.data.password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid password" });
  }
  res.json({ token: ADMIN_TOKEN });
});

router.get("/admin/inquiries", requireAdmin, async (req, res) => {
  const inquiries = await db.select().from(inquiriesTable).orderBy(inquiriesTable.createdAt);
  res.json(inquiries.map((i) => ({ ...i, createdAt: i.createdAt.toISOString() })));
});

router.get("/admin/stats", requireAdmin, async (req, res) => {
  const all = await db.select().from(inquiriesTable);
  const totalInquiries = all.length;

  const countryCounts: Record<string, number> = {};
  const jobTitleCounts: Record<string, number> = {};
  for (const inq of all) {
    countryCounts[inq.country] = (countryCounts[inq.country] || 0) + 1;
    jobTitleCounts[inq.jobTitle] = (jobTitleCounts[inq.jobTitle] || 0) + 1;
  }

  const inquiriesByCountry = Object.entries(countryCounts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);

  const inquiriesByJobTitle = Object.entries(jobTitleCounts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);

  const recentInquiries = all
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10)
    .map((i) => ({ ...i, createdAt: i.createdAt.toISOString() }));

  res.json({ totalInquiries, inquiriesByCountry, inquiriesByJobTitle, recentInquiries });
});

export default router;
