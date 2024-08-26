// Importing the hono server
import app from "./server/app"

// serving requests with Bun server
Bun.serve({
    port: process.env.PORT || 3000,
    fetch: app.fetch
})

// logging out the state of the server if it starts
console.log("Server is running!")
