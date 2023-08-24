const ROUTES = {
  HOME: "/",
  SIGNIN: "/sign-in",
  DASHBOARD: "/dashboard",
  PRODUCTS: "/dashboard/products",
  CREATE_PRODUCT: "/dashboard/products/create",
  EDIT_PRODUCT: (id: string) => `/dashboard/products/${id}`,
  CATEGORIES: "/dashboard/categories",
  CREATE_CATEGORY: "/dashboard/categories/create",
  EDIT_CATEGORY: (id: string) => `/dashboard/categories/${id}`,
  BRANDS: "/dashboard/brands",
  CREATE_BRAND: "/dashboard/brands/create",
  EDIT_BRAND: (id: string) => `/dashboard/brands/${id}`,
  ORDERS: "/dashboard/orders",
  USERS: "/dashboard/users",
  SETTINGS: "/dashboard/settings",
};

export default ROUTES;
