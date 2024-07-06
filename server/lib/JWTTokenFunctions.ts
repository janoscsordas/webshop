import jwt from "jsonwebtoken"

// importing secret key
const secretKey = process.env.JWT_SECRET!

// signing json webtoken for user
export const createJWTToken = async (email: string) => {
    const token = jwt.sign({ email }, secretKey, { expiresIn: "7d" })
    return token
}

// verifying json webtoken
export const verifyJWTToken = async (token: string) => {
    const decoded = jwt.verify(token, secretKey)
    return decoded
}