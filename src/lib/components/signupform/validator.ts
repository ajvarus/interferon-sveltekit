// src/lib/components/signupform/validator.ts

import { z } from "zod";
import { signupSchema, type SignupSchema } from "./schema";

export class Validator {
  static validateEmail(email: string): {
    isValid: boolean;
    error: string | undefined;
  } {
    const passwordSchema = signupSchema.pick({ email: true });
    const result = passwordSchema.safeParse({ email });
    const errorMsg = result.error?.flatten().fieldErrors.email?.[0];
    return { isValid: result.success, error: errorMsg ? errorMsg : "" };
    // return emailRegex.test(email);
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  }

  static async checkIfEmailExists(email: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(email === "existing@example.com"); // Example email check
      }, 500);
    });
  }

  static validatePassword(password: string): {
    isValid: boolean;
    error: string | undefined;
  } {
    const passwordSchema = signupSchema.pick({ password: true });
    const result = passwordSchema.safeParse({ password });
    const errorMsg = result.error?.flatten().fieldErrors.password?.[0];
    return { isValid: result.success, error: errorMsg ? errorMsg : "" };
  }

  static matchPasswords(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

  static validateForm(
    isValidEmail: boolean,
    isPasswordValid: boolean,
    isConfirmPasswordValid: boolean,
    emailExists: boolean
  ): boolean {
    return (
      isValidEmail &&
      isPasswordValid &&
      (!emailExists ? isConfirmPasswordValid : true)
    );
  }

  static async submitForm(email: string, password: string) {}
}
