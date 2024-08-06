import { api } from "../api";

export type Customer = {
    id: string
    email: string
}

export const getAllCustomers = async (): Promise<any> => {
    try {
        const customers = await api.customers.$get()

        if (!customers.ok) {
            const errorData = await customers.json()
            throw new Error(errorData.message)
        }

        const data = await customers.json()

        return data
    } catch (error: any) {
        const errorMessage: string = error.message
        return errorMessage
    }
}