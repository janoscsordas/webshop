import { Hono } from "hono";
import authMiddleware from "../lib/authMiddleware";
import { getCustomersFromDatabase } from "../database/customers";

export const customersRoute = new Hono()
    .get("/", authMiddleware, async (c) => {
        try {
            const customers = await getCustomersFromDatabase()

            if (!customers) {
                throw new Error("No customers found")
            }

            return c.json({ customers: customers }, 200)
        } catch (error: any) {
            return c.json({ message: error.message }, 500)
        }
    })