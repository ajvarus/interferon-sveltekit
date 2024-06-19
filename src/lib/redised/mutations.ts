import r from "./client";

async function setToken(sessionId: string, token: string) {
  await r.set(sessionId, token);
}

async function deleteToken(sessionId: string) {
  await r.del(sessionId);
}

export { setToken, deleteToken };
