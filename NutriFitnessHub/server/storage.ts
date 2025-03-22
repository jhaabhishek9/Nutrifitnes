import { users, type User, type InsertUser } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { eq } from "drizzle-orm";
import connectPg from "connect-pg-simple";

const { Pool } = pg;

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

// Database connection setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create drizzle instance
const db = drizzle(pool);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  initDb(): Promise<void>;
  sessionStore: session.Store;
}

// PostgreSQL storage implementation
export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async initDb(): Promise<void> {
    try {
      // Create tables if they don't exist
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          first_name TEXT,
          last_name TEXT,
          email TEXT,
          phone TEXT
        );
        
        CREATE TABLE IF NOT EXISTS diet_plans (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT NOT NULL,
          price_inr INTEGER NOT NULL,
          price_usd INTEGER NOT NULL,
          features TEXT[] NOT NULL,
          popular BOOLEAN DEFAULT false
        );
        
        CREATE TABLE IF NOT EXISTS bmi_records (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL,
          height INTEGER NOT NULL,
          weight INTEGER NOT NULL,
          bmi_value INTEGER NOT NULL,
          category TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `);
      console.log("Database initialized successfully");
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Ensure all nullable fields are explicitly set to null if not provided
    const userData = {
      ...insertUser,
      firstName: insertUser.firstName ?? null,
      lastName: insertUser.lastName ?? null,
      email: insertUser.email ?? null,
      phone: insertUser.phone ?? null
    };
    
    const result = await db.insert(users).values(userData).returning();
    return result[0];
  }
}

// In-memory storage implementation for fallback
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  async initDb(): Promise<void> {
    // No initialization needed for memory storage
    return Promise.resolve();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    // Ensure all nullable fields are explicitly set to null if not provided
    const user: User = { 
      ...insertUser, 
      id,
      firstName: insertUser.firstName ?? null,
      lastName: insertUser.lastName ?? null,
      email: insertUser.email ?? null,
      phone: insertUser.phone ?? null
    };
    this.users.set(id, user);
    return user;
  }
}

// Use PostgreSQL storage if DATABASE_URL is available, otherwise use in-memory
export const storage = process.env.DATABASE_URL 
  ? new DatabaseStorage() 
  : new MemStorage();
