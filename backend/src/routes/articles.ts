import { Router } from "express";
import { db } from "@workspace/db";
import { articlesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/articles", async (req, res) => {
  const articles = await db.select().from(articlesTable).orderBy(articlesTable.publishedAt);
  res.json(articles.map((a) => ({
    ...a,
    publishedAt: a.publishedAt.toISOString(),
  })));
});

router.get("/articles/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const [article] = await db.select().from(articlesTable).where(eq(articlesTable.id, id));
  if (!article) return res.status(404).json({ error: "Not found" });
  res.json({ ...article, publishedAt: article.publishedAt.toISOString() });
});

export default router;
