import { z } from "zod";

const envSchema = z.object({
  FIREBASE_DB_URL: z.string().url(),
  SFTP_HOST: z.string(),
  SFTP_USER: z.string(),
  SFTP_PASSWORD: z.string(),
  // Cloud Run / GCP specific
  PROJECT_ID: z.string(),
});

export const env = envSchema.parse(process.env);
