import { api } from "../api";

export type Order = {
    orderId: number
    email: string
    product: string
    price: number
    orderDate: string
}

export type RemoveSuccess = {
    success: boolean
    orderId: string
}

export async function getAllOrders() {
    try {
        const response = await api.orders.$get()

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }

        const data = await response.json()

        return data

    } catch (error: any) {
        return error
    }
}

export async function removeOrderHandler(id: string) {
    try {
        const response = await api.orders[':id'].$delete({
            param: {
                id: id
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }

        return true
    } catch (error: any) {
        return error
    }
}