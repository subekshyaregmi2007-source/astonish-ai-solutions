import { Router } from "express";
import { db } from "@workspace/db";
import { solutionsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/solutions", async (req, res) => {
  const solutions = await db.select().from(solutionsTable).orderBy(solutionsTable.id);
  res.json(solutions);
});

router.get("/solutions/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const [solution] = await db.select().from(solutionsTable).where(eq(solutionsTable.id, id));
  if (!solution) return res.status(404).json({ error: "Not found" });
  res.json(solution);
});

export default router;
