import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "./getDatabaseConnection";

type Product = {
    id: string;
    categoryName: string;
    productName: string;
    productPrice: number;
    createdAt: string;
    inStock: number;
};

type UpdateProduct = {
    id: string
    productName: string
    productPrice: number
    inStock: string
}

export async function getAllProducts(): Promise<Product[]> {
    const [rows]: [RowDataPacket[], any] = await pool.query(`SELECT 
        products.id, 
        categories.categoryName, 
        products.productName, 
        products.productPrice, 
        products.createdAt, 
        products.inStock FROM products 
        INNER JOIN categories ON categories.id = products.categoryId`)
    return rows as Product[]
}

export async function removeProduct(id: number): Promise<number> {
    const [rows]: [ResultSetHeader, any] = await pool.query(`DELETE FROM products WHERE id = ?`, [id])

    return rows.affectedRows
}

export async function updateProduct(value: UpdateProduct): Promise<boolean> {
    const [rows]: [ResultSetHeader, any] = await pool.query(`
        UPDATE products SET 
        productName = ?, 
        productPrice = ?, 
        inStock = ? 
        WHERE id = ?`, 
        [value.productName, value.productPrice, value.inStock, value.id])

    return rows.affectedRows > 0
}