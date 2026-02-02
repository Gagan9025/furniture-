import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Royal Hood Murli - Home" },
    { name: "description", content: "Professional Interior Designing, Services, and Furniture Products" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              ROYAL HOOD MURLI
            </h1>
            <p className="text-lg text-gray-600">Professional Interior Solutions</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Interior Designing Card */}
          <Link 
            to="/interior-designing"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-300"
          >
            <div className="h-48 bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <div className="text-6xl text-white">🏠</div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors">
                Interior Designing
              </h2>
              <p className="text-gray-600 mb-4">
                Complete interior design solutions with premium materials and expert craftsmanship
              </p>
              <div className="flex items-center text-amber-600 font-semibold">
                <span>Explore Packages</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Services Card */}
          <Link 
            to="/services"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-300"
          >
            <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
              <div className="text-6xl text-white">🔧</div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                Services
              </h2>
              <p className="text-gray-600 mb-4">
                Professional cleaning, repair, and maintenance services for your home
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                <span>View Services</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Our Products Card */}
          <Link 
            to="/products"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-300"
          >
            <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <div className="text-6xl text-white">🪑</div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                Our Products
              </h2>
              <p className="text-gray-600 mb-4">
                Premium furniture collection with quality craftsmanship and modern designs
              </p>
              <div className="flex items-center text-green-600 font-semibold">
                <span>Shop Now</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Royal Hood Murli?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-semibold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Top-grade materials and expert craftsmanship</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl mb-3">🚚</div>
              <h3 className="font-semibold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Quick and reliable delivery services</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-semibold text-gray-800 mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">Professional consultation and support</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">© 2024 Royal Hood Murli. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
