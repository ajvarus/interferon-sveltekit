// src/lib/graphiq/mutations/passwords.ts

import { gql } from "@urql/svelte";

export const STORE_PASSWORDS_MUTATION = gql`
  mutation StorePasswords($passwords: [PasswordInput!]!) {
    storePasswords(passwords: $passwords) {
      id
      passwordName
    }
  }
`;
