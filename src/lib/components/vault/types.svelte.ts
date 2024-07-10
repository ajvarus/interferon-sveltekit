// src/lib/components/vault/types.vault.ts

import type { GetPasswordsQuery } from "$lib/graphiq/generated.sdk";
import type { StorePasswordsMutation } from "$lib/graphiq/generated.sdk";
import type { DeletePasswordsMutation } from "$lib/graphiq/generated.sdk";
import type { GetPasswordsFromCacheQuery } from "$lib/graphiq/generated.sdk";

// The type of passwords stored on the AddPasswordsSheet.
type PasswordEntryErrors = {
  name?: string;
  username?: string;
  password?: string;
};

type PasswordEntry = {
  name: string;
  username: string;
  password: string;
  errors?: PasswordEntryErrors;
};

type Password = GetPasswordsQuery["getPasswords"][number] & {
  decryptedPassword: string;
};

type UniquePasswordsMap = Map<
  Password["passwordName"],
  Set<Password["username"]>
>;

// Below type is used to type of list of unqiue password groups.
type PasswordGroup = Pick<Password, "groupId" | "passwordName">;
// Below type is used to group passwords by their groupId.
type GroupedPasswords = Record<string, Password[]>;

type DeletedPassword = DeletePasswordsMutation["deletePasswords"][number];

type CachedPassword =
  GetPasswordsFromCacheQuery["getPasswordsFromCache"][number];

export type {
  PasswordEntry,
  PasswordEntryErrors,
  Password,
  PasswordGroup,
  GroupedPasswords,
  UniquePasswordsMap,
  DeletedPassword,
  CachedPassword,
};
