// src/lib/graphiq/client.ts

import { INTF_BASE_URL, INTF_GRAPHQL_ENDPOINT } from "$env/static/private";

import { createClient, cacheExchange, fetchExchange } from "@urql/svelte";

export function gqlClient(token: string) {
  return createClient({
    url: `${INTF_BASE_URL}${INTF_GRAPHQL_ENDPOINT}`,
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    exchanges: [cacheExchange, fetchExchange],
  });
}
