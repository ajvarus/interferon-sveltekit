// src/routes/(app)/services/vault/+page.server.ts

import type { PageServerLoad } from "./$types";

import { gqlClient } from "$lib/graphiq/client";
import { gqlSdk } from "$lib/graphiq/sdk";

import type { GetPasswordsQuery } from "$lib/graphiq/generated";
import { GET_PASSWORDS_QUERY } from "$lib/graphiq/queries/passwords";

export const load: PageServerLoad = async ({ locals }) => {
  const client = gqlClient(String(locals.token));
  try {
    const result = await client
      .query<GetPasswordsQuery>(GET_PASSWORDS_QUERY, {})
      .toPromise();
    return {
      passwords: result.data?.getPasswords || [],
    };
  } catch (error) {
    return {
      passwords: [],
    };
  }
};
