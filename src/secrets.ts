import dotenv from 'dotenv';

dotenv.config();
const db_api = process.env.DB_API
export const config = {
  DB_API: process.env.DB_API || 'ERROR',  // Provide a default value if needed
  CLOUD_API_KEY: process.env.CLOUD_API_KEY || 'ERROR',  // Provide a default value if needed
  CLOUD_NAME: process.env.CLOUD_NAME || 'ERROR',  // Provide a default value if needed
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET || 'ERROR',  // Provide a default value if needed
  MAIL_KEY: process.env.MAIL_KEY || 'ERROR',  // Provide a default value if needed
  };