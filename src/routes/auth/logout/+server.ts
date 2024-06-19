// src/routes/auth/logout/+server.ts

import type { RequestHandler } from "./$types";

import type { AuthResponse } from "$lib/types";

import { makeAuthroizedRequestTo } from "$lib/intf/requests";
import { deleteToken } from "$lib/redised/mutations";

export const GET: RequestHandler = async ({ locals, cookies, request }) => {
  console.log("Hi from logout server");
  console.log(request.redirect);
  let authResponse: AuthResponse = { success: false };
  const response = await makeAuthroizedRequestTo(
    "/logout",
    "POST",
    String(locals.token),
    {}
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
  }
  return new Response(JSON.stringify(authResponse));
};
