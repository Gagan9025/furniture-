import { redirect } from "react-router";
import { ProductManager, broadcastProductUpdate } from "../../../lib/products";
import { AdminSession } from "../../../lib/admin-auth";

// POST - Delete product
export async function action({ params }: { params: { id: string } }) {
  if (!AdminSession.isAuthenticated()) {
    return redirect("/admin/login");
  }
  
  const productId = parseInt(params.id);
  const productToDelete = ProductManager.getById(productId);
  const success = ProductManager.delete(productId);
  
  if (!success) {
    return { error: "Product not found" };
  }
  
  // Broadcast update to all clients
  if (productToDelete) {
    broadcastProductUpdate('DELETE', productToDelete);
  }
  
  return { success: true };
}