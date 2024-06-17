// src/lib/components/signupform/schema.ts

import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email format." }),
  password: z
    .string()
    //.min(8, { message: "Password must be at least 8 characters long" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must include at least one uppercase letter.",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must include at least one lowercase letter.",
    })
    .refine((password) => /\d/.test(password), {
      message: "Password must include at least one number.",
    })
    .refine((password) => /[@$!%*?&]/.test(password), {
      message:
        "Password must include at least one special character (@, $, !, %, *, ?, &).",
    })
    .refine((password) => password.length >= 8, {
      message: "Password must be at least 8 characters long.",
    }),
  confirmPassword: z.string(),
});

export type SignupSchema = typeof signupSchema;
