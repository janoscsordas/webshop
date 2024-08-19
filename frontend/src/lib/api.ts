import { type ApiRoutes } from "../../../server/app"
import { hc } from "hono/client"

// create a client for hono rpc for easier use
const client = hc<ApiRoutes>('/')

// exporting api routes type for hono rpc
export const api = client.api
