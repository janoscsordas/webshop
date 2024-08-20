// importing database connection
import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { pool } from "./getDatabaseConnection"

// mysql query for login a user
export async function loginUser(email: string, table: string = process.env.BASE_AUTH_DB!) {
    const [rows]: Array<any> = await pool.query(`
        SELECT * FROM ${table}
        WHERE email = ?`,
        [email]
    )

    const user = rows[0] || null

    return user
}

// mysql query for registering a user
export async function registerUser(email: string, password: string, table: string = process.env.BASE_AUTH_DB!) {
    const [isRegistered]: Array<any> = await pool.query(`
        SELECT * FROM ${table}
        WHERE email = ?`,
        [email]
    )

    // if user is already registered, return null
    if (isRegistered.length > 0) {
        return null
    }

    const [rows]: Array<any> = await pool.query(`INSERT INTO ${table} (email, password) VALUES (?, ?)`, [email, password])
    const affectedRows = rows.affectedRows || null

    return affectedRows
}

export async function updatePassword(email: string, password: string, table: string = process.env.BASE_AUTH_DB!) {
    const [rows]: [ResultSetHeader, any] = await pool.query(`UPDATE ${table} SET password = ? WHERE email = ?`, [password, email])

    return rows.affectedRows > 0
}
