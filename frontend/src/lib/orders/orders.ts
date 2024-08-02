import { api } from "../api";

export type Order = {
    id: number
    email: string
    product: string
    price: number
    orderDate: string
}

export type ApprovedOrder = {
    id: number
    email: string
    product: string
    price: number
    orderDate: string
    approvedDate: string
}

export type ApprovedOrderToSend = {
    id: string
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

export async function getAllApprovedOrders(): Promise<any> {
    try {
        const response = await api.orders["approved-orders"].$get()
    
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }

        const data = await response.json()

        return data
    } catch (error: any) {
        const errorMessage: string = error.message
        return errorMessage
    }
}

export async function approveOrder(id: string, email: string, product: string, price: number, orderDate: string) {
    try {
        const orderToSend: ApprovedOrderToSend = { 
            id,
            email,
            product,
            price,
            orderDate
        }

        const response = await api.orders["add-to-approved-orders"].$post({
            json: { orderToSend }
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }

        const result = await response.json()
        return result.success
    } catch (error: any) {
        const errorMessage: string = error.message
        return errorMessage
    }
}

export async function removeApprovedOrderHandler(id: string) {
    try {
        const response = await api.orders["remove-from-approved-orders"][":id"].$delete({
            param: {
                id: id
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }

        const result = await response.json()

        return result.success
    } catch (error: any) {
        const errorMessage: string = error.message
        return errorMessage
    }
}