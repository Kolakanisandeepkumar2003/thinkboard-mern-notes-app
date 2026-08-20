import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis"

import dotenv from "dotenv"

dotenv.config()

//create a ratelimiter that allows 10 requests per 20 seconds
const ratelimit = new Ratelimit({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(10,"20 s")
});

export default ratelimit;


// import { Redis } from "@upstash/redis";
// import { Ratelimit } from "@upstash/ratelimit";

// const redis = new Redis({
//     url: process.env.UPSTASH_REDIS_REST_URL,
//     token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });

// export const ratelimit = new Ratelimit({
//     redis,
//     limiter: Ratelimit.slidingWindow(20, "10 s"),
// });