import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "./getDatabaseConnection";
import { formatDate } from "../lib/dateFormatter";

export type Order = {
    id: number;
    email: string;
    product: string;
    price: number;
    orderDate: string;
}

export type ApprovedOrder = {
    id: number;
    email: string;
    product: string;
    price: number;
    orderDate: string;
    approvedDate: string;
};

export async function getAllOrders(table: string = "orders") {
    const [rows]: [RowDataPacket[], any] = await pool.query(`
        SELECT orders.id, customers.email, orders.product, orders.price, orders.orderDate FROM ${table}
        INNER JOIN customers ON customers.id = orders.customerId
    `)

    return rows as Order[]
}

export async function removeOrder(id: number, table: string = "orders") {
    const [rows]: [ResultSetHeader, any] = await pool.query(`DELETE FROM ${table} WHERE id = ?`, [id])

    return rows.affectedRows > 0
}

export async function getAllApprovedOrders(table: string = "approved_orders") {
    const [rows]: [RowDataPacket[], any] = await pool.query(`SELECT * FROM ${table}`)

    return rows as ApprovedOrder[]
}

export async function addToApprovedOrders(table: string = "approved_orders", table2: string = "orders", id: number, email: string, product: string, price: number, orderDate: string) {
    const date = Date.now()
    const approvedDate = formatDate(String(date))

    const [rows]: [ResultSetHeader, any] = await pool.query(`INSERT INTO ${table} (email, product, price, orderDate, approvedDate) VALUES (?, ?, ?, ?, ?)`, [email, product, price, orderDate, approvedDate])

    if (rows.affectedRows > 0) {
        const [deleteRow]: [ResultSetHeader, any] = await pool.query(`DELETE FROM ${table2} WHERE id = ?`, [id])

        return deleteRow.affectedRows > 0
    }

    return rows.affectedRows > 0
}