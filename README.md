# Webshop Project
---
## Built with the following stacks

- React (TS)
- Hono (Client, RPC, Server)
- Bun
- TailwindCSS
- Shadcn/ui

---

## Project Structure

```plaintext
├── frontend
|   ├── public
|   ├── src
|   |   ├── assets
|   |   ├── components
|   |   ├── context
|   |   ├── hooks
|   |   ├── lib
|   |   ├── routes
|   |   ├── index.css
|   |   ├── main.tsx
|   |   ├── routeTree.gen.ts
|   |   └── vite-env.d.ts
|   ├── .eslint.cjs
|   ├── .gitignore
|   ├── bun.lockb
|   ├── components.json
|   ├── index.html
|   ├── package.json
|   ├── postcss.config.js
|   ├── tailwind.config.js
|   ├── tsconfig.json
|   ├── .tsconfig.node.json
|   └── vite.config.ts
├── server
│   ├── controllers
│   ├── database
│   ├── lib
|   ├── routes
|   └── app.ts
├── .gitignore
├── bun.lockb
├── package.json
├── README.md
├── server.ts
└── tsconfig.json
 ```

## Frontend file based routing structure

```plaintext
routes folder:
├── _profile
|   └── index.lazy.tsx : "/profile"
├── admin
|   ├── _authenticated
|   |   ├── dashboard
|   |   |   ├── customers
|   |   |   |   └── index.lazy.tsx : "/admin/dashboard/customers"
|   |   |   ├── messages
|   |   |   |   └── index.lazy.tsx : "/admin/dashboard/messages"
|   |   |   ├── orders
|   |   |   |   ├── index.lazy.tsx : "/admin/dashboard/orders"
|   |   |   |   └── approved-orders.lazy.tsx : "/admin/dashboard/orders/approved-orders"
|   |   |   ├── products
|   |   |   |   ├── index.lazy.tsx : "/admin/dashboard/products"
|   |   |   |   └── create.lazy.tsx : "/admin/dashboard/products/create"
|   |   |   ├── index.lazy.tsx : "/admin/dashboard"
|   ├── _authenticated.lazy.tsx
|   ├── index.lazy.tsx : "/admin/"
|   └── login.lazy.tsx : "/admin/login"
├── __root.tsx
├── _profile.tsx
├── about.lazy.tsx : "/about"
├── index.lazy.tsx : "/"
├── login.lazy.tsx : "/login"
├── products.lazy.tsx : "/products"
├── search-products.lazy.tsx : "/search-product"
├── shopping-cart.lazy.tsx : "/shopping-cart"
└── signup.lazy.tsx : "/signup"
```

---

## This project contains a webshop and a dashboard

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
- NodeJS
- Bun

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
