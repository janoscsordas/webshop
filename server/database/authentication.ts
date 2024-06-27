// importing database connection
import { pool } from "./getDatabaseConnection"

// mysql query for login a user
export async function loginUser(email: string, password: string, table: string = "customers") {
    const [rows]: Array<any> = await pool.query(`SELECT * FROM ${table} WHERE email = ?`, [email])

    const user = rows[0] || null

    return user
}

// mysql query for registering a user
export async function registerUser(email: string, password: string, table: string = "customers") {
    const [isRegistered]: Array<any> = await pool.query(`SELECT * FROM ${table} WHERE email = ?`, [email])

    if (isRegistered.length > 0) {
        return null
    }

    const [rows]: Array<any> = await pool.query(`INSERT INTO ${table} (email, password) VALUES (?, ?)`, [email, password])
    const affectedRows = rows.affectedRows || null

    return affectedRows
}