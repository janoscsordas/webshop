import { type Order, getAllOrders, removeOrder } from "../database/orders";
import { formatDate } from "../lib/dateFormatter";

export const getOrdersController = async () => {
    const orders = await getAllOrders()

    if (!orders) {
        throw new Error("No orders found")
    }

    const typeSafeValues = orders.map((order: Order) => {
        return {
            orderId: order.orderId,
            email: order.email,
            product: order.product,
            price: order.price,
            orderDate: formatDate(order.orderDate)
        }
    })

    return typeSafeValues as Order[]
}

export const removeOrderController = async (id: string): Promise<boolean> => {
    const isRemoved = await removeOrder(Number(id))
    
    return isRemoved
}