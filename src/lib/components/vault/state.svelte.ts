// src/lib/components/vault/state.vault.ts

import type {
  PasswordEntry,
  PasswordEntryErrors,
  Password,
  PasswordGroup,
  GroupedPasswords,
  UniquePasswordsMap,
} from "$lib/components/vault/types.svelte";

import { passwordSchema } from "./schema";

class AddPasswordsController {
  addedPasswords: PasswordEntry[] = $state([
    { name: "", username: "", password: "" },
  ]);
  passwordGroups: PasswordGroup[] = $state([]);
  passwordGroupsMap: Map<string, PasswordGroup> = $state(new Map());

  uniquePasswordsMap: UniquePasswordsMap = $state(new Map());

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

  mapUniquePasswords(passwords: Password[]): UniquePasswordsMap {
    const mapping: UniquePasswordsMap = new Map();

    passwords.forEach((password) => {
      const key = password.passwordName.toLowerCase();
      if (!mapping.has(key)) {
        mapping.set(key, new Set());
      }
      mapping.get(key)!.add(password.username.toLowerCase());
    });

    this.uniquePasswordsMap = mapping;
    return mapping;
  }

  isDuplicatePassword(index: number): boolean {
    const passwordEntry = this.addedPasswords[index];
    const key = passwordEntry.name.toLowerCase();
    const username = passwordEntry.username.toLowerCase();

    // Checks if password being added is present in the main passwords list.
    if (
      this.uniquePasswordsMap.has(key) &&
      this.uniquePasswordsMap.get(key)!.has(username)
    ) {
      return true;
    }

    // Checks if password being added is present in the list of added passwords.
    let isPresentOnList = this.addedPasswords.some(
      (entry, i) =>
        i !== index && // Skip the current password entry
        entry.name.toLowerCase() === key &&
        entry.username.toLowerCase() === username
    );
    return isPresentOnList;
  }

  validatePassword(index: number): boolean {
    const passwordEntry = this.addedPasswords[index];
    const errors: PasswordEntryErrors = {};

    const res = passwordSchema.safeParse(passwordEntry);
    if (!res.success) {
      res.error.issues.forEach((issue) => {
        if (issue.path[0] in passwordEntry) {
          errors[issue.path[0] as keyof PasswordEntryErrors] = issue.message;
        }
      });

      this.addedPasswords[index].errors = errors;
      return false;
    }
    return true;
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
