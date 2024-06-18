import r from "./client";

async function setToken(sessionId: string, token: string) {
  await r.set(sessionId, token);
}

export { setToken };
