// src/routes/signin/api.ts
import type { AuthResponse } from "$lib/types";

async function signInRequest(email: string, password: string) {
  console.log(email, password);
  let authResponse: AuthResponse = { success: false };
  try {
    const response = await fetch("/signin", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // The Form Action from +page.server.ts returns the JSON within the data attribute.
    // It is therefore extracted as seen below.
    const data = (await response.json()).data;
    authResponse = JSON.parse(JSON.parse(data)[0]);
    console.log(authResponse);
    return authResponse;
  } catch (error) {
    return authResponse;
  }
}

export { signInRequest };
