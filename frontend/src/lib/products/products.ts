import { api } from "../api"

// type for products
export type Product = {
    id: string
    categoryName: string
    productName: string
    productPrice: number
    createdAt: string
    inStock: string
}

// type for product updates
export type UpdateProduct = {
    id: string
    productName: string
    productPrice: number
    inStock: string
}

// type for product creation
type CreateProduct = {
    categoryId: number
    productName: string
    productPrice: number
    inStock: string
}

// type for product removal
export type RemoveSuccess = {
    success: boolean
    productId: string
}

// this function is used in ProductTable
export const getAllProducts = async () => {
    try {
        const products = await api.products.$get()

        if (!products.ok) {
            const errorData = await products.json()
            throw new Error(errorData.message)
        }

        const data = await products.json()

        return data
    } catch (error: any) {
        return error
    }
}

// this function is used in ProductActions
export const removeProductHandler = async (id: string) => {
    try {
        const res = await api.products[':id'].$delete({
            param: {
                id: id
            }
        })

        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.message)
        }

        const data: RemoveSuccess = await res.json()

        return data
    } catch (error: any) {
        const errorMessage: string = error.message
        return errorMessage
    }
}

// this product is used in EditProductForm
export const updateProduct = async (value: UpdateProduct) => {
    try {
        const res = await api.products['update-product'].$post({
            json: { value }
        })

        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.message)
        }

        const data = await res.json()
        return data.success
    } catch (error: any) {
        return error
    }
}

// this product is used in CreateProduct
export const createProduct = async (value: CreateProduct) => {
    try {
        const res = await api.products['create-product'].$post({
            json: { value }
        })

        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.message)
        }

        const json = await res.json()

        const newProduct: Product = json.result

        return newProduct
    } catch (error: any) {
        const errorMessage: string = error.message
        return errorMessage
    }
}

export const getAllProductTypes = async () => {
    try {

    } catch (error: any) {
        const errorMessage: string = error.message
        return errorMessage
    }
}

// Shopping cart functions
export const handleAddingToCart = async (id: string) => {

}
