// src/lib/redised/client.ts

import Redis from "ioredis";
import { REDIS_URL_DEV } from "$env/static/private";

const r = new Redis(REDIS_URL_DEV);

export default r;
