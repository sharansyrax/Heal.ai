import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
// test-env.ts
import 'dotenv/config'
console.log("URL from .env:", process.env.DATABASE_URL)

export default defineConfig({
  out: './drizzle',
  schema: './config/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

console.log(process.env.DATABASE_URL!)