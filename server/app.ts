import { Hono } from "hono"
import { logger } from "hono/logger"

import { productsRoute } from "./routes/products"
import { authRoute } from "./routes/auth"
import { adminAuthRoute } from "./routes/adminAuth"
import { statisticsRoute } from "./routes/statistics"

const app = new Hono()

app.use('*', logger())

const apiRoutes = app.basePath("/api")
                        .route("/products", productsRoute)
                        .route("/", authRoute)
                        .route("/admin", adminAuthRoute)
                        .route("/statistics", statisticsRoute)

export default app
// exporting api routes type for hono rpc
export type ApiRoutes = typeof apiRoutes