import { pgTable, uuid, varchar ,text,timestamp} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("user", {
  id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(), 
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});
export const usermood = pgTable("usermood", {
  id: uuid("id").primaryKey().defaultRandom(), // optional
  userId: uuid("user_id").references(() => users.id),
  emotion: text("emotion").notNull(),
  thought: text("thought").notNull(),
  response: text("response").notNull(),
});
