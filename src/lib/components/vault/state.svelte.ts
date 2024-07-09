// src/lib/components/vault/state.vault.ts

import type {
  PasswordEntry,
  Password,
  PasswordGroup,
} from "$lib/components/vault/types.svelte";

class AddPasswordsController {
  addedPasswords: PasswordEntry[] = $state([
    { name: "", username: "", password: "" },
  ]);
  passwordGroups: PasswordGroup[] = $state([]);
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

  toPasswordGroup(password: Password): PasswordGroup {
    return {
      passwordName: password.passwordName,
      groupId: password.groupId,
    };
  }

  groupPasswords(passwords: Password[]): PasswordGroup[] {
    const groups = new Map<string, PasswordGroup>();

    passwords.forEach((password) => {
      const key = password.groupId;
      if (!groups.has(key)) {
        groups.set(key, this.toPasswordGroup(password));
      }
    });

    this.passwordGroups = Array.from(groups.values());
    return Array.from(groups.values());
  }
}

export const addPasswordsController = new AddPasswordsController();
