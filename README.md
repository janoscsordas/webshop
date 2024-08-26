# Webshop Project
---
## Built with the following stacks

- React (TS)
- Hono (Client, RPC, Server)
- Bun
- TailwindCSS
- Shadcn/ui

## This project contains a webshop and a dashboard for it

Inside the webshop the user can:
- Sign in
- Sign up
- Order Products
- Gather information about your webshop

Inside the dashboard your employees can:
- Access some statistics
- Access all products in the database
- Create new Products
- Edit products
- Remove products
- Access all orders
- Remove orders
- Approve orders
- Remove approved orders
- See customer informations
- See and Send messages in a built in all chat

### Help for developers with development purposes

You will need to have Bun installed on your desktop.

Prerequisites:
- MySQL server

Create a `.env` file and setup environment variables based on this:

```bash
PORT="Your port here"

BASE_AUTH_DB="your table name here"

DB_HOST="MySQL server's Host"
DB_USER="MySQL server's User"
DB_PASS="MySQL server's Password"
DB_DATABASE="Your database's name"

JWT_ADMIN_SECRET="Generate a 32 byte secret key"
JWT_SECRET="Same here as before"

ENCRYPT_SECRET_KEY="Same once more"
```
**note:** *you should generate different keys for these 3 options, because they can interfer with the code and break it.*

to generate a key you can use this command in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

To install dependencies open the root folder with terminal and:

```bash
bun install
```

Then go into `frontend` folder and:

```bash
cd frontend
bun install
```

To run them:

```bash
bun dev
```

---

The project was created with `bun init`.
it was made by *János Csordás*.

*This project was made for learning purposes only, feel free to use this to make something even better.*
