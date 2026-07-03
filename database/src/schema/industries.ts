import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const industriesTable = pgTable("industries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sector: text("sector").notNull(),
  description: text("description").notNull(),
  outcome: text("outcome").notNull(),
  year: integer("year").notNull(),
  logoUrl: text("logo_url"),
  imageUrl: text("image_url"),
});

export const insertIndustrySchema = createInsertSchema(industriesTable).omit({ id: true });
export type InsertIndustry = z.infer<typeof insertIndustrySchema>;
export type Industry = typeof industriesTable.$inferSelect;
