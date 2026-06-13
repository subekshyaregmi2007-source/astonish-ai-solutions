import { Router } from "express";
import { db } from "@workspace/db";
import { industriesTable } from "@workspace/db";

const router = Router();

router.get("/industries", async (req, res) => {
  const industries = await db.select().from(industriesTable).orderBy(industriesTable.year);
  res.json(industries);
});

export default router;
