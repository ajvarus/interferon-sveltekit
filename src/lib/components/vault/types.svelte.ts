// src/lib/components/vault/types.vault.ts

import type { StorePasswordsMutation } from "$lib/graphiq/generated.sdk";

// The type of passwords stored on the AddPasswordsSheet.
type PasswordEntry = {
  name: string;
  username: string;
  password: string;
};

type Password = StorePasswordsMutation["storePasswords"][number] & {
  decryptedPassword: string;
};

export type { PasswordEntry, Password };
