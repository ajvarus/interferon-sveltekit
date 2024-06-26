// src/lib/graphiq/sdk.ts

import { getSdk, type Sdk, type Requester } from "./generated.sdk";
import type { DocumentNode } from "graphql";
import type { TypedDocumentNode } from "@urql/svelte";

import type { Client } from "@urql/svelte";

function urqlClientToRequester(
  client: Client,
  opType: "query" | "mutation"
): Requester {
  return async (doc: DocumentNode, variables: any) => {
    let result;
    if (opType === "query") {
      result = await client.query(doc, variables).toPromise();
    } else {
      result = await client.mutation(doc, variables).toPromise();
    }
    if (result.error) {
      throw result.error;
    }
    return result.data;
  };
}

export function gqlSdk(client: Client, opType: "query" | "mutation"): Sdk {
  return getSdk(urqlClientToRequester(client, opType));
}
