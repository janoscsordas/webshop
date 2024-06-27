import jwt from "jsonwebtoken"

const secretKey = process.env.JWT_SECRET!

export const createJWTToken = async (email: string) => {
    const token = await jwt.sign({ email }, secretKey, { expiresIn: "7d" })
    return token
}

export const verifyJWTToken = async (token: string) => {
    const decoded = await jwt.verify(token, secretKey)
    return decoded
}