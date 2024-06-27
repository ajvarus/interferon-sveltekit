// src/routes/(app)/services/vault/+page.server.ts

import type { PageServerLoad, Actions } from "./$types";

import { gqlClient } from "$lib/graphiq/client";
import { gqlSdk } from "$lib/graphiq/sdk";

import type {
  PasswordInput,
  PasswordDeleteInput,
} from "$lib/graphiq/generated.sdk";

export const load: PageServerLoad = async ({ locals }) => {
  const client = gqlClient(String(locals.token));
  const sdk = gqlSdk(client, "query");
  try {
    const result = await sdk.GetPasswords();
    return {
      passwords: result.getPasswords || [],
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
    const sdk = gqlSdk(client, "mutation");

    let newPasswords: PasswordInput[] = [];
    const formData = await request.formData();
    for (let i = 0; formData.get(`passwords[${i}].name`); i++) {
      newPasswords.push({
        passwordName: formData.get(`passwords[${i}].name`)?.toString() || "",
        username: formData.get(`passwords[${i}].username`)?.toString() || "",
        password: formData.get(`passwords[${i}].password`)?.toString() || "",
      });
    }

    try {
      const result = await sdk.StorePasswords({ passwords: newPasswords });
      return {
        passwords: result.storePasswords || [],
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
  passwordscache: async ({ request, locals }) => {
    console.log("Hi from passwordscache");
    const client = gqlClient(String(locals.token));
    const sdk = gqlSdk(client, "query");

    const formData = await request.formData();
    const id: string = formData.get("id")?.toString() || "";
    const passwordIds: string[] = [id];
    console.log(formData);

    try {
      const result = await sdk.GetPasswordsFromCache({
        passwordIds: passwordIds,
      });
      console.log("All good: ", result);
      return {
        cachedpasswords: result.getPasswordsFromCache || [],
      };
    } catch (error) {
      console.log("All bad: ", error);
      return {
        cachedpasswords: [],
      };
    }
  },
};
