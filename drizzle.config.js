/**@type {import('drizzle-kit').Config} */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_DveWU63zHOTg@ep-little-math-aboictac-pooler.eu-west-2.aws.neon.tech/MockMate?sslmode=require&channel_binding=require',
  }
}