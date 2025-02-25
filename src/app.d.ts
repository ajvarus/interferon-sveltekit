// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      token?: string;
      sessionTerminated?: boolean;
    }
    // interface Error {}
    interface PageData {
      sessionTerminated?: boolean;
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
