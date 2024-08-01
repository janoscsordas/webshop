import { api } from "../api";

export type Order = {
    id: number
    email: string
    product: string
    price: number
    orderDate: string
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

        const result = await response.json()

        return result
    } catch (error: any) {
        const errorMessage: string = error.message
        return errorMessage
    }
}