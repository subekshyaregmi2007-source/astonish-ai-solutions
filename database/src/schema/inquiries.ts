import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const inquiriesTable = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  companyName: text("company_name").notNull(),
  country: text("country").notNull(),
  jobTitle: text("job_title").notNull(),
  jobDetails: text("job_details").notNull(),
  status: text("status").notNull().default("new"), // new, in_progress, resolved, archived
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const inquiryNotesTable = pgTable("inquiry_notes", {
  id: serial("id").primaryKey(),
  inquiryId: serial("inquiry_id").notNull().references(() => inquiriesTable.id, { onDelete: "cascade" }),
  note: text("note").notNull(),
  createdBy: text("created_by").notNull().default("admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertInquirySchema = createInsertSchema(inquiriesTable).omit({ id: true, createdAt: true, status: true });
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiriesTable.$inferSelect;

export const insertInquiryNoteSchema = createInsertSchema(inquiryNotesTable).omit({ id: true, createdAt: true });
export type InsertInquiryNote = z.infer<typeof insertInquiryNoteSchema>;
export type InquiryNote = typeof inquiryNotesTable.$inferSelect;
