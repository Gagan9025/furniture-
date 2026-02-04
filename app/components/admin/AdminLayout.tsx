import { Form, Link, useLocation } from "react-router";
import { useState } from "react";

interface SidebarItem {
  name: string;
  path: string;
  icon: string;
}

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
  { name: "Products", path: "/admin/products", icon: "📦" },
  { name: "Design Packages", path: "/admin/packages", icon: "🎁" },
  { name: "Services", path: "/admin/services", icon: "🔧" },
  { name: "Orders", path: "/admin/orders", icon: "🛒" },
  { name: "Settings", path: "/admin/settings", icon: "⚙️" }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 border-b">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-royal-blue-600 p-2 rounded-lg hover:bg-royal-blue-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <h1 className="text-xl font-bold text-royal-blue-700">Admin Panel</h1>
          <div className="w-10"></div>
        </div>
      </div>
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } md:static md:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="hidden md:flex items-center justify-center h-20 border-b border-royal-blue-100">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-royal-blue-500 to-royal-gold-500 bg-clip-text text-transparent">
              Admin Panel
            </h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-royal-blue-500 text-white shadow-lg"
                    : "text-royal-silver-700 hover:text-royal-blue-600 hover:bg-royal-blue-50"
                }`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Logout */}
          <div className="p-4 border-t border-royal-blue-100">
            <Form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="w-full flex items-center px-4 py-3 text-royal-silver-700 hover:text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all duration-300"
              >
                <span className="mr-3 text-xl">🚪</span>
                Logout
              </button>
            </Form>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="md:ml-64 pt-16 md:pt-0">
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}