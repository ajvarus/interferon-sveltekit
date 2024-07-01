// src/lib/components/signupform/state.svelte.ts

import { signupSchema } from "./schema";
import { type FormState, FormStates } from "./types";

import { makeRequestTo } from "$lib/intf/requests";

class SignupFormController {
  // EmailField states
  email: string = $state("");
  isEmailValid: boolean = $state(false);
  emailExists: boolean = $state(false);
  emailValidationError: string = $state("");

  // PasswordField states
  password: string = $state("");
  confirmPassword: string = $state("");
  passwordValidationError: string = $state("");
  isPasswordValid: boolean = $state(false);
  isConfirmPasswordValid: boolean = $state(false);
  confirmPasswordValidationError: string = $state("");

  // Form states
  formState: FormState = $state(FormStates.NEUTRAL);
  isSubmittable: boolean = $state(false);

  validateEmail(): void {
    const passwordSchema = signupSchema.pick({ email: true });
    const result = passwordSchema.safeParse({ email: this.email });
    const errorMsg = result.error?.flatten().fieldErrors.email?.[0];
    this.isEmailValid = result.success;
    this.emailValidationError = errorMsg ? errorMsg : "";
  }

  async checkIfEmailExists(): Promise<void> {
    try {
      const response = await makeRequestTo("/auth/exists", "POST", {
        email: this.email,
      });
      this.emailExists = (await response.json()) as boolean;
      console.log("emailExists: ", this.emailExists);
    } catch (error) {
      console.error(error);
    }
  }

  validatePassword(): void {
    const passwordSchema = signupSchema.pick({ password: true });
    const result = passwordSchema.safeParse({ password: this.password });
    const errorMsg = result.error?.flatten().fieldErrors.password?.[0];
    this.isPasswordValid = result.success;
    this.passwordValidationError = errorMsg ? errorMsg : "";
  }

  matchPasswords(): void {
    this.isConfirmPasswordValid = this.password === this.confirmPassword;
    if (!this.isConfirmPasswordValid) {
      this.confirmPasswordValidationError = "Passwords do not match.";
    }
  }

  validateForm(): boolean {
    this.isSubmittable =
      this.isEmailValid &&
      this.isPasswordValid &&
      (!this.emailExists ? this.isConfirmPasswordValid : true);
    return this.isSubmittable;
  }

  resetFormState() {
    setTimeout(() => {
      this.formState = FormStates.NEUTRAL;
    }, 2000);
    this.password = "";
    this.confirmPassword = "";
  }
}

export const signupFormController = new SignupFormController();
