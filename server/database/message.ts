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
export async function getAllMessages() {
    const [rows]: [RowDataPacket[], any] = await pool.query(`SELECT * FROM groupmessages`);
    return rows as Message[]
}

// mysql query for sending a message to database
export async function sendMessage(email: string,message: string) {
    const [rows]: [ResultSetHeader, any] = await pool.query(`INSERT INTO groupmessages (user, message) VALUES (?, ?)`, [email, message]);

    return rows.affectedRows > 0
}
