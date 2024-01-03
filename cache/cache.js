import { RedisFlushModes, createClient } from "redis"

export const REDIS_CLIENT = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
})
