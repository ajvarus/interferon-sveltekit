// src/routes/(app)/services/vault/+page.server.ts

import type { PageServerLoad, Actions } from "./$types";

import { gqlClient } from "$lib/graphiq/client";
import { gqlSdk } from "$lib/graphiq/sdk";

import type {
  PasswordInput,
  PasswordUpdateInput,
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
    throw error;
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
      throw error;
      // return {
      //   passwords: [],
      // };
    }
  },
  update: async ({ request, locals }) => {
    const client = gqlClient(String(locals.token));
    const sdk = gqlSdk(client, "mutation");

    let updatedPasswords: PasswordUpdateInput[] = [];

    const formData = await request.formData();
    const id: number = formData.get("id") ? Number(formData.get("id")) : 0;

    for (let i = id; i == id; i++) {
      updatedPasswords.push({
        id: id.toString(),
        passwordName:
          formData.get(`updatedPasswords[${i}].name`)?.toString() || "",
        username:
          formData.get(`updatedPasswords[${i}].username`)?.toString() || "",
        password:
          formData.get(`updatedPasswords[${i}].password`)?.toString() || "",
      });
    }

    console.log("Formdata", updatedPasswords);

    try {
      const result = await sdk.UpdatePasswords({ passwords: updatedPasswords });
      return {
        updatedPasswords: result.updatePasswords || [],
      };
    } catch (error) {
      throw error;
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

    for (let i = index; i == index; i++) {
      deletedPasswords.push({
        id: formData.get("index")?.toString() || "",
        passwordName: formData.get(`passwords[${i}].name`)?.toString() || "",
      });
    }
    try {
      const result = await sdk.DeletePasswords({ passwords: deletedPasswords });
      return {
        deletedPasswords: result.deletePasswords || [],
      };
    } catch (error) {
      throw error;
      // return {
      //   deletedPasswords: [],
      // };
    }
  },
  passwordscache: async ({ request, locals }) => {
    const client = gqlClient(String(locals.token));
    const sdk = gqlSdk(client, "query");

    const formData = await request.formData();
    const id: string = formData.get("id")?.toString() || "";
    const passwordIds: string[] = [id];

    try {
      const result = await sdk.GetPasswordsFromCache({
        passwordIds: passwordIds,
      });
      return {
        cachedpasswords: result.getPasswordsFromCache || [],
      };
    } catch (error) {
      throw error;
      // return {
      //   cachedpasswords: [],
      // };
    }
  },
};
