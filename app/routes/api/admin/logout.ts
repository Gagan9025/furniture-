import { redirect } from "react-router";
import { AdminSession } from "../../../lib/admin-auth";

export async function action() {
  AdminSession.logout();
  return redirect("/admin/login");
}