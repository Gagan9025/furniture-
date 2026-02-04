import { useLoaderData, redirect } from "react-router";
import AdminLayout from "../../../components/admin/AdminLayout";
import { ContentManager } from "../../../lib/content-manager";
import { AdminSession } from "../../../lib/admin-auth";

export async function loader() {
  if (!AdminSession.isAuthenticated()) {
    return redirect("/admin/login");
  }
  
  const services = ContentManager.getAllServices();
  
  return { services };
}

export default function ServicesList() {
  const { services } = useLoaderData() as {
    services: any[];
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-royal-silver-800">Services</h1>
          <a 
            href="/admin/services/create"
            className="bg-royal-blue-500 hover:bg-royal-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md"
          >
            Add Service
          </a>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-royal-blue-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-royal-blue-100">
              <thead className="bg-royal-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-royal-silver-700 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-royal-silver-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-royal-silver-700 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-royal-silver-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-royal-blue-100">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-royal-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-royal-silver-700">{service.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-royal-silver-800">{service.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-royal-silver-700">{service.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a 
                        href={`/admin/services/edit/${service.id}`}
                        className="text-royal-blue-600 hover:text-royal-blue-900 mr-4"
                      >
                        Edit
                      </a>
                      <form 
                        method="post" 
                        action={`/api/admin/services/${service.id}/delete`}
                        onSubmit={(e) => {
                          if (!confirm('Are you sure you want to delete this service?')) {
                            e.preventDefault();
                          }
                        }}
                        className="inline"
                      >
                        <button 
                          type="submit"
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}