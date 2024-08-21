import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "./getDatabaseConnection";

// function for getting the current date
async function getCurrentDate() {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

// type for product for typesafety
export type Product = {
    id: string;
    categoryName: string;
    productName: string;
    productPrice: number;
    createdAt: string;
    inStock: string;
};

// type for UpdateProduct for typesafety
export type UpdateProduct = {
    id: string
    productName: string
    productPrice: number
    inStock: string
}

// type for CreateProduct for typesafety
export type CreateProduct = {
    categoryId: number
    productName: string
    productPrice: number
    inStock: string
}

// type for ProductTypes for typesafety
type ProductTypes = {
    id: string
    categoryName: string
}

// mysql query for getting all products
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

// mysql query for getting all product types
export async function getAllProductTypes(): Promise<ProductTypes[]> {
    const [rows]: [RowDataPacket[], any] = await pool.query(`SELECT * FROM categories`)

    return rows as ProductTypes[]
}

// mysql query for removing a product
export async function removeProduct(id: number): Promise<boolean> {
    const [rows]: [ResultSetHeader, any] = await pool.query(`
        DELETE FROM products
        WHERE id = ?`,
        [id]
    )

    return rows.affectedRows > 0
}

// mysql query for updating a product
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

// mysql query for creating a new product
export async function createNewProduct(value: CreateProduct): Promise<any> {
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
