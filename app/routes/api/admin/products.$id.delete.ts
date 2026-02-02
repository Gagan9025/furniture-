import { redirect } from "react-router";
import { ProductManager } from "../../../lib/products";
import { AdminSession } from "../../../lib/admin-auth";

// POST - Delete product
export async function action({ params }: { params: { id: string } }) {
  if (!AdminSession.isAuthenticated()) {
    return redirect("/admin/login");
  }
  
  const productId = parseInt(params.id);
  const success = ProductManager.delete(productId);
  
  if (!success) {
    return { error: "Product not found" };
  }
  
  return { success: true };
}