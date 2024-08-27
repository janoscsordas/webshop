import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "./getDatabaseConnection";

// type for message for typesafety
export type Message = {
    id: number
    user: string
    message: string
    sentDate: string
}

// mysql query for getting all messages from database
export async function getAllMessages(table: string = process.env.MESSAGE_TABLE!) {
    const [rows]: [RowDataPacket[], any] = await pool.query(`SELECT * FROM ${table}`);
    return rows as Message[]
}

// mysql query for sending a message to database
export async function sendMessage(email: string, message: string, table: string = process.env.MESSAGE_TABLE!) {
    const [rows]: [ResultSetHeader, any] = await pool.query(`INSERT INTO ${table} (user, message) VALUES (?, ?)`, [email, message]);

    return rows.affectedRows > 0
}
