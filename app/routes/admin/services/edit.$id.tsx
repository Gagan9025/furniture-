import { Form, useLoaderData, redirect, type Params } from "react-router";
import AdminLayout from "../../../components/admin/AdminLayout";
import { ContentManager } from "../../../lib/content-manager";
import { AdminSession } from "../../../lib/admin-auth";

export async function loader({ params }: { params: { id: string } }) {
  if (!AdminSession.isAuthenticated()) {
    return redirect("/admin/login");
  }
  
  const serviceId = parseInt(params.id);
  const service = ContentManager.getServiceById(serviceId);
  
  if (!service) {
    return redirect("/admin/services");
  }
  
  return { service };
}

export async function action({ request, params }: { request: Request; params: { id: string } }) {
  if (!AdminSession.isAuthenticated()) {
    return redirect("/admin/login");
  }
  
  const serviceId = parseInt(params.id);
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const whatsappLink = formData.get("whatsappLink") as string;
  
  // Parse features
  const featuresInput = formData.get("features") as string;
  const features = featuresInput.split(',').map(f => f.trim()).filter(f => f);
  
  if (!name || !description || !price || !whatsappLink) {
    return { error: "All fields are required" };
  }
  
  const updatedService = ContentManager.updateService(serviceId, {
    name,
    description,
    price,
    features,
    whatsappLink
  });
  
  if (!updatedService) {
    return { error: "Service not found" };
  }
  
  return redirect("/admin/services");
}

export default function EditService() {
  const { service } = useLoaderData() as { service: any };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-royal-silver-800">Edit Service</h1>
        
        <div className="bg-white rounded-2xl shadow-lg border border-royal-blue-100 p-8">
          <Form method="post" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-royal-silver-700 mb-2">
                Service Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={service.name}
                required
                className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-royal-silver-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                defaultValue={service.description}
                rows={4}
                className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-royal-silver-700 mb-2">
                Price *
              </label>
              <input
                type="text"
                id="price"
                name="price"
                defaultValue={service.price}
                required
                placeholder="₹500"
                className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="features" className="block text-sm font-medium text-royal-silver-700 mb-2">
                Features (comma separated) *
              </label>
              <textarea
                id="features"
                name="features"
                required
                defaultValue={service.features.join(', ')}
                placeholder="Complete tank cleaning, Sanitization, Sediment removal"
                rows={3}
                className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="whatsappLink" className="block text-sm font-medium text-royal-silver-700 mb-2">
                WhatsApp Link *
              </label>
              <input
                type="url"
                id="whatsappLink"
                name="whatsappLink"
                defaultValue={service.whatsappLink}
                required
                placeholder="https://wa.me/..."
                className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
              />
            </div>
            
            <div className="flex gap-4 pt-4">
              <a
                href="/admin/services"
                className="flex-1 bg-royal-silver-200 hover:bg-royal-silver-300 text-royal-silver-800 font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="flex-1 bg-royal-blue-500 hover:bg-royal-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Update Service
              </button>
            </div>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
}