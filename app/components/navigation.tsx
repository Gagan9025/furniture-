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
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-royal-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-royal-blue-700 hover:text-royal-blue-500 transition-all duration-300 flex items-center">
            <span className="bg-gradient-to-r from-royal-blue-500 to-royal-gold-500 bg-clip-text text-transparent">
              ROYAL HOOD MURLI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 mx-1 ${
                  location.pathname === item.path
                    ? "bg-royal-blue-500 text-white shadow-lg"
                    : "text-royal-silver-700 hover:text-royal-blue-600 hover:bg-royal-blue-50"
                }`}
              >
                <span className="mr-2 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-royal-blue-600 hover:text-royal-blue-800 hover:bg-royal-blue-50 p-3 rounded-lg transition-all duration-300">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}