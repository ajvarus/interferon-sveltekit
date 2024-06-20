// src/lib/intf/requests.ts

import { INTF_BASE_URL } from "$env/static/private";

async function makeRequestTo(
  intfEndpoint: string,
  method: string,
  body: Object
): Promise<any> {
  const response = await fetch(`${INTF_BASE_URL}${intfEndpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body }),
  });
  return response;
}

async function makeAuthroizedRequestTo(
  intfEndpoint: string,
  method: string,
  token: string,
  body?: Object
): Promise<Response> {
  const response = fetch(`${INTF_BASE_URL}${intfEndpoint}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body }),
  });
  console.log("Hi from intf request maker.");
  return response;
}

export { makeRequestTo, makeAuthroizedRequestTo };
