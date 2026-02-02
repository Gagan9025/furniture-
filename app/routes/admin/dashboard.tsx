import { useLoaderData, redirect } from "react-router";
import AdminLayout from "../../components/admin/AdminLayout";
import { ProductManager } from "../../lib/products";
import { AdminSession } from "../../lib/admin-auth";

export async function loader() {
  if (!AdminSession.isAuthenticated()) {
    return redirect("/admin/login");
  }
  
  const products = ProductManager.getAll();
  const categories = ProductManager.getCategories();
  
  return { 
    products,
    categories,
    totalProducts: products.length,
    totalCategories: categories.length,
    totalValue: products.reduce((sum, product) => sum + product.price, 0)
  };
}

export default function AdminDashboard() {
  const { products, categories, totalProducts, totalCategories, totalValue } = useLoaderData() as {
    products: any[];
    categories: string[];
    totalProducts: number;
    totalCategories: number;
    totalValue: number;
  };
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-royal-silver-800">Dashboard</h1>
          <p className="text-royal-silver-600 mt-2">Welcome to your admin panel</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-royal-blue-100">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-royal-blue-100">
                <span className="text-2xl">📦</span>
              </div>
              <div className="ml-4">
                <p className="text-royal-silver-600 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-royal-silver-800">{totalProducts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-royal-blue-100">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-royal-gold-100">
                <span className="text-2xl">🏷️</span>
              </div>
              <div className="ml-4">
                <p className="text-royal-silver-600 text-sm">Categories</p>
                <p className="text-2xl font-bold text-royal-silver-800">{totalCategories}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-royal-blue-100">
            <div className="flex items-center">
              <div className="p-3 rounded-xl bg-royal-silver-100">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-royal-silver-600 text-sm">Total Value</p>
                <p className="text-2xl font-bold text-royal-silver-800">₹{totalValue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Products */}
        <div className="bg-white rounded-2xl shadow-lg border border-royal-blue-100">
          <div className="p-6 border-b border-royal-blue-100">
            <h2 className="text-xl font-bold text-royal-silver-800">Recent Products</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-royal-blue-50 rounded-xl">
                  <div className="flex items-center">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold text-royal-silver-800">{product.name}</h3>
                      <p className="text-royal-silver-600 text-sm">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-royal-blue-600">₹{product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Categories Overview */}
        <div className="bg-white rounded-2xl shadow-lg border border-royal-blue-100">
          <div className="p-6 border-b border-royal-blue-100">
            <h2 className="text-xl font-bold text-royal-silver-800">Categories</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => {
                const productCount = products.filter(p => p.category === category).length;
                return (
                  <div key={category} className="bg-royal-gold-50 p-4 rounded-xl text-center">
                    <h3 className="font-semibold text-royal-silver-800">{category}</h3>
                    <p className="text-royal-silver-600 text-sm mt-1">{productCount} products</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}