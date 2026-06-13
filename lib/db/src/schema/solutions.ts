import { pgTable, serial, text, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const solutionsTable = pgTable("solutions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  icon: text("icon").notNull(),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  imageUrl: text("image_url"),
});

export const insertSolutionSchema = createInsertSchema(solutionsTable).omit({ id: true });
export type InsertSolution = z.infer<typeof insertSolutionSchema>;
export type Solution = typeof solutionsTable.$inferSelect;
