import type { RowDataPacket } from "mysql2";
import { pool } from "./getDatabaseConnection";

// type for customer for typesafety
export type Customer = {
    id: number
    email: string
}

// mysql query for getting all customers
export async function getCustomersFromDatabase() {
    const [rows]: [RowDataPacket[], any] = await pool.query("SELECT id, email FROM customers")

    return rows as Customer[]
}
