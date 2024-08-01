import { createMiddleware } from "hono/factory"

import { parseCookies } from "./cookieParser"
import { verifyJWTToken } from "./JWTTokenFunctions"

const authMiddleware = createMiddleware(async (c, next) => {
    try {
        const cookiesHeader = c.req.header("Cookie")

        if (!cookiesHeader) {
            throw new Error("You are unauthorized")
        }

        const cookieToken = parseCookies(cookiesHeader)
        const token = cookieToken.token

        const decoded = verifyJWTToken(token)

        if (!decoded) {
            throw new Error("Invalid token")
        }
        
        await next()
    } catch (error: any) {
        return c.json({ message: error.message }, 401)
    }
})

export default authMiddleware