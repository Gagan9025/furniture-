import { redirect } from "react-router";
import { ContentManager } from "../../../lib/content-manager";
import { AdminSession } from "../../../lib/admin-auth";

// POST - Delete service
export async function action({ params }: { params: { id: string } }) {
  if (!AdminSession.isAuthenticated()) {
    return redirect("/admin/login");
  }
  
  const serviceId = parseInt(params.id);
  const success = ContentManager.deleteService(serviceId);
  
  if (!success) {
    return { error: "Service not found" };
  }
  
  return { success: true };
}