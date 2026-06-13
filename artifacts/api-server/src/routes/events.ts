import { Router } from "express";
import { db } from "@workspace/db";
import { eventsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/events", async (req, res) => {
  const events = await db.select().from(eventsTable).orderBy(eventsTable.id);
  res.json(events);
});

router.get("/events/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const [event] = await db.select().from(eventsTable).where(eq(eventsTable.id, id));
  if (!event) return res.status(404).json({ error: "Not found" });
  res.json(event);
});

export default router;
