import jwt from "jsonwebtoken"

// importing secret key
const secretKey = process.env.JWT_SECRET!

// importing admin secret key
const adminSecretKey = process.env.JWT_ADMIN_SECRET!

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

// verifiers for admin jwt tokens
export const createAdminJWTToken = async (email: string) => {
    const token = jwt.sign({ email }, adminSecretKey, { expiresIn: "7d" })
    return token
}

export const verifyAdminJWTToken = async (email: string) => {
    const decoded = jwt.verify(email, adminSecretKey)
    return decoded
}
