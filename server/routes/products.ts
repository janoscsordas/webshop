import { Hono } from "hono";
import authMiddleware from "../lib/authMiddleware";
import { getProductsController, removeProductController, updateProductController } from "../controllers/productsController";

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
            return c.json({ error: error.message }, 500)
        }
    })
    // get a single product
    .get("/:id", async (c) => {
        const productId = c.req.param('id')
        return c.json({ message: `product no. ${productId}` }, 200)
    })
    // create a new product
    .post("/create-product", authMiddleware, async (c) => {
        return c.json({ message: "Product created" }, 200)
    })
    .delete("/:id", authMiddleware, async (c) => {
        try {
            const productId = c.req.param('id')

            const removedProduct = await removeProductController(Number(productId))

            if (!removedProduct) {
                throw new Error("Error while trying to delete product")
            }

            return c.json({ success: true, productId: productId }, 201)
        } catch (error: any) {
            return c.json({ error: error.message }, 500)
        }
    })
    .post("/update-product", authMiddleware, async (c) => {
        try {
            const { value } = await c.req.json()

            const productUpdate = await updateProductController(value)

            if (!productUpdate) {
                throw new Error("Error while trying to create product")
            }

            return c.json({ success: true }, 201)
        } catch (error: any) {
            return c.json({ error: error.message }, 500)
        }
    })