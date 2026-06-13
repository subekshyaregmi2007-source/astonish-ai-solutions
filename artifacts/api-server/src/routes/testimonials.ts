import { Router } from "express";
import { db } from "@workspace/db";
import { testimonialsTable } from "@workspace/db";

const router = Router();

router.get("/testimonials", async (req, res) => {
  const testimonials = await db.select().from(testimonialsTable).orderBy(testimonialsTable.id);
  res.json(testimonials);
});

export default router;
