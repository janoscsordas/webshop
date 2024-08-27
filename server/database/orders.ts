import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "./getDatabaseConnection";

// type for order for typesafety
export type Order = {
    id: number;
    email: string;
    product: string;
    price: number;
    orderDate: string;
}

// type for ApprovedOrders for typesafety
export type ApprovedOrder = {
    id: number;
    email: string;
    product: string;
    price: number;
    orderDate: string;
    approvedDate: string;
};

// mysql query for getting all orders
export async function getAllOrders(table: string = process.env.ORDER_TABLE!): Promise<Order[]> {
    const [rows]: [RowDataPacket[], any] = await pool.query(`
        SELECT orders.id, customers.email, orders.product, orders.price, orders.orderDate FROM ${table}
        INNER JOIN customers ON customers.id = orders.customerId
    `)

    return rows as Order[]
}

// mysql query for removing an order
export async function removeOrder(id: number, table: string = process.env.ORDER_TABLE!): Promise<boolean> {
    const [rows]: [ResultSetHeader, any] = await pool.query(`DELETE FROM ${table} WHERE id = ?`, [id])

    return rows.affectedRows > 0
}

// mysql query for getting all approved orders
export async function getAllApprovedOrders(table: string = process.env.APPROVED_ORDER_TABLE!, customerTable: string = process.env.CUSTOMER_TABLE!): Promise<ApprovedOrder[]> {
    const [rows]: [RowDataPacket[], any] = await pool.query(`SELECT approved_orders.id, customers.email, approved_orders.product, approved_orders.price, approved_orders.orderDate, approved_orders.approvedDate FROM ${table} INNER JOIN ${customerTable} ON customers.id = approved_orders.customerId`)

    return rows as ApprovedOrder[]
}

// mysql query for adding an order to the approved orders with a custom dateformatter in it
export async function addToApprovedOrders(id: number, email: string, product: string, price: number, orderDate: string, customerTable: string = process.env.CUSTOMER_TABLE!, orderTable: string = process.env.ORDER_TABLE!, approvedOrderTable: string = process.env.APPROVED_ORDER_TABLE!): Promise<boolean> {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // month from 0 to 11, so it's + 1
    const day = String(date.getDate()).padStart(2, '0') // padding with zeros

    const approvedDate = `${year}-${month}-${day}`

    const [emailId]: [RowDataPacket[], any] = await pool.query(`SELECT * FROM ${customerTable} WHERE email = ?`, [email])

    if (!emailId) {
        return false
    }

    const [rows]: [ResultSetHeader, any] = await pool.query(`INSERT INTO ${approvedOrderTable} (customerId, product, price, orderDate, approvedDate) VALUES (?, ?, ?, ?, ?)`, [emailId[0].id, product, price, orderDate, approvedDate])

    if (rows.affectedRows === 0) {
        return false
    }

    const [deleteRow]: [ResultSetHeader, any] = await pool.query(`DELETE FROM ${orderTable} WHERE id = ?`, [id])

    return deleteRow.affectedRows > 0
}

// query for removing an approved order from database
export async function removeFromApprovedOrders(id: number, table: string = process.env.APPROVED_ORDER_TABLE!): Promise<boolean> {
    const [rows]: [ResultSetHeader, any] = await pool.query(`DELETE FROM approved_orders WHERE id = ?`, [id])

    return rows.affectedRows > 0
}
