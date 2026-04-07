import { createClient } from "redis";
import { env } from "./env.config.js";

const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

await redisClient.connect();
console.log('Redis connected successfully!');

export default redisClient;

