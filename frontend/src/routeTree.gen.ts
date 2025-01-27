/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProfileImport } from './routes/_profile'
import { Route as AdminAuthenticatedImport } from './routes/admin/_authenticated'

// Create Virtual Routes

const AdminImport = createFileRoute('/admin')()
const SignupLazyImport = createFileRoute('/signup')()
const ShoppingCartLazyImport = createFileRoute('/shopping-cart')()
const SearchProductLazyImport = createFileRoute('/search-product')()
const ProductsLazyImport = createFileRoute('/products')()
const LoginLazyImport = createFileRoute('/login')()
const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()
const AdminIndexLazyImport = createFileRoute('/admin/')()
const AdminLoginLazyImport = createFileRoute('/admin/login')()
const ProfileProfileLazyImport = createFileRoute('/_profile/profile')()
const AdminAuthenticatedDashboardIndexLazyImport = createFileRoute(
  '/admin/_authenticated/dashboard/',
)()
const AdminAuthenticatedDashboardProductsIndexLazyImport = createFileRoute(
  '/admin/_authenticated/dashboard/products/',
)()
const AdminAuthenticatedDashboardOrdersIndexLazyImport = createFileRoute(
  '/admin/_authenticated/dashboard/orders/',
)()
const AdminAuthenticatedDashboardMessagesIndexLazyImport = createFileRoute(
  '/admin/_authenticated/dashboard/messages/',
)()
const AdminAuthenticatedDashboardCustomersIndexLazyImport = createFileRoute(
  '/admin/_authenticated/dashboard/customers/',
)()
const AdminAuthenticatedDashboardProductsCreateLazyImport = createFileRoute(
  '/admin/_authenticated/dashboard/products/create',
)()
const AdminAuthenticatedDashboardOrdersApprovedOrdersLazyImport =
  createFileRoute('/admin/_authenticated/dashboard/orders/approved-orders')()

// Create/Update Routes

const AdminRoute = AdminImport.update({
  path: '/admin',
  getParentRoute: () => rootRoute,
} as any)

const SignupLazyRoute = SignupLazyImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/signup.lazy').then((d) => d.Route))

