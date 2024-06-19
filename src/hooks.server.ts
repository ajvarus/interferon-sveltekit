// src/hooks.server.ts

import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

import { getToken } from "$lib/redised/queries";

export const handle: Handle = async ({ event, resolve }) => {
  const path = event.url.pathname;
  const sessionId = event.cookies.get("session_id");
  const token: string | null = sessionId ? await getToken(sessionId) : null;

  if (path === "/") return await resolve(event);
  if (path === "/signin") {
    if (token) throw redirect(302, "/dashboard");
    return await resolve(event);
  }
  if (!token) throw redirect(303, "/signin");

  event.locals.token = token;
  return await resolve(event);
};
