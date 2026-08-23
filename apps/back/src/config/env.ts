import { z } from "zod";
const schema = z.object({ PORT: z.coerce.number().int().positive().default(4000), CORS_ORIGIN: z.string().default("http://localhost:3000") });
export const env = schema.parse(process.env);
