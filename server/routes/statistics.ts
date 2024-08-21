import { Hono } from "hono"
import authMiddleware from "../lib/authMiddleware"
import { getStatisticsData } from "../controllers/statisticsController"

export const statisticsRoute = new Hono()
    // get statistics to the frontend
    .get("/", authMiddleware, async (c) => {
        try {
            const statistics = await getStatisticsData()

            return c.json({ statistics }, 200)
        } catch (error: any) {
            return c.json({ message: error.message }, 500)
        }
    })