const ShoppingCartLazyRoute = ShoppingCartLazyImport.update({
  path: '/shopping-cart',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/shopping-cart.lazy').then((d) => d.Route))

const SearchProductLazyRoute = SearchProductLazyImport.update({
  path: '/search-product',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/search-product.lazy').then((d) => d.Route),
)

const ProductsLazyRoute = ProductsLazyImport.update({
  path: '/products',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/products.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const ProfileRoute = ProfileImport.update({
  id: '/_profile',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AdminIndexLazyRoute = AdminIndexLazyImport.update({
  path: '/',
  getParentRoute: () => AdminRoute,
} as any).lazy(() => import('./routes/admin/index.lazy').then((d) => d.Route))

const AdminLoginLazyRoute = AdminLoginLazyImport.update({
  path: '/login',
  getParentRoute: () => AdminRoute,
} as any).lazy(() => import('./routes/admin/login.lazy').then((d) => d.Route))

const ProfileProfileLazyRoute = ProfileProfileLazyImport.update({
  path: '/profile',
  getParentRoute: () => ProfileRoute,
} as any).lazy(() =>
  import('./routes/_profile/profile.lazy').then((d) => d.Route),
)

const AdminAuthenticatedRoute = AdminAuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => AdminRoute,
} as any)

const AdminAuthenticatedDashboardIndexLazyRoute =
  AdminAuthenticatedDashboardIndexLazyImport.update({
    path: '/dashboard/',
    getParentRoute: () => AdminAuthenticatedRoute,
  } as any).lazy(() =>
    import('./routes/admin/_authenticated/dashboard/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AdminAuthenticatedDashboardProductsIndexLazyRoute =
  AdminAuthenticatedDashboardProductsIndexLazyImport.update({
    path: '/dashboard/products/',
    getParentRoute: () => AdminAuthenticatedRoute,
  } as any).lazy(() =>
    import('./routes/admin/_authenticated/dashboard/products/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AdminAuthenticatedDashboardOrdersIndexLazyRoute =
  AdminAuthenticatedDashboardOrdersIndexLazyImport.update({
    path: '/dashboard/orders/',
    getParentRoute: () => AdminAuthenticatedRoute,
  } as any).lazy(() =>
    import('./routes/admin/_authenticated/dashboard/orders/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AdminAuthenticatedDashboardMessagesIndexLazyRoute =
  AdminAuthenticatedDashboardMessagesIndexLazyImport.update({
    path: '/dashboard/messages/',
    getParentRoute: () => AdminAuthenticatedRoute,
  } as any).lazy(() =>
    import('./routes/admin/_authenticated/dashboard/messages/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AdminAuthenticatedDashboardCustomersIndexLazyRoute =
  AdminAuthenticatedDashboardCustomersIndexLazyImport.update({
    path: '/dashboard/customers/',
    getParentRoute: () => AdminAuthenticatedRoute,
  } as any).lazy(() =>
    import('./routes/admin/_authenticated/dashboard/customers/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AdminAuthenticatedDashboardProductsCreateLazyRoute =
  AdminAuthenticatedDashboardProductsCreateLazyImport.update({
    path: '/dashboard/products/create',
    getParentRoute: () => AdminAuthenticatedRoute,
  } as any).lazy(() =>
    import('./routes/admin/_authenticated/dashboard/products/create.lazy').then(
      (d) => d.Route,
    ),
  )

const AdminAuthenticatedDashboardOrdersApprovedOrdersLazyRoute =
  AdminAuthenticatedDashboardOrdersApprovedOrdersLazyImport.update({
    path: '/dashboard/orders/approved-orders',
    getParentRoute: () => AdminAuthenticatedRoute,
  } as any).lazy(() =>
    import(
      './routes/admin/_authenticated/dashboard/orders/approved-orders.lazy'
    ).then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_profile': {
      id: '/_profile'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/products': {
      id: '/products'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof ProductsLazyImport
      parentRoute: typeof rootRoute
    }
    '/search-product': {
      id: '/search-product'
      path: '/search-product'
      fullPath: '/search-product'
      preLoaderRoute: typeof SearchProductLazyImport
      parentRoute: typeof rootRoute
    }
    '/shopping-cart': {
      id: '/shopping-cart'
      path: '/shopping-cart'
      fullPath: '/shopping-cart'
      preLoaderRoute: typeof ShoppingCartLazyImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin': {
      id: '/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/admin/_authenticated': {
      id: '/admin/_authenticated'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminAuthenticatedImport
      parentRoute: typeof AdminRoute
    }
    '/_profile/profile': {
      id: '/_profile/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileProfileLazyImport
      parentRoute: typeof ProfileImport
    }
    '/admin/login': {
      id: '/admin/login'
      path: '/login'
      fullPath: '/admin/login'
      preLoaderRoute: typeof AdminLoginLazyImport
      parentRoute: typeof AdminImport
    }
    '/admin/': {
      id: '/admin/'
      path: '/'
      fullPath: '/admin/'
      preLoaderRoute: typeof AdminIndexLazyImport
      parentRoute: typeof AdminImport
    }
    '/admin/_authenticated/dashboard/': {
      id: '/admin/_authenticated/dashboard/'
      path: '/dashboard'
      fullPath: '/admin/dashboard'
      preLoaderRoute: typeof AdminAuthenticatedDashboardIndexLazyImport
      parentRoute: typeof AdminAuthenticatedImport
    }
    '/admin/_authenticated/dashboard/orders/approved-orders': {
      id: '/admin/_authenticated/dashboard/orders/approved-orders'
      path: '/dashboard/orders/approved-orders'
      fullPath: '/admin/dashboard/orders/approved-orders'
      preLoaderRoute: typeof AdminAuthenticatedDashboardOrdersApprovedOrdersLazyImport
      parentRoute: typeof AdminAuthenticatedImport
    }
    '/admin/_authenticated/dashboard/products/create': {
      id: '/admin/_authenticated/dashboard/products/create'
      path: '/dashboard/products/create'
      fullPath: '/admin/dashboard/products/create'
      preLoaderRoute: typeof AdminAuthenticatedDashboardProductsCreateLazyImport
      parentRoute: typeof AdminAuthenticatedImport
    }
    '/admin/_authenticated/dashboard/customers/': {
      id: '/admin/_authenticated/dashboard/customers/'
      path: '/dashboard/customers'
      fullPath: '/admin/dashboard/customers'
      preLoaderRoute: typeof AdminAuthenticatedDashboardCustomersIndexLazyImport
      parentRoute: typeof AdminAuthenticatedImport
    }
    '/admin/_authenticated/dashboard/messages/': {
      id: '/admin/_authenticated/dashboard/messages/'
      path: '/dashboard/messages'
      fullPath: '/admin/dashboard/messages'
      preLoaderRoute: typeof AdminAuthenticatedDashboardMessagesIndexLazyImport
      parentRoute: typeof AdminAuthenticatedImport
    }
    '/admin/_authenticated/dashboard/orders/': {
      id: '/admin/_authenticated/dashboard/orders/'
      path: '/dashboard/orders'
      fullPath: '/admin/dashboard/orders'
      preLoaderRoute: typeof AdminAuthenticatedDashboardOrdersIndexLazyImport
      parentRoute: typeof AdminAuthenticatedImport
    }
    '/admin/_authenticated/dashboard/products/': {
      id: '/admin/_authenticated/dashboard/products/'
      path: '/dashboard/products'
      fullPath: '/admin/dashboard/products'
      preLoaderRoute: typeof AdminAuthenticatedDashboardProductsIndexLazyImport
      parentRoute: typeof AdminAuthenticatedImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  ProfileRoute: ProfileRoute.addChildren({ ProfileProfileLazyRoute }),
  AboutLazyRoute,
  LoginLazyRoute,
  ProductsLazyRoute,
  SearchProductLazyRoute,
  ShoppingCartLazyRoute,
  SignupLazyRoute,
  AdminRoute: AdminRoute.addChildren({
    AdminAuthenticatedRoute: AdminAuthenticatedRoute.addChildren({
      AdminAuthenticatedDashboardIndexLazyRoute,
      AdminAuthenticatedDashboardOrdersApprovedOrdersLazyRoute,
      AdminAuthenticatedDashboardProductsCreateLazyRoute,
      AdminAuthenticatedDashboardCustomersIndexLazyRoute,
      AdminAuthenticatedDashboardMessagesIndexLazyRoute,
      AdminAuthenticatedDashboardOrdersIndexLazyRoute,
      AdminAuthenticatedDashboardProductsIndexLazyRoute,
    }),
    AdminLoginLazyRoute,
    AdminIndexLazyRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_profile",
        "/about",
        "/login",
        "/products",
        "/search-product",
        "/shopping-cart",
        "/signup",
        "/admin"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/_profile": {
      "filePath": "_profile.tsx",
      "children": [
        "/_profile/profile"
      ]
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/login": {
      "filePath": "login.lazy.tsx"
    },
    "/products": {
      "filePath": "products.lazy.tsx"
    },
    "/search-product": {
      "filePath": "search-product.lazy.tsx"
    },
    "/shopping-cart": {
      "filePath": "shopping-cart.lazy.tsx"
    },
    "/signup": {
      "filePath": "signup.lazy.tsx"
    },
    "/admin": {
      "filePath": "admin",
      "children": [
        "/admin/_authenticated",
        "/admin/login",
        "/admin/"
      ]
    },
    "/admin/_authenticated": {
      "filePath": "admin/_authenticated.tsx",
      "parent": "/admin",
      "children": [
        "/admin/_authenticated/dashboard/",
        "/admin/_authenticated/dashboard/orders/approved-orders",
        "/admin/_authenticated/dashboard/products/create",
        "/admin/_authenticated/dashboard/customers/",
        "/admin/_authenticated/dashboard/messages/",
        "/admin/_authenticated/dashboard/orders/",
        "/admin/_authenticated/dashboard/products/"
      ]
    },
    "/_profile/profile": {
      "filePath": "_profile/profile.lazy.tsx",
      "parent": "/_profile"
    },
    "/admin/login": {
      "filePath": "admin/login.lazy.tsx",
      "parent": "/admin"
    },
    "/admin/": {
      "filePath": "admin/index.lazy.tsx",
      "parent": "/admin"
    },
    "/admin/_authenticated/dashboard/": {
      "filePath": "admin/_authenticated/dashboard/index.lazy.tsx",
      "parent": "/admin/_authenticated"
    },
    "/admin/_authenticated/dashboard/orders/approved-orders": {
      "filePath": "admin/_authenticated/dashboard/orders/approved-orders.lazy.tsx",
      "parent": "/admin/_authenticated"
    },
    "/admin/_authenticated/dashboard/products/create": {
      "filePath": "admin/_authenticated/dashboard/products/create.lazy.tsx",
      "parent": "/admin/_authenticated"
    },
    "/admin/_authenticated/dashboard/customers/": {
      "filePath": "admin/_authenticated/dashboard/customers/index.lazy.tsx",
      "parent": "/admin/_authenticated"
    },
    "/admin/_authenticated/dashboard/messages/": {
      "filePath": "admin/_authenticated/dashboard/messages/index.lazy.tsx",
      "parent": "/admin/_authenticated"
    },
    "/admin/_authenticated/dashboard/orders/": {
      "filePath": "admin/_authenticated/dashboard/orders/index.lazy.tsx",
      "parent": "/admin/_authenticated"
    },
    "/admin/_authenticated/dashboard/products/": {
      "filePath": "admin/_authenticated/dashboard/products/index.lazy.tsx",
      "parent": "/admin/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
