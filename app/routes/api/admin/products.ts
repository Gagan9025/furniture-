import { redirect } from "react-router";
import { ProductManager } from "../../../lib/products";
import { AdminSession } from "../../../lib/admin-auth";

// GET - Get all products
export async function loader() {
  if (!AdminSession.isAuthenticated()) {
    return redirect("/admin/login");
  }
  
  const products = ProductManager.getAll();
  return { products };
}

// POST - Create new product
export async function action({ request }: { request: Request }) {
  if (!AdminSession.isAuthenticated()) {
    return redirect("/admin/login");
  }
  
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  
  if (!name || !description || !image || isNaN(price) || !category) {
    return { error: "All fields are required" };
  }
  
  const newProduct = ProductManager.create({
    name,
    description,
    image,
    price,
    category
  });
  
  return { success: true, product: newProduct };
}