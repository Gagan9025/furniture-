import { useLoaderData, redirect, Form } from "react-router";
import { Link } from "react-router";
import AdminLayout from "../../../components/admin/AdminLayout";
import { ProductManager } from "../../../lib/products";
import { AdminSession } from "../../../lib/admin-auth";

export async function loader() {
  if (!AdminSession.isAuthenticated()) {
    return redirect("/admin/login");
  }
  
  const products = ProductManager.getAll();
  return { products };
}

export default function AdminProducts() {
  const { products } = useLoaderData() as { products: any[] };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-royal-silver-800">Products</h1>
            <p className="text-royal-silver-600 mt-2">Manage your product catalog</p>
          </div>
          <Link
            to="/admin/products/create"
            className="bg-royal-blue-500 hover:bg-royal-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <span className="mr-2">+</span>
            Add Product
          </Link>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg border border-royal-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-royal-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-royal-silver-800 mb-2">{product.name}</h3>
                <p className="text-royal-silver-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-royal-blue-600">₹{product.price.toLocaleString()}</span>
                </div>
                
                <div className="flex gap-3">
                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="flex-1 bg-royal-blue-500 hover:bg-royal-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-center"
                  >
                    Edit
                  </Link>
                  <Form 
                    method="post" 
                    action={`/api/admin/products/${product.id}/delete`}
                    onSubmit={(e) => {
                      if (!confirm('Are you sure you want to delete this product?')) {
                        e.preventDefault();
                      }
                    }}
                    className="flex-1"
                  >
                    <button
                      type="submit"
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                    >
                      Delete
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-royal-silver-800 mb-2">No products yet</h3>
            <p className="text-royal-silver-600 mb-6">Get started by adding your first product</p>
            <Link
              to="/admin/products/create"
              className="bg-royal-blue-500 hover:bg-royal-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Add Your First Product
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}