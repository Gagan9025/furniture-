import { Form, useActionData, useLoaderData, redirect } from "react-router";
import { Link } from "react-router";
import AdminLayout from "../../../components/admin/AdminLayout";
import { ProductManager } from "../../../lib/products";
import { AdminSession } from "../../../lib/admin-auth";

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
  
  return redirect("/admin/products");
}

export default function EditProduct() {
  const { product } = useLoaderData() as { product: any };
  const actionData = useActionData() as { error?: string } | undefined;
  
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/admin/products" 
            className="inline-flex items-center text-royal-blue-600 hover:text-royal-blue-800 mb-4"
          >
            <span className="mr-2">←</span>
            Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-royal-silver-800">Edit Product</h1>
          <p className="text-royal-silver-600 mt-2">Update product details</p>
        </div>
        
        {/* Product Preview */}
        <div className="bg-white rounded-2xl shadow-lg border border-royal-blue-100 p-6 mb-8">
          <div className="flex items-center gap-6">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-xl font-bold text-royal-silver-800">{product.name}</h3>
              <p className="text-royal-blue-600 font-semibold text-lg">₹{product.price.toLocaleString()}</p>
              <span className="inline-block bg-royal-blue-100 text-royal-blue-800 text-xs font-semibold px-3 py-1 rounded-full mt-2">
                {product.category}
              </span>
            </div>
          </div>
        </div>
        
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-royal-blue-100 p-8">
          <Form method="post" className="space-y-6">
            {actionData?.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {actionData.error}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-royal-silver-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={product.name}
                required
                className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-royal-silver-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={product.description}
                required
                rows={4}
                className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
                placeholder="Enter product description"
              />
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-royal-silver-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                defaultValue={product.image}
                required
                className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-royal-silver-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                defaultValue={product.price}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
                placeholder="Enter price"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-royal-silver-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                defaultValue={product.category}
                required
                className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-all"
              >
                <option value="">Select a category</option>
                <option value="Dining">Dining</option>
                <option value="Living Room">Living Room</option>
                <option value="Bedroom">Bedroom</option>
                <option value="Office">Office</option>
                <option value="Storage">Storage</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Link
                to="/admin/products"
                className="flex-1 bg-royal-silver-200 hover:bg-royal-silver-300 text-royal-silver-800 font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="flex-1 bg-royal-blue-500 hover:bg-royal-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Update Product
              </button>
            </div>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
}