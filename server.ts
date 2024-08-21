// Importing the hono server
import app from "./server/app"

// serving requests with Bun server
Bun.serve({
    port: process.env.PORT || 3000,
    fetch: app.fetch
})

console.log("Server is running!")
