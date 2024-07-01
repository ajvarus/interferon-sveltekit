// src/lib/components/signupform/types.svelte.ts

const FormStates = {
  NEUTRAL: "NEUTRAL",
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
} as const;

type FormState = (typeof FormStates)[keyof typeof FormStates];

export { FormStates, type FormState };
