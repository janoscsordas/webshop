import { Hono } from "hono";
import authMiddleware from "../lib/authMiddleware";

import { getApprovedOrdersController, getOrdersController, removeOrderController } from "../controllers/ordersController";
import { addToApprovedOrders, removeFromApprovedOrders } from "../database/orders";

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
    .get("/approved-orders", authMiddleware, async (c) => {
        try {
            const approvedOrders = await getApprovedOrdersController()

            if (!approvedOrders) {
                throw new Error("No approved orders found")
            }

            return c.json({ approvedOrders: approvedOrders }, 200)
        } catch (error: any) {
            return c.json({ message: error.message }, 401)
        }
    })
    .post("/add-to-approved-orders", authMiddleware, async (c) => {
        try {
            const { orderToSend } = await c.req.json()

            if (!orderToSend.id || !orderToSend.email || !orderToSend.product || !orderToSend.price || !orderToSend.orderDate) {
                throw new Error("No order to approve found")
            }

            const addToApproved = await addToApprovedOrders(Number(orderToSend.id), orderToSend.email, orderToSend.product, orderToSend.price, orderToSend.orderDate)

            if (!addToApproved) {
                throw new Error("Error while trying to add order to approved orders")
            }

            return c.json({ success: true }, 201)
        } catch (error: any) {
            return c.json({ message: error.message }, 400)
        }
    })
    .delete("/remove-from-approved-orders/:id", authMiddleware, async (c) => {
        try {
            const id = c.req.param("id")

            const removeApprovedOrder = await removeFromApprovedOrders(Number(id))

            if (!removeApprovedOrder) {
                throw new Error("Error while trying to remove order from approved orders")
            }

            return c.json({ success: true }, 201)
        } catch (error: any) {
            return c.json({ message: error.message }, 401)
        }
    })