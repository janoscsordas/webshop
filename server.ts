import app from "./server/app"

Bun.serve({
    port: process.env.PORT || 3000,
    fetch: app.fetch
})

console.log("Server is running!")