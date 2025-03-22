import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  phone: text("phone"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
});

export const loginUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const dietPlans = pgTable("diet_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  priceINR: integer("price_inr").notNull(),
  priceUSD: integer("price_usd").notNull(),
  features: text("features").array().notNull(),
  popular: boolean("popular").default(false),
});

export const bmiRecords = pgTable("bmi_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  height: integer("height").notNull(),
  weight: integer("weight").notNull(),
  bmiValue: integer("bmi_value").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = typeof users.$inferSelect;
export type DietPlan = typeof dietPlans.$inferSelect;
export type BMIRecord = typeof bmiRecords.$inferSelect;

export const bmiCalculatorSchema = z.object({
  heightFeet: z.number().min(1, "Height in feet is required"),
  heightInches: z.number().min(0, "Inches must be 0 or greater").max(11, "Inches must be less than 12"),
  weight: z.number().min(1, "Weight is required"),
});

export type BMICalculatorInput = z.infer<typeof bmiCalculatorSchema>;
