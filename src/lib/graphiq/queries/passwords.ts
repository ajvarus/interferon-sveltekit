// src/lib/graphiq/queries/passwords.ts

import { gql } from "@urql/svelte";

export const GET_PASSWORDS_QUERY = gql`
  query GetPasswords {
    getPasswords {
      id
      passwordName
      decryptedPassword
    }
  }
`;
