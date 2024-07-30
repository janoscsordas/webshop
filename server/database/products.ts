import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "./getDatabaseConnection";

async function getCurrentDate() {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export type Product = {
    id: string;
    categoryName: string;
    productName: string;
    productPrice: number;
    createdAt: string;
    inStock: string;
};

export type UpdateProduct = {
    id: string
    productName: string
    productPrice: number
    inStock: string
}

export type CreateProduct = {
    categoryId: number
    productName: string
    productPrice: number
    inStock: string
}

type ProductTypes = {
    id: string
    categoryName: string
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

export async function getAllProductTypes() {
    const [rows]: [RowDataPacket[], any] = await pool.query(`SELECT * FROM categories`)
    
    return rows as ProductTypes[]
}

export async function removeProduct(id: number): Promise<boolean> {
    const [rows]: [ResultSetHeader, any] = await pool.query(`
        DELETE FROM products 
        WHERE id = ?`, 
        [id]
    )

    return rows.affectedRows > 0
}

export async function updateProduct(value: UpdateProduct): Promise<boolean> {
    const [rows]: [ResultSetHeader, any] = await pool.query(`
        UPDATE products SET 
        productName = ?, 
        productPrice = ?, 
        inStock = ? 
        WHERE id = ?`, 
        [
            value.productName, 
            value.productPrice, 
            value.inStock, 
            value.id
        ])

    return rows.affectedRows > 0
}

export async function createNewProduct(value: CreateProduct) {
    const [doesProductExists]: [RowDataPacket[], any] = await pool.query(`
        SELECT productName FROM products
        WHERE productName = ?`, 
        [value.productName]
    )

    if (doesProductExists.length > 0) {
        return null
    }

    const [rows]: [ResultSetHeader, any] = await pool.query(`INSERT INTO products (
        categoryId, 
        productName, 
        productPrice, 
        createdAt, 
        inStock) 
        VALUES (
        ?, ?, ?, ?, ?)`, 
        [
        value.categoryId, 
        value.productName, 
        value.productPrice, 
        await getCurrentDate(), 
        value.inStock
    ])

    const [foundProduct]: [RowDataPacket[], any] = await pool.query(`
        SELECT * FROM products 
        WHERE id = ?`, 
        [rows.insertId]
    )

    return foundProduct as Product[]
}