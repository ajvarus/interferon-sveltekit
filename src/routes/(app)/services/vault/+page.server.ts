// src/routes/(app)/services/vault/+page.server.ts

import type { PageServerLoad, Actions } from "./$types";

import { gqlClient } from "$lib/graphiq/client";
import { gqlSdk } from "$lib/graphiq/sdk";

import type { GetPasswordsQuery } from "$lib/graphiq/generated";
import { GET_PASSWORDS_QUERY } from "$lib/graphiq/queries/passwords";

import type {
  PasswordInput,
  PasswordDeleteInput,
  StorePasswordsMutation,
} from "$lib/graphiq/generated.sdk";
import { StorePasswordsDocument } from "$lib/graphiq/generated.sdk";

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

export const actions: Actions = {
  store: async ({ request, locals }) => {
    const client = gqlClient(String(locals.token));

    let newPasswords: PasswordInput[] = [];
    const formData = await request.formData();
    for (let i = 0; formData.get(`passwords[${i}].name`); i++) {
      newPasswords.push({
        passwordName: formData.get(`passwords[${i}].name`)?.toString() || "",
        password: formData.get(`passwords[${i}].password`)?.toString() || "",
      });
    }

    try {
      const result = await client
        .mutation<StorePasswordsMutation>(StorePasswordsDocument, {
          passwords: newPasswords,
        })
        .toPromise();
      // const result = await sdk.StorePasswords({ passwords: newPasswords });
      return {
        passwords: result.data?.storePasswords || [],
      };
    } catch (error) {
      return {
        passwords: [],
      };
    }
  },
  delete: async ({ request, locals }) => {
    const client = gqlClient(String(locals.token));
    const sdk = gqlSdk(client, "mutation");
    const formData = await request.formData();
    const deletedPasswords: PasswordDeleteInput[] = [];
    const index: number = formData.get("index")
      ? Number(formData.get("index"))
      : 0;

    console.log(formData);
    for (let i = index; i == index; i++) {
      deletedPasswords.push({
        id: formData.get("index")?.toString() || "",
        passwordName: formData.get(`passwords[${i}].name`)?.toString() || "",
      });
    }
    console.log("deletedPasswords", deletedPasswords);
    try {
      const result = await sdk.DeletePasswords({ passwords: deletedPasswords });
      return {
        deletedPasswords: result.deletePasswords || [],
      };
    } catch (error) {
      return {
        deletedPasswords: [],
      };
    }
  },
};
