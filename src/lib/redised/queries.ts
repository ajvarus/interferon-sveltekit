import r from "./client";

async function getToken(sessionId: string) {
  const token = await r.get(sessionId);
  return token;
}

export { getToken };
