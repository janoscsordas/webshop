import { Hono } from "hono";
import authMiddleware from "../lib/authMiddleware";

import { getApprovedOrdersController, getOrdersController, removeOrderController } from "../controllers/ordersController";
import { addToApprovedOrders, createOrder, removeFromApprovedOrders } from "../database/orders";

export const ordersRoute = new Hono()
    // route for getting all the orders
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
    .post("/create-order", async (c) => {
        try {
            const { order, email } = await c.req.json()

            if (!email) {
                throw new Error("You have to be signed in to create an order")
            }

            if (!order) {
                throw new Error("No order found")
            }

            const orders = await createOrder(order, email)

            if (!orders) {
                throw new Error("There was an error while trying to create an order")
            }

            return c.json({ success: true }, 200)
        } catch (error: any) {
            return c.json({ message: error.message }, 400)
        }
    })
    // route for deleting a single order
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
    // route for getting approved orders
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
    // route for adding an order to the approved orders
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
    // deleting an approved order
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
