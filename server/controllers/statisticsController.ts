import { getAllStatisticsData } from "../database/statistics";

type Statistics = {
    customer_count: number,
    order_count: number,
    product_count: number,
    total_gross_revenue: string,
    most_recent_order: string
}

function formatCurrencyToUSD(value: number): string {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD', 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    }).format(value)
}

export const getStatisticsData = async () => {
    const statisticsData: Statistics = await getAllStatisticsData()
    
    if (!statisticsData) {
        throw new Error("No statistics data found")
    }

    const BeautifiedVersionOfStatistics = [
        { id: 1, title: "Total Customers", description: "number of registered customers", value: statisticsData.customer_count },
        { id: 2, title: "Total Orders", description: "number of completed orders", value: statisticsData.order_count },
        { id: 3, title: "Total Products", description: "number of products in stock", value: statisticsData.product_count + " pcs" },
        { id: 4, title: "Total Revenue", description: "total revenue from all orders in $ (counted as 62.5% profit)", value: formatCurrencyToUSD(Math.round(Number(statisticsData.total_gross_revenue) / 1.75)) },
        { id: 5, title: "Most Recently Ordered Item", description: "most recently ordered item on the webshop", value: statisticsData.most_recent_order }
    ]

    return BeautifiedVersionOfStatistics
}