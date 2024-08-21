import { loginUser } from "../database/authentication";
import { createAdminJWTToken, verifyAdminJWTToken } from "../lib/JWTTokenFunctions";
import { z } from "zod";
import { parseCookies } from "../lib/cookieParser";

// authentication schema for validation
export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long").max(24, "Password can't exceed 24 characters"),
})

// login admin controller
export async function loginAdminController(email: string, password: string, table: string) {
    if (!email || !password) {
        throw new Error("Missing email or password")
    }

    const parseResult = authSchema.safeParse({ email, password })
    const isValid = parseResult.success

    if (!isValid) {
        throw new Error("Invalid email or password")
    }

    // check if user exists, 2nd option is given because of different tables
    const user = await loginUser(email, table)

    // check if user is found
    if (user === null) {
        throw new Error("User not found")
    }

    // check if password is correct
    const isMatching = await Bun.password.verify(password, user.password)

    // if password is incorrect throw error
    if (!isMatching) {
        throw new Error("Invalid password")
    }

    // create jwt token for user
    const token = await createAdminJWTToken(email)

    if (!token) {
        throw new Error("Failed to create JWT token")
    }

    return { email, token }
}

// this route logs out the admin and removes the token from the cookie
export async function logoutAdminController(cookieHeader: string) {
    const cookies = parseCookies(cookieHeader)
    const accessToken = cookies.token

    if (!accessToken) {
        throw new Error("No token found")
    }

    return accessToken
}

// this route checks if the admin is logged in for protected routes in the frontend
export async function verifyAdminRoute(cookieHeader: string) {
    const cookies = parseCookies(cookieHeader)
    const accessToken = cookies.token

    if (!accessToken) {
        throw new Error("No token found")
    }

    const decoded = verifyAdminJWTToken(accessToken)

    if (!decoded) {
        throw new Error("Invalid token")
    }

    return decoded
}
