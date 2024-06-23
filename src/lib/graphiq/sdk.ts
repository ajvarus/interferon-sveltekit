// src/lib/graphiq/sdk.ts

import { getSdk, type Sdk, type Requester } from "./generated.sdk";
import type { DocumentNode } from "graphql";
import type { TypedDocumentNode } from "@urql/svelte";

import type { Client } from "@urql/svelte";

function urqlClientToRequester(client: Client): Requester {
  return async (doc: DocumentNode, variables: any) => {
    const result = await client.query(doc, variables).toPromise();
    if (result.error) {
      throw result.error;
    }
    return result.data;
  };
}

export function gqlSdk(client: Client): Sdk {
  return getSdk(urqlClientToRequester(client));
}
