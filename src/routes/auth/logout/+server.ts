// src/routes/auth/logout/+server.ts

import { INTF_AUTH_ENDPOINT } from "$env/static/private";

import type { RequestHandler } from "./$types";

import type { AuthResponse } from "$lib/types";

import { makeAuthroizedRequestTo } from "$lib/intf/requests";
import { deleteToken } from "$lib/redised/mutations";

export const GET: RequestHandler = async ({ locals, cookies }) => {
  let authResponse: AuthResponse = { success: false };
  const response = await makeAuthroizedRequestTo(
    `${INTF_AUTH_ENDPOINT}/signout`,
    "POST",
    String(locals.token)
  );
  if (response.ok) {
    const session = await response.json();
    authResponse.success = !session.is_active;
    authResponse.status_code = 200;
    authResponse.msg = "Logout successful";

    cookies.delete("session_id", {
      path: "/",
    });
    await deleteToken(session.session_id);
    console.log("Logout successful");
  }
  return new Response(JSON.stringify(authResponse));
};
