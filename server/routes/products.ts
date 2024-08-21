import { Hono } from "hono";
import authMiddleware from "../lib/authMiddleware";
import { createProductController, getProductsController, removeProductController, updateProductController } from "../controllers/productsController";
import { getAllProductTypes } from "../database/products";

// products route
export const productsRoute = new Hono()
    // route for getting all products
    .get("/", async (c) => {
        try {
            const products = await getProductsController()

            if (!products) {
                throw new Error("No products found")
            }

            return c.json({ products }, 200)

        } catch (error: any) {
            return c.json({ message: error.message }, 500)
        }
    })
    // get a single product
    .get("/product/:id", async (c) => {
        const productId = c.req.param('id')
        return c.json({ message: `product no. ${productId}` }, 200)
    })
    .get("/product-types", authMiddleware, async (c) => {
        try {
            const productTypes = await getAllProductTypes()

            if (!productTypes) {
                throw new Error("No product types found")
            }

            return c.json({ productTypes }, 200)
        } catch (error: any) {
            return c.json({ message: error.message }, 500)
        }
    })
    // create a new product
    .post("/create-product", authMiddleware, async (c) => {
        try {
            const { value } = await c.req.json()

            const result = await createProductController(value)

            if (result === null) {
                throw new Error("Product already exists!")
            }

            return c.json({ result }, 201)
        } catch (error: any) {
            return c.json({ message: error.message }, 400)
        }
    })
    // deleting a product
    .delete("/:id", authMiddleware, async (c) => {
        try {
            const productId = c.req.param('id')

            const removedProduct = await removeProductController(Number(productId))

            if (!removedProduct) {
                throw new Error("Error while trying to delete product")
            }

            return c.json({ success: true, productId: productId }, 201)
        } catch (error: any) {
            return c.json({ message: error.message }, 500)
        }
    })
    // route for updating a product
    .post("/update-product", authMiddleware, async (c) => {
        try {
            const { value } = await c.req.json()

            const productUpdate = await updateProductController(value)

            if (!productUpdate) {
                throw new Error("Error while trying to update product")
            }

            return c.json({ success: true }, 201)
        } catch (error: any) {
            return c.json({ message: error.message }, 500)
        }
    })
