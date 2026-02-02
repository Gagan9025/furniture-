import { Link, useLocation } from "react-router";
import { useState } from "react";

export default function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Interior Designing", path: "/interior-designing", icon: "🛋️" },
    { name: "Services", path: "/services", icon: "🔧" },
    { name: "Products", path: "/products", icon: "🪑" },
    { name: "Admin", path: "/admin/login", icon: "🔒" }
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
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-royal-blue-600 hover:text-royal-blue-800 hover:bg-royal-blue-50 p-3 rounded-lg transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white border-t border-royal-blue-100 shadow-lg`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-royal-blue-500 text-white shadow-md"
                    : "text-royal-silver-700 hover:text-royal-blue-600 hover:bg-royal-blue-50"
                }`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}