import { loginUser, registerUser } from "../database/authentication";
import { createJWTToken, verifyJWTToken } from "../lib/JWTTokenFunctions";
import { z } from "zod";
import { parseCookies } from "../lib/cookieParser";

// authentication schema for validation
export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long").max(24, "Password can't exceed 24 characters"),
})

// login user
export async function loginUserController(email: string, password: string, table: string = process.env.BASE_AUTH_DB!) {
    if (!email || !password) {
        throw new Error("Missing email or password")
    }

    const parseResult = authSchema.safeParse({ email, password })
    const isValid = parseResult.success

    if (!isValid) {
        throw new Error("Invalid email or password")
    }

    // check if user exists, 3rd option is given because of different tables
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
    const token = await createJWTToken(email)

    if (!token) {
        throw new Error("Failed to create JWT token")
    }

    return { email, token }
}

// register user
export async function registerUserController(email: string, password: string, table: string = process.env.BASE_AUTH_DB!) {
    // check if email and password are not empty
    if (!email || !password) {
        throw new Error("Missing email or password")
    }

    const forbiddenSpecialChars = " ^&(){}|:\"<>?,/;\\"
    // check if password contains special characters
    if (forbiddenSpecialChars.includes(password)) {
        throw new Error(`Password can't contain these special characters: ${forbiddenSpecialChars}`)
    }

    // check if email and password are valid
    const parseResult = authSchema.safeParse({ email, password })
    const isValid = parseResult.success

    if (!isValid) {
        throw new Error("Invalid format for email or password")
    }

    // hash password
    const hashedPassword = await Bun.password.hash(password)

    // register user
    const user = await registerUser(email, hashedPassword, table)

    // check if user already exists
    if (!user) {
        throw new Error("User already exists")
    }

    return { user }
}

// this route logs out the user and removes the token from the cookie
export async function logoutUserController(cookieHeader: string) {
    const cookies = parseCookies(cookieHeader)
    const accessToken = cookies.token

    if (!accessToken) {
        throw new Error("No token found")
    }

    return accessToken
}

// this route checks if the user is logged in for protected routes in the frontend
export async function verifyMeRoute(cookieHeader: string) {
    const cookies = parseCookies(cookieHeader)
    const accessToken = cookies.token

    if (!accessToken) {
        throw new Error("No token found")
    }

    const decoded = verifyJWTToken(accessToken)

    if (!decoded) {
        throw new Error("Invalid token")
    }

    return decoded
}
