import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "./getDatabaseConnection";

export type Message = {
    id: number
    user: string
    message: string
    sentDate: string
}

export async function getAllMessages() {
    const [rows]: [RowDataPacket[], any] = await pool.query(`SELECT * FROM groupmessages`);
    return rows as Message[]
}

export async function sendMessage(email: string,message: string) {
    const [rows]: [ResultSetHeader, any] = await pool.query(`INSERT INTO groupmessages (user, message) VALUES (?, ?)`, [email, message]);

    return rows.affectedRows > 0
}
