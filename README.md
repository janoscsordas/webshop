# Webshop Project
---
## Built with the following stacks

- React (TS)
- Hono (Client, RPC, Server)
- Tanstack (Router, Form, Query)
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
- [NodeJS](https://nodejs.org/en/)
- [Bun](https://bun.sh/)

Create a `.env` file and setup environment variables based on this:

```bash
PORT="Your port here"

BASE_AUTH_DB="table name"
ADMIN_TABLE="table name"
CUSTOMER_TABLE="table name"
ORDER_TABLE="table name"
APPROVED_ORDER_TABLE="table name"
PRODUCT_TABLE="table name"
CATEGORY_TABLE="table name"
MESSAGE_TABLE="table name"

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

**another side note:** *table names can be changed however you'd like but the table columns are still hard coded into the project.*

Here's all the table column's names:

**id:** *it's in every table as the primary key and with auto incrementation.*

**(table_columns_name - type_of_column)**

**ADMIN_TABLE:**
- email - *(varchar(255))*
- password - *(varchar(255))*

**APPROVED_ORDER_TABLE:**
- customerId - *(int)*
- product - *(varchar(255))*
- price - *(int)*
- orderDate - *(date)*
- approvedDate - *(date)*

**CATEGORY_TABLE:**
- categoryName - *(varchar(255))*

**CUSTOMER_TABLE:**
- email - *(varchar(255))*
- password - *(varchar(255))*

**MESSAGE_TABLE:**
- user - *(varchar(255))*
- message - *(varchar(255))*
- sentDate - *(timestamp)*

**ORDER_TABLE:**
- customerId - *(int)*
- product - *(varchar(255))*
- price - *(int)*
- orderDate - *(date)*

**PRODUCT_TABLE:**
- categoryId - *(int)*
- productName - *(varchar(255))*
- productPrice - *(int)*
- createdAt - *(date)*
- inStock - *(smallint)*

**There is an example database structure in the /database folder if you'd like to use that.**

To install dependencies open the root folder with terminal and:

```bash
bun install
```

Then:

```bash
cd frontend
bun install
```

To run them:

```bash
bun dev
```

Or just build the frontend:

```bash
cd frontend
bun run build
cd ..
bun dev
```

*The backend already can serve static files, so feel free to build the React App*

---

The project was created with `bun init`.
it was made by *János Csordás*.

*This project was made for learning purposes only, feel free to use this to make something even better.*
