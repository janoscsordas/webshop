import { Hono } from "hono"
import { logger } from "hono/logger"

import { productsRoute } from "./routes/products"
import { authRoute } from "./routes/auth"
import { adminAuthRoute } from "./routes/adminAuth"
import { statisticsRoute } from "./routes/statistics"
import { ordersRoute } from "./routes/orders"
import { customersRoute } from "./routes/customers"
import { messageRoute } from "./routes/message"

const app = new Hono()

// logger that writes the requests on the console
app.use('*', logger())

// api routes
const apiRoutes = app.basePath("/api")
                        .route("/products", productsRoute)
                        .route("/", authRoute)
                        .route("/admin", adminAuthRoute)
                        .route("/statistics", statisticsRoute)
                        .route("/orders", ordersRoute)
                        .route("/customers", customersRoute)
                        .route("/message", messageRoute)

export default app
// exporting api routes type for hono rpc
export type ApiRoutes = typeof apiRoutes
