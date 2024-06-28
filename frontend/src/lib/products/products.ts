import { api } from "../api"

export type Product = {
    id: string
    categoryName: string
    productName: string
    productPrice: number
    createdAt: string
    inStock: string   
}

export type UpdateProduct = {
    id: string
    productName: string
    productPrice: number
    inStock: string
}

type CreateProduct = {
    categoryId: number
    productName: string
    productPrice: number
    inStock: string
}

export const getAllProducts = async () => {
    const products = await api.products.$get()

    if (!products.ok) {
        throw new Error("Error getting products")
    }

    const data = await products.json()

    return data
}

export const removeProductHandler = async (id: string) => {

    const res = await api.products[':id'].$delete({
        param: {
            id: id
        }
    })

    if (!res.ok) {
        return false
    }

    const data = await res.json()

    return data.success
}

export const updateProduct = async (value: UpdateProduct): Promise<boolean> => {
    const res = await api.products['update-product'].$post({
        json: { value }
    })

    if (!res.ok) {
        return false
    }

    const data = await res.json()

    if (!data.success) {
        return false
    }

    return true
}

export const createProduct = async (value: CreateProduct): Promise<boolean> => {
    const res = await api.products['create-product'].$post({
        json: { value }
    })

    if (!res.ok) {
        return false
    }

    return true
}