import { getAllProducts, removeProduct, updateProduct, createNewProduct, type CreateProduct } from "../database/products";

type UpdateProduct = {
    id: string
    productName: string
    productPrice: number
    inStock: string
}

function formatProductDate(date: string) {
    const newDate = new Date(date)

    const year = newDate.getFullYear()
    const month = String(newDate.getMonth() + 1).padStart(2, '0') // Hónap 0-tól 11-ig, ezért +1 és padding nullával
    const day = String(newDate.getDate()).padStart(2, '0') // Padding nullával

    return `${year}-${month}-${day}`
}

export async function getProductsController() {
    const products = await getAllProducts()

    if (!products) {
        throw new Error("No products found")
    }

    const formattedProducts = []

    for (const product of products) {
        formattedProducts.push({
            id: product.id,
            categoryName: product.categoryName,
            productName: product.productName,
            productPrice: product.productPrice,
            createdAt: formatProductDate(product.createdAt),
            inStock: product.inStock == "1" ? "Yes" : "No"
        })
    }

    return formattedProducts
}

export const removeProductController = async (id: number) => {
    const removedProduct = await removeProduct(id)

    if (!removedProduct) {
        throw new Error("Error while trying to delete product")
    }

    if (removedProduct !== 1) {
        return false
    }

    return true
}

export const updateProductController = async (value: UpdateProduct): Promise<boolean> => {
    const isUpdatedProduct = await updateProduct(value)

    return isUpdatedProduct
}

export const createProductController = async (newProductDetails: CreateProduct): Promise<boolean> => {
    const result = await createNewProduct(newProductDetails)

    if (!result) {
        return result
    }

    return result
}