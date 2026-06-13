import { Router } from "express";
import { db, inquiriesTable } from "@workspace/db";
import { CreateInquiryBody } from "@workspace/api-zod";

const router = Router();

router.post("/inquiries", async (req, res) => {
  const parsed = CreateInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
  }
  const { name, email, phone, companyName, country, jobTitle, jobDetails } = parsed.data;
  const [inquiry] = await db
    .insert(inquiriesTable)
    .values({ name, email, phone, companyName, country, jobTitle, jobDetails })
    .returning();
  res.status(201).json({ ...inquiry, createdAt: inquiry.createdAt.toISOString() });
});

export default router;
