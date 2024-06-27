import { Hono } from "hono";

// importing userAuth database functions
import { loginUserController, registerUserController, logoutUserController, verifyMeRoute } from "../controllers/userController";
import { set7DaysCookie } from "../lib/cookieParser";

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
            return c.json({ error: error.message }, 400)
        }
    })
    // register route
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
            return c.json({ error: error.message }, 400)
        }
    })
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
            return c.json({ success: false, error: error.message }, 400)
        }
    })
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
            return c.json({ success: false, error: error.message }, 400)
        }
    })