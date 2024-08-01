import { Hono } from "hono";
import authMiddleware from "../lib/authMiddleware";

import { getOrdersController, removeOrderController } from "../controllers/ordersController";

export const ordersRoute = new Hono()
    .get("/", authMiddleware, async (c) => {
        try {
            const orders = await getOrdersController()

            if (!orders) {
                throw new Error("No orders found")
            }

            return c.json( { orders: orders } , 200)
        } catch (error: any) {
            return c.json({ message: error.message }, 401)
        }
    })
    .delete("/:id", authMiddleware, async (c) => {
        try {
            const id = c.req.param("id")

            if (!id) {
                throw new Error("No id found")
            }

            const result = await removeOrderController(id)

            if (!result) {
                throw new Error("Error while trying to remove order")
            }

            return c.json({ success: true }, 200)
        } catch (error: any) {
            return c.json({ message: error.message }, 400)
        }
    })