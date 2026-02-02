import { Link, useLocation } from "react-router";

export default function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Interior Designing", path: "/interior-designing", icon: "🛋️" },
    { name: "Services", path: "/services", icon: "🔧" },
    { name: "Products", path: "/products", icon: "🪑" }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-amber-600 transition-colors">
            ROYAL HOOD MURLI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "bg-amber-100 text-amber-700"
                    : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-amber-600 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}