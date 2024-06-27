import type { DocumentNode } from "graphql";
import { gql } from "@urql/svelte";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  deletePasswords: Array<PasswordResponse>;
  storePasswords: Array<PasswordResponse>;
};

export type MutationDeletePasswordsArgs = {
  passwords: Array<PasswordDeleteInput>;
};

export type MutationStorePasswordsArgs = {
  passwords: Array<PasswordInput>;
};

export type Password = {
  decryptedPassword: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  passwordName: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type PasswordCacheResponse = {
  decryptedPassword: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
};

export type PasswordDeleteInput = {
  id: Scalars["ID"]["input"];
  passwordName: Scalars["String"]["input"];
};

export type PasswordInput = {
  password: Scalars["String"]["input"];
  passwordName: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type PasswordResponse = {
  encryptedPassword: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  passwordName: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type Query = {
  getPasswords: Array<Password>;
  getPasswordsFromCache: Array<PasswordCacheResponse>;
};

export type QueryGetPasswordsFromCacheArgs = {
  passwordIds: Array<Scalars["String"]["input"]>;
};

export type StorePasswordsMutationVariables = Exact<{
  passwords: Array<PasswordInput> | PasswordInput;
}>;

export type StorePasswordsMutation = {
  storePasswords: Array<{ id: string; passwordName: string; username: string }>;
};

export type DeletePasswordsMutationVariables = Exact<{
  passwords: Array<PasswordDeleteInput> | PasswordDeleteInput;
}>;

export type DeletePasswordsMutation = {
  deletePasswords: Array<{
    id: string;
    passwordName: string;
    encryptedPassword: string;
  }>;
};

export type GetPasswordsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPasswordsQuery = {
  getPasswords: Array<{ id: string; passwordName: string; username: string }>;
};

export type GetPasswordsFromCacheQueryVariables = Exact<{
  passwordIds: Array<Scalars["String"]["input"]> | Scalars["String"]["input"];
}>;

export type GetPasswordsFromCacheQuery = {
  getPasswordsFromCache: Array<{ id: string; decryptedPassword: string }>;
};

export const StorePasswordsDocument = gql`
  mutation StorePasswords($passwords: [PasswordInput!]!) {
    storePasswords(passwords: $passwords) {
      id
      passwordName
      username
    }
  }
`;
export const DeletePasswordsDocument = gql`
  mutation DeletePasswords($passwords: [PasswordDeleteInput!]!) {
    deletePasswords(passwords: $passwords) {
      id
      passwordName
      encryptedPassword
    }
  }
`;
export const GetPasswordsDocument = gql`
  query GetPasswords {
    getPasswords {
      id
      passwordName
      username
    }
  }
`;
export const GetPasswordsFromCacheDocument = gql`
  query GetPasswordsFromCache($passwordIds: [String!]!) {
    getPasswordsFromCache(passwordIds: $passwordIds) {
      id
      decryptedPassword
    }
  }
`;
export type Requester<C = {}> = <R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: C
) => Promise<R> | AsyncIterable<R>;
export function getSdk<C>(requester: Requester<C>) {
  return {
    StorePasswords(
      variables: StorePasswordsMutationVariables,
      options?: C
    ): Promise<StorePasswordsMutation> {
      return requester<StorePasswordsMutation, StorePasswordsMutationVariables>(
        StorePasswordsDocument,
        variables,
        options
      ) as Promise<StorePasswordsMutation>;
    },
    DeletePasswords(
      variables: DeletePasswordsMutationVariables,
      options?: C
    ): Promise<DeletePasswordsMutation> {
      return requester<
        DeletePasswordsMutation,
        DeletePasswordsMutationVariables
      >(
        DeletePasswordsDocument,
        variables,
        options
      ) as Promise<DeletePasswordsMutation>;
    },
    GetPasswords(
      variables?: GetPasswordsQueryVariables,
      options?: C
    ): Promise<GetPasswordsQuery> {
      return requester<GetPasswordsQuery, GetPasswordsQueryVariables>(
        GetPasswordsDocument,
        variables,
        options
      ) as Promise<GetPasswordsQuery>;
    },
    GetPasswordsFromCache(
      variables: GetPasswordsFromCacheQueryVariables,
      options?: C
    ): Promise<GetPasswordsFromCacheQuery> {
      return requester<
        GetPasswordsFromCacheQuery,
        GetPasswordsFromCacheQueryVariables
      >(
        GetPasswordsFromCacheDocument,
        variables,
        options
      ) as Promise<GetPasswordsFromCacheQuery>;
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
