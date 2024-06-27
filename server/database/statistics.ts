import { pool } from "./getDatabaseConnection"

export async function getAllStatisticsData() {
    // get total number of products, customers and orders
    const [statistics]: Array<any> = await pool.query(`
        SELECT 
            (SELECT COUNT(*) FROM customers) AS customer_count, 
            (SELECT COUNT(*) FROM orders) AS order_count, 
            (SELECT COUNT(*) FROM products) AS product_count,
            (SELECT SUM(price) FROM orders) AS total_gross_revenue,
            (SELECT product FROM orders ORDER BY orderDate DESC LIMIT 1) AS most_recent_order`)

    // return all statistics data
    const allStatistics = statistics[0]

    return allStatistics
}