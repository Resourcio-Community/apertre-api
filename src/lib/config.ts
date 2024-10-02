import { PrismaClient } from "@prisma/custom-client"

export const db = new PrismaClient({
    log: ["info", "warn", "error"]
})
