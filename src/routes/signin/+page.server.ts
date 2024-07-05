import { INTF_AUTH_ENDPOINT } from "$env/static/private";

import type { PageServerLoad, Actions } from "./$types";

import type { AuthRequest, AuthResponse } from "$lib/types";
import { makeRequestTo } from "$lib/intf/requests";

import { setToken } from "$lib/redised/mutations";

export const load: PageServerLoad = async ({ cookies }) => {
  const sessionTerminated = cookies.get("session_terminated") === "true";
  // if (sessionTerminated) {
  //   cookies.delete("session_terminated", { path: "/" });
  // }
  return { sessionTerminated };
};

export const actions: Actions = {
  resolve: async ({ request, cookies }) => {
    const credentials = Object.fromEntries(await request.formData());

    const authRequest: AuthRequest = {
      auth_type: "resolve",
      email: String(credentials.email),
      password: String(credentials.password),
    };
    let authResponse: AuthResponse = { success: false };

    try {
      const response = await makeRequestTo(
        INTF_AUTH_ENDPOINT,
        "POST",
        authRequest
      );

      if (response.ok) {
        const session = await response.json();
        if (session.error_info) {
          authResponse = {
            success: false,
            status_code: session.error_info.code,
            msg: session.error_info.message,
            user_id: session.user_id,
          };
        } else if (session.is_active) {
          await setToken(session.session_id, session.token);
          cookies.set("session_id", session.session_id, {
            path: "/",
          });
          authResponse = {
            success: session.is_active,
            status_code: 200,
            msg: "Signin successful",
          };
        }
      } else {
        authResponse = {
          success: false,
          status_code: response.status,
          msg: "Signin failed.",
        };
      }
    } catch (error) {
      authResponse.status_code = 500;
      authResponse.msg = "Server error. Please try again later.";
    } finally {
      return authResponse;
    }
  },

  terminate: async ({ request }) => {
    let authResponse: AuthResponse = { success: false };
    const user_id = String((await request.formData()).get("user_id"));
    try {
      const response = await makeRequestTo(
        `${INTF_AUTH_ENDPOINT}/terminate-all-sessions`,
        "POST",
        {
          user_id: user_id,
        }
      );
      if (response.ok) {
        const result = await response.json();
        authResponse.success = result;
      } else {
        throw Error("Server error.");
      }
    } catch (error) {
      authResponse.success = false;
    } finally {
      return authResponse;
    }
  },
};
