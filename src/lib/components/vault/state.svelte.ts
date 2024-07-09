// src/lib/components/vault/state.vault.ts

import type {
  PasswordEntry,
  Password,
  PasswordGroup,
  GroupedPasswords,
} from "$lib/components/vault/types.svelte";

class AddPasswordsController {
  addedPasswords: PasswordEntry[] = $state([
    { name: "", username: "", password: "" },
  ]);
  passwordGroups: PasswordGroup[] = $state([]);
  passwordGroupsMap: Map<string, PasswordGroup> = $state(new Map());
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
    this.passwordGroupsMap = groups;
    return Array.from(groups.values());
  }
}

class PasswordsController {
  groupPasswords(passwords: Password[]): GroupedPasswords {
    let groupedPasswords: GroupedPasswords = {};

    groupedPasswords = passwords.reduce<GroupedPasswords>((acc, password) => {
      const key = password.groupId;

      if (!acc[key]) acc[key] = [];
      acc[key].push(password);

      return acc;
    }, {} as GroupedPasswords);
    return groupedPasswords;
  }
}

export const addPasswordsController = new AddPasswordsController();
export const passwordsController = new PasswordsController();
