import { getAllProducts, removeProduct, updateProduct, createNewProduct, type CreateProduct, type UpdateProduct, type Product } from "../database/products";
import { formatDate } from "../lib/dateFormatter";

export async function getProductsController() {
    const products = await getAllProducts()

    if (!products) {
        throw new Error("No products found")
    }

    const formattedProducts = products.map((product) => {
        return {
            id: product.id,
            categoryName: product.categoryName,
            productName: product.productName,
            productPrice: product.productPrice,
            createdAt: formatDate(product.createdAt),
            inStock: product.inStock == "1" ? "Yes" : "No"
        }
    })

    return formattedProducts as Product[]
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
    const result: Product[] | null = await createNewProduct(newProductDetails)

    if (!result) {
        return null
    }

    const createdProduct = result[0]

    if (!createdProduct) {
        return null
    }

    const typeSafeValues = {
        id: createdProduct.id,
        categoryName: createdProduct.categoryName,
        productName: createdProduct.productName,
        productPrice: createdProduct.productPrice,
        createdAt: formatDate(createdProduct.createdAt),
        inStock: createdProduct.inStock == "1" ? "Yes" : "No"
    }

    return typeSafeValues as Product
}