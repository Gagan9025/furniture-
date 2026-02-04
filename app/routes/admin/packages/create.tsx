import { Form, redirect } from "react-router";
import AdminLayout from "../../../components/admin/AdminLayout";
import { ContentManager } from "../../../lib/content-manager";
import { AdminSession } from "../../../lib/admin-auth";

export async function action({ request }: { request: Request }) {
  if (!AdminSession.isAuthenticated()) {
    return redirect("/admin/login");
  }
  
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const price = formData.get("price") as string;
  const whatsappLink = formData.get("whatsappLink") as string;
  
  // Parse materials and features
  const materialsInput = formData.get("materials") as string;
  const featuresInput = formData.get("features") as string;
  
  const materials = materialsInput.split(',').map(m => m.trim()).filter(m => m);
  const features = featuresInput.split(',').map(f => f.trim()).filter(f => f);
  
  if (!name || !description || !image || !price || !whatsappLink) {
    return { error: "All fields are required" };
  }
  
  const newPackage = ContentManager.createPackage({
    name,
    description,
    image,
    materials,
    price,
    features,
    whatsappLink
  });
  
  return redirect("/admin/packages");
}

export default function CreatePackage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-royal-silver-800">Create New Design Package</h1>
        
        <div className="bg-white rounded-2xl shadow-lg border border-royal-blue-100 p-8">
          <Form method="post" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-royal-silver-700 mb-2">
                Package Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
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
                rows={4}
                className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-royal-silver-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                required
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-royal-silver-700 mb-2">
                Price *
              </label>
              <input
                type="text"
                id="price"
                name="price"
                required
                placeholder="₹50,000"
                className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="materials" className="block text-sm font-medium text-royal-silver-700 mb-2">
                Materials (comma separated) *
              </label>
              <textarea
                id="materials"
                name="materials"
                required
                placeholder="Premium plywood, High-grade laminates, Designer fittings"
                rows={3}
                className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="features" className="block text-sm font-medium text-royal-silver-700 mb-2">
                Features (comma separated) *
              </label>
              <textarea
                id="features"
                name="features"
                required
                placeholder="3D design visualization, Material selection, Professional installation"
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
                required
                placeholder="https://wa.me/..."
                className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
              />
            </div>
            
            <div className="flex gap-4 pt-4">
              <a
                href="/admin/packages"
                className="flex-1 bg-royal-silver-200 hover:bg-royal-silver-300 text-royal-silver-800 font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="flex-1 bg-royal-blue-500 hover:bg-royal-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Create Package
              </button>
            </div>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
}