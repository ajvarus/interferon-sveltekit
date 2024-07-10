// src/lib/components/vault/schema.ts

import { z } from "zod";

const passwordSchema = z.object({
  name: z.string().min(1, "Password name is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const passwordsArraySchema = z.array(passwordSchema);

export { passwordSchema, passwordsArraySchema };
