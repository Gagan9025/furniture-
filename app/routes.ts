import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("interior-designing", "routes/interior-designing.tsx"),
  route("services", "routes/services.tsx"),
  route("products", "routes/products.tsx"),
  route("cart", "routes/cart.tsx"),
  route("order-confirmation", "routes/order-confirmation.tsx"),
  
  // Admin routes
  route("admin/login", "routes/admin/login.tsx"),
  route("admin/dashboard", "routes/admin/dashboard.tsx"),
  route("admin/products", "routes/admin/products/index.tsx"),
  route("admin/products/create", "routes/admin/products/create.tsx"),
  route("admin/products/edit/:id", "routes/admin/products/edit.$id.tsx"),
  
  // Admin API routes
  route("api/admin/logout", "routes/api/admin/logout.ts"),
  route("api/admin/products", "routes/api/admin/products.ts"),
  route("api/admin/products/:id", "routes/api/admin/products.$id.ts"),
  route("api/admin/products/:id/delete", "routes/api/admin/products.$id.delete.ts"),
] satisfies RouteConfig;
