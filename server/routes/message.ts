import { Hono } from "hono";
import authMiddleware from "../lib/authMiddleware";
import { getAllMessagesController, sendMessageController } from "../controllers/messageController";

export const messageRoute = new Hono()
    // route for getting messages
    .get("/", authMiddleware, async (c) => {
        try {
            const messages = await getAllMessagesController()

            if (!messages) {
                throw new Error("No messages found")
            }

            return c.json({ messages: messages }, 200)
        } catch (error: any) {
            return c.json({ message: error.message }, 500)
        }
    })
    // route for sending messages
    .post("/send", authMiddleware, async (c) => {
        try {
            const { email, message } = await c.req.json()

            const result = await sendMessageController(email, message)

            if (!result) {
                throw new Error("Error while trying to send message")
            }

            return c.json({ success: true }, 200)
        } catch (error: any) {
            return c.json({ message: error.message }, 500)
        }
    })
