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
    const [rows]: [RowDataPacket[], any] = await pool.query(`SELECT approved_orders.id, customers.email, approved_orders.product, approved_orders.price, approved_orders.orderDate, approved_orders.approvedDate FROM ${table} INNER JOIN customers ON customers.id = approved_orders.customerId`)

    return rows as ApprovedOrder[]
}

export async function addToApprovedOrders(id: number, email: string, product: string, price: number, orderDate: string) {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Hónap 0-tól 11-ig, ezért +1 és padding nullával
    const day = String(date.getDate()).padStart(2, '0') // Padding nullával

    const approvedDate = `${year}-${month}-${day}`

    const [emailId]: [RowDataPacket[], any] = await pool.query(`SELECT * FROM customers WHERE email = ?`, [email])

    if (!emailId) {
        return false
    }

    const [rows]: [ResultSetHeader, any] = await pool.query(`INSERT INTO approved_orders (customerId, product, price, orderDate, approvedDate) VALUES (?, ?, ?, ?, ?)`, [emailId[0].id, product, price, orderDate, approvedDate])

    if (rows.affectedRows === 0) {
        return false
    }

    const [deleteRow]: [ResultSetHeader, any] = await pool.query(`DELETE FROM orders WHERE id = ?`, [id])

    return deleteRow.affectedRows > 0
}

export async function removeFromApprovedOrders(id: number) {
    const [rows]: [ResultSetHeader, any] = await pool.query(`DELETE FROM approved_orders WHERE id = ?`, [id])

    return rows.affectedRows > 0
}