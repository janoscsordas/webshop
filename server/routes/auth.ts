import { Hono } from "hono";

// importing userAuth database functions
import { loginUserController, registerUserController, logoutUserController, verifyMeRoute } from "../controllers/userController";
import { set7DaysCookie } from "../lib/cookieParser";
import { updatePassword } from "../database/authentication";

// auth route
export const authRoute = new Hono()
    // login route
    .post("/login", async (c) => {
        try {
            // get email and password from request
            const { email, password } = await c.req.json();

            const login = await loginUserController(email, password)

            c.header('Set-Cookie', `token=${login.token}; Path=/; HttpOnly; Secure; Max-Age=${set7DaysCookie()}`)

            return c.json({ email: login.email } , 200)
        } catch (error: any) {
            return c.json({ message: error.message }, 400)
        }
    })
    // register route, used only in the frontend
    .post("/register", async (c) => {
        try {
            // get email and password from request
            const { email, password } = await c.req.json()

            const register = await registerUserController(email, password)

            if (!register) {
                throw new Error("There was an error while trying to create the user")
            }

            // return success message
            return c.json({ message: "User created successfully!" }, 200)
        } catch (error: any) {
            // return error message
            return c.json({ message: error.message }, 400)
        }
    })
    // route for logging out the user, only used in the frontend
    .get("/logout", async (c) => {
        try {
            const cookieHeader = c.req.header("Cookie")

            if (!cookieHeader) {
                throw new Error("No token found")
            }

            const logout = await logoutUserController(cookieHeader)

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
    // verifier route for the profile page in the frontend
    .get("/me", async (c) => {
        try {
            const cookieHeader = c.req.header("Cookie")

            if (!cookieHeader) {
                throw new Error("No cookie found")
            }

            const verifyingUser = await verifyMeRoute(cookieHeader)

            if (!verifyingUser) {
                throw new Error("User is not logged in")
            }

            return c.json({ success: true }, 200)
        } catch (error: any) {
            return c.json({ message: error.message }, 401)
        }
    })
    // request to update password for the user
    .post("/update-password", async (c) => {
        try {
            const { email, newPassword } = await c.req.json()

            const cookieHeader = c.req.header("Cookie")

            if (!cookieHeader) {
                throw new Error("Unathorized access!")
            }

            const verifyingUser = await verifyMeRoute(cookieHeader)

            if (!verifyingUser) {
                throw new Error("User is not logged in")
            }

            const updatingPassword = await updatePassword(email, await Bun.password.hash(newPassword))

            if (!updatingPassword) {
                throw new Error("There was an error while trying to update the password")
            }

            return c.json({ message: "Successfully updated Password!" }, 200)
        } catch (error: any) {
            return c.json({ message: error.message }, 400)
        }
    })
