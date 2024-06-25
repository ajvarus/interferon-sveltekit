// src/lib/components/vault/state.vault.ts

import type {
  PasswordEntry,
  Password,
} from "$lib/components/vault/types.svelte";

class AddPasswordsController {
  addedPasswords: PasswordEntry[] = $state([
    { name: "", username: "", password: "" },
  ]);
  drawerOpen: boolean = $state(false);

  addPassword(): void {
    this.addedPasswords.unshift({ name: "", username: "", password: "" });
  }

  removePassword(index: number): void {
    this.addedPasswords.splice(index, 1);
  }

  resetPasswords(): void {
    this.addedPasswords = [{ name: "", username: "", password: "" }];
  }

  toggleDrawer(): void {
    this.drawerOpen = !this.drawerOpen;
  }

  openDrawer(): void {
    this.drawerOpen = true;
  }

  closeDrawer(): void {
    this.drawerOpen = false;
  }
}

export const addPasswordsController = new AddPasswordsController();
