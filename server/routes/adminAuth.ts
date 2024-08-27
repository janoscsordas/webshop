import { Hono } from "hono";
import { set7DaysCookie } from "../lib/cookieParser";
import { verifyAdminRoute, loginAdminController, logoutAdminController } from "../controllers/adminController";

export const adminAuthRoute = new Hono()
    // route for admin login
    .post("/login", async (c) => {
        try {
            const { email, password } = await c.req.json()

            const login = await loginAdminController(email, password, process.env.ADMIN_TABLE!)

            c.header('Set-Cookie', `token=${login.token}; Path=/; HttpOnly; Secure; Max-Age=${set7DaysCookie()}`)

            return c.json({ email: login.email }, 200)
        } catch (error: any) {
            // return error message
            return c.json({ message: error.message }, 400)
        }
    })
    // route for logging out the user
    .get("/logout", async (c) => {
        try {
            const cookieHeader = c.req.header("Cookie")

            if (!cookieHeader) {
                throw new Error("No token found")
            }

            const logout = await logoutAdminController(cookieHeader)

            if (!logout) {
                throw new Error("There was an error while trying to logout the user")
            }

            // set the user's cookie to expire on the year 1970 so the browser will remove it and the user will be logged out
            c.header("Set-Cookie", "token=deleted; Path=/; HttpOnly; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT")

            return c.json({ success: true }, 200)
        } catch (error: any) {
            return c.json({ message: error.message }, 400)
        }
    })
    // this route checks if the user is logged in for protected routes in the frontend
    .get("/me", async (c) => {
        try {
            const cookieHeader = c.req.header("Cookie")

            if (!cookieHeader) {
                throw new Error("No cookie found")
            }

            const verifyingUser = await verifyAdminRoute(cookieHeader)

            if (!verifyingUser) {
                throw new Error("User is not logged in")
            }

            return c.json({ success: true }, 201)
        } catch (error: any) {
            return c.json({ message: error.message }, 401)
        }
    })
