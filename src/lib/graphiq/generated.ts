export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  deletePasswords: Array<PasswordResponse>;
  storePasswords: Array<Password>;
};


export type MutationDeletePasswordsArgs = {
  passwords: Array<PasswordDeleteInput>;
};


export type MutationStorePasswordsArgs = {
  passwords: Array<PasswordInput>;
};

export type Password = {
  decryptedPassword: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  passwordName: Scalars['String']['output'];
};

export type PasswordCacheResponse = {
  decryptedPassword: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type PasswordDeleteInput = {
  id: Scalars['ID']['input'];
  passwordName: Scalars['String']['input'];
};

export type PasswordInput = {
  password: Scalars['String']['input'];
  passwordName: Scalars['String']['input'];
};

export type PasswordResponse = {
  encryptedPassword: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  passwordName: Scalars['String']['output'];
};

export type Query = {
  getPasswords: Array<Password>;
  getPasswordsFromCache: Array<PasswordCacheResponse>;
};


export type QueryGetPasswordsFromCacheArgs = {
  passwordIds: Array<Scalars['ID']['input']>;
};

export type StorePasswordsMutationVariables = Exact<{
  passwords: Array<PasswordInput> | PasswordInput;
}>;


export type StorePasswordsMutation = { storePasswords: Array<{ id: string, passwordName: string }> };

export type DeletePasswordsMutationVariables = Exact<{
  passwords: Array<PasswordDeleteInput> | PasswordDeleteInput;
}>;


export type DeletePasswordsMutation = { deletePasswords: Array<{ id: string, passwordName: string, encryptedPassword: string }> };

export type GetPasswordsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPasswordsQuery = { getPasswords: Array<{ id: string, passwordName: string, decryptedPassword: string }> };
