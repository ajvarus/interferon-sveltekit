// src/lib/components/signupform/stores.ts

import { type Writable, writable } from "svelte/store";

import type { AuthResponse } from "$lib/types";

// Email stores
export const email: Writable<string> = writable("");
export const isValidEmail: Writable<boolean> = writable(false);
export const emailExists: Writable<boolean> = writable(false);

// Password stores
export const password: Writable<string> = writable("");
export const isPasswordValid: Writable<boolean> = writable(false);
export const isConfirmPasswordValid: Writable<boolean> = writable(false);

// Form stores
export const isSubmittable: Writable<boolean> = writable(false);

// Auth stores
export const authResponse: Writable<AuthResponse> = writable({
  success: false,
});
