import { redirect } from "react-router";
import { ProductManager, broadcastProductUpdate } from "../../../lib/products";
import { AdminSession } from "../../../lib/admin-auth";

// GET - Get single product
export async function loader({ params }: { params: { id: string } }) {
  if (!AdminSession.isAuthenticated()) {
    return redirect("/admin/login");
  }
  
  const productId = parseInt(params.id);
  const product = ProductManager.getById(productId);
  
  if (!product) {
    return redirect("/admin/products");
  }
  
  return { product };
}

// POST - Update product
export async function action({ request, params }: { request: Request; params: { id: string } }) {
  if (!AdminSession.isAuthenticated()) {
    return redirect("/admin/login");
  }
  
  const formData = await request.formData();
  const productId = parseInt(params.id);
  
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  
  if (!name || !description || !image || isNaN(price) || !category) {
    return { error: "All fields are required" };
  }
  
  const updatedProduct = ProductManager.update(productId, {
    name,
    description,
    image,
    price,
    category
  });
  
  if (!updatedProduct) {
    return { error: "Product not found" };
  }
  
  // Broadcast update to all clients
  broadcastProductUpdate('UPDATE', updatedProduct);
  
  return { success: true, product: updatedProduct };
}