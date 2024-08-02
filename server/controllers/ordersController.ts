import { type Order, type ApprovedOrder, getAllApprovedOrders, getAllOrders, removeOrder } from "../database/orders";
import { formatDate } from "../lib/dateFormatter";

export const getOrdersController = async () => {
    const orders = await getAllOrders()

    if (!orders) {
        throw new Error("No orders found")
    }

    const typeSafeValues = orders.map((order: Order) => {
        return {
            id: order.id,
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

export const getApprovedOrdersController = async () => {
    const approvedOrders = await getAllApprovedOrders()

    if (!approvedOrders) {
        throw new Error("No approved orders found")
    }

    const typeSafeValues = approvedOrders.map((order: ApprovedOrder) => {
        return {
            id: order.id,
            email: order.email,
            product: order.product,
            price: order.price,
            orderDate: formatDate(order.orderDate),
            approvedDate: formatDate(order.approvedDate)
        }
    })
    
    return typeSafeValues as ApprovedOrder[]
}