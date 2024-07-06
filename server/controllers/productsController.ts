import { getAllProducts, removeProduct, updateProduct, createNewProduct, type CreateProduct, type UpdateProduct } from "../database/products";

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

    let formattedProducts = []

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

    return removedProduct
}

export const updateProductController = async (value: UpdateProduct): Promise<boolean> => {
    const isUpdatedProduct = await updateProduct(value)

    return isUpdatedProduct
}

export const createProductController = async (newProductDetails: CreateProduct) => {
    const result = await createNewProduct(newProductDetails)

    if (!result) {
        return null
    }

    return result
}