// src/lib/components/signupform/stores.ts

import { type Writable, writable } from "svelte/store";

export const email: Writable<string> = writable("");
export const isValidEmail: Writable<boolean> = writable(false);
export const emailExists: Writable<boolean> = writable(false);

export const isPasswordValid: Writable<boolean> = writable(false);
export const isConfirmPasswordValid: Writable<boolean> = writable(false);

export const isSubmittable: Writable<boolean> = writable(false);
