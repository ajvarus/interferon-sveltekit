import { INTF_BASE_URL, INTF_AUTH_ENDPOINT } from "$env/static/private";

import type { Actions } from "./$types";

import type { AuthRequest, AuthResponse } from "$lib/types";

export const actions: Actions = {
  default: async ({ request }) => {
    console.log("Hi from server");
    const payload = await request.json();

    const authRequest: AuthRequest = {
      auth_type: "resolve",
      ...payload,
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
        authResponse = {
          success: session.is_active,
          status_code: 200,
          msg: "Signin successful",
        };
        const stringifiedResponse = JSON.stringify(authResponse);
        return stringifiedResponse;
        // return JSON.stringify(authResponse);
      } else {
        return JSON.stringify(authResponse);
      }
    } catch (error) {
      authResponse.status_code = 500;
      authResponse.msg = "Server error. Please try again later.";
      return JSON.stringify(authResponse);
    }
  },
};
