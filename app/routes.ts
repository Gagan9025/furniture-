import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("interior-designing", "routes/interior-designing.tsx"),
  route("services", "routes/services.tsx"),
  route("products", "routes/products.tsx"),
  route("cart", "routes/cart.tsx"),
  route("order-confirmation", "routes/order-confirmation.tsx"),
] satisfies RouteConfig;
