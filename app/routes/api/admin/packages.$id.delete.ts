import { redirect } from "react-router";
import { ContentManager } from "../../../lib/content-manager";
import { AdminSession } from "../../../lib/admin-auth";

// POST - Delete package
export async function action({ params }: { params: { id: string } }) {
  if (!AdminSession.isAuthenticated()) {
    return redirect("/admin/login");
  }
  
  const packageId = parseInt(params.id);
  const success = ContentManager.deletePackage(packageId);
  
  if (!success) {
    return { error: "Package not found" };
  }
  
  return { success: true };
}