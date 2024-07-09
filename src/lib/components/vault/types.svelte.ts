// src/lib/components/vault/types.vault.ts

import type { GetPasswordsQuery } from "$lib/graphiq/generated.sdk";
import type { StorePasswordsMutation } from "$lib/graphiq/generated.sdk";
import type { DeletePasswordsMutation } from "$lib/graphiq/generated.sdk";
import type { GetPasswordsFromCacheQuery } from "$lib/graphiq/generated.sdk";

// The type of passwords stored on the AddPasswordsSheet.
type PasswordEntry = {
  name: string;
  username: string;
  password: string;
};

type Password = GetPasswordsQuery["getPasswords"][number] & {
  decryptedPassword: string;
};

type PasswordGroup = Pick<Password, "groupId" | "passwordName">;

type DeletedPassword = DeletePasswordsMutation["deletePasswords"][number];

type CachedPassword =
  GetPasswordsFromCacheQuery["getPasswordsFromCache"][number];

export type {
  PasswordEntry,
  Password,
  PasswordGroup,
  DeletedPassword,
  CachedPassword,
};
