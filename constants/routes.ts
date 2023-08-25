const ROUTES = {
  HOME: "/",
  SIGNIN: "/sign-in",
  DASHBOARD: "/dashboard",

  // Products
  PRODUCTS: "/dashboard/products",
  CREATE_PRODUCT: "/dashboard/products/create",
  EDIT_PRODUCT: (id: string) => `/dashboard/products/${id}`,

  // Categories
  CATEGORIES: "/dashboard/categories",
  CREATE_CATEGORY: "/dashboard/categories/create",
  EDIT_CATEGORY: (id: string) => `/dashboard/categories/${id}`,

  // Brands
  BRANDS: "/dashboard/brands",
  CREATE_BRAND: "/dashboard/brands/create",
  EDIT_BRAND: (id: string) => `/dashboard/brands/${id}`,

  // Tags
  TAGS: "/dashboard/tags",
  CREATE_TAG: "/dashboard/tags/create",
  EDIT_TAG: (id: string) => `/dashboard/tags/${id}`,

  // Rest
  ORDERS: "/dashboard/orders",
  USERS: "/dashboard/users",
  SETTINGS: "/dashboard/settings",
};

export default ROUTES;
