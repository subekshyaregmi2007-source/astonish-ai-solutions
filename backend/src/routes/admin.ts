import { Router } from "express";
import { db, inquiriesTable, inquiryNotesTable } from "@workspace/db";
import { AdminLoginBody } from "@workspace/api-zod";
import { sql, desc, asc, like, or, and, eq } from "drizzle-orm";

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
  const { search, status, country, page = "1", perPage = "10", sortBy = "createdAt", sortOrder = "desc" } = req.query;
  
  // Build where conditions
  const conditions = [];
  if (search) {
    conditions.push(
      or(
        like(inquiriesTable.name, `%${search}%`),
        like(inquiriesTable.email, `%${search}%`),
        like(inquiriesTable.companyName, `%${search}%`)
      )
    );
  }
  if (status && status !== "all") {
    conditions.push(eq(inquiriesTable.status, status as string));
  }
  if (country && country !== "all") {
    conditions.push(eq(inquiriesTable.country, country as string));
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;
  
  // Get total count
  const totalResult = await db.select({ count: sql<number>`count(*)` }).from(inquiriesTable).where(where);
  const total = Number(totalResult[0]?.count || 0);
  
  // Get paginated results
  const pageNum = parseInt(page as string);
  const perPageNum = parseInt(perPage as string);
  const offset = (pageNum - 1) * perPageNum;
  
  const orderColumn = sortBy === "name" ? inquiriesTable.name :
                     sortBy === "company" ? inquiriesTable.companyName :
                     inquiriesTable.createdAt;
  const orderFn = sortOrder === "asc" ? asc : desc;
  
  const inquiries = await db
    .select()
    .from(inquiriesTable)
    .where(where)
    .orderBy(orderFn(orderColumn))
    .limit(perPageNum)
    .offset(offset);
  
  res.json({
    data: inquiries.map((i) => ({ ...i, createdAt: i.createdAt.toISOString() })),
    pagination: {
      page: pageNum,
      perPage: perPageNum,
      total,
      totalPages: Math.ceil(total / perPageNum)
    }
  });
});

router.get("/admin/inquiries/:id", requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const inquiry = await db.select().from(inquiriesTable).where(sql`${inquiriesTable.id} = ${id}`);
  if (inquiry.length === 0) {
    return res.status(404).json({ error: "Inquiry not found" });
  }
  res.json({ ...inquiry[0], createdAt: inquiry[0].createdAt.toISOString() });
});

router.put("/admin/inquiries/:id", requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone, companyName, country, jobTitle, jobDetails } = req.body;
  
  const updated = await db
    .update(inquiriesTable)
    .set({ name, email, phone, companyName, country, jobTitle, jobDetails })
    .where(sql`${inquiriesTable.id} = ${id}`)
    .returning();
  
  if (updated.length === 0) {
    return res.status(404).json({ error: "Inquiry not found" });
  }
  res.json({ ...updated[0], createdAt: updated[0].createdAt.toISOString() });
});

router.delete("/admin/inquiries/:id", requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = await db.delete(inquiriesTable).where(sql`${inquiriesTable.id} = ${id}`).returning();
  if (deleted.length === 0) {
    return res.status(404).json({ error: "Inquiry not found" });
  }
  res.json({ success: true, id });
});

// Status update
router.patch("/admin/inquiries/:id/status", requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  
  if (!["new", "in_progress", "resolved", "archived"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  
  const updated = await db
    .update(inquiriesTable)
    .set({ status })
    .where(sql`${inquiriesTable.id} = ${id}`)
    .returning();
  
  if (updated.length === 0) {
    return res.status(404).json({ error: "Inquiry not found" });
  }
  res.json({ ...updated[0], createdAt: updated[0].createdAt.toISOString() });
});

// Notes
router.get("/admin/inquiries/:id/notes", requireAdmin, async (req, res) => {
  const inquiryId = parseInt(req.params.id);
  const notes = await db
    .select()
    .from(inquiryNotesTable)
    .where(sql`${inquiryNotesTable.inquiryId} = ${inquiryId}`)
    .orderBy(desc(inquiryNotesTable.createdAt));
  res.json(notes.map((n) => ({ ...n, createdAt: n.createdAt.toISOString() })));
});

router.post("/admin/inquiries/:id/notes", requireAdmin, async (req, res) => {
  const inquiryId = parseInt(req.params.id);
  const { note } = req.body;
  
  if (!note || note.trim().length === 0) {
    return res.status(400).json({ error: "Note content required" });
  }
  
  const created = await db
    .insert(inquiryNotesTable)
    .values({ inquiryId, note: note.trim(), createdBy: "admin" })
    .returning();
  
  res.json({ ...created[0], createdAt: created[0].createdAt.toISOString() });
});

router.delete("/admin/inquiries/:inquiryId/notes/:noteId", requireAdmin, async (req, res) => {
  const noteId = parseInt(req.params.noteId);
  const deleted = await db
    .delete(inquiryNotesTable)
    .where(sql`${inquiryNotesTable.id} = ${noteId}`)
    .returning();
  
  if (deleted.length === 0) {
    return res.status(404).json({ error: "Note not found" });
  }
  res.json({ success: true, id: noteId });
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
