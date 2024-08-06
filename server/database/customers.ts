import type { RowDataPacket } from "mysql2";
import { pool } from "./getDatabaseConnection";

export type Customer = {
    id: number
    email: string
}

export async function getCustomersFromDatabase() {
    const [rows]: [RowDataPacket[], any] = await pool.query("SELECT id, email FROM customers")

    return rows as Customer[]
}