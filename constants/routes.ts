const ROUTES = {
  HOME: "/",
  SIGNIN: "/sign-in",
  DASHBOARD: "/dashboard",
  PRODUCTS: "/dashboard/products",
  CREATE_PRODUCT: "/dashboard/products/create",
  EDIT_PRODUCT: (id: string) => `/dashboard/products/${id}`,
  ORDERS: "/dashboard/orders",
  USERS: "/dashboard/users",
  SETTINGS: "/dashboard/settings",
};

export default ROUTES;
