import { INTF_BASE_URL, INTF_AUTH_ENDPOINT } from "$env/static/private";

import type { Actions } from "./$types";

import type { Credentials, AuthRequest, AuthResponse } from "$lib/types";

import { setToken } from "$lib/redised/mutations";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    console.log("Hi from server");
    const credentials = Object.fromEntries(await request.formData());

    const authRequest: AuthRequest = {
      auth_type: "resolve",
      email: String(credentials.email),
      password: String(credentials.password),
    };
    let authResponse: AuthResponse = { success: false };

    try {
      const response = await fetch(`${INTF_BASE_URL}${INTF_AUTH_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...authRequest }),
      });

      if (response.ok) {
        const session = await response.json();
        await setToken(session.session_id, session.token);
        cookies.set("session_id", session.session_id, {
          path: "/",
        });
        authResponse = {
          success: session.is_active,
          status_code: 200,
          msg: "Signin successful",
        };
        return authResponse;
      }
    } catch (error) {
      authResponse.status_code = 500;
      authResponse.msg = "Server error. Please try again later.";
      return authResponse;
    }
  },
};
