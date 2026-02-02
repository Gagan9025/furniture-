import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Royal Furniture & Interior Designing - Home" },
    { name: "description", content: "Professional Furniture & Interior Designing Services" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-50 to-royal-silver-50">
      {/* Hero Section */}
      <section className="royal-gradient-blue py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 fade-in">
Royal Furniture & Interior Designing
          </h1>
          <p className="text-2xl text-royal-blue-100 max-w-2xl mx-auto slide-up">Premium Furniture & Interior Design Solutions</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Interior Designing Card */}
          <Link 
            to="/interior-designing"
            className="group royal-card overflow-hidden"
          >
            <div className="h-48 royal-gradient-gold flex items-center justify-center">
              <div className="text-6xl text-white transform group-hover:scale-110 transition-transform duration-300">🏠</div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-royal-silver-800 mb-3 group-hover:text-royal-gold-600 transition-colors">
                Interior Designing
              </h2>
              <p className="text-royal-silver-600 mb-4">
                Complete interior design solutions with premium materials and expert craftsmanship
              </p>
              <div className="flex items-center text-royal-gold-600 font-semibold">
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
            className="group royal-card overflow-hidden"
          >
            <div className="h-48 royal-gradient-blue flex items-center justify-center">
              <div className="text-6xl text-white transform group-hover:scale-110 transition-transform duration-300">🔧</div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-royal-silver-800 mb-3 group-hover:text-royal-blue-600 transition-colors">
                Services
              </h2>
              <p className="text-royal-silver-600 mb-4">
                Professional cleaning, repair, and maintenance services for your home
              </p>
              <div className="flex items-center text-royal-blue-600 font-semibold">
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
            className="group royal-card overflow-hidden"
          >
            <div className="h-48 bg-gradient-to-br from-royal-silver-400 to-royal-silver-600 flex items-center justify-center">
              <div className="text-6xl text-white transform group-hover:scale-110 transition-transform duration-300">🪑</div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-royal-silver-800 mb-3 group-hover:text-royal-silver-700 transition-colors">
                Our Products
              </h2>
              <p className="text-royal-silver-600 mb-4">
                Premium furniture collection with quality craftsmanship and modern designs
              </p>
              <div className="flex items-center text-royal-silver-700 font-semibold">
                <span>Shop Now</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

        </div>

        {/* Additional Info Section */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <h2 className="royal-section-title">Why Choose Royal Hood Murli?</h2>
          <p className="royal-section-subtitle">Experience royal treatment with our premium services and unmatched quality</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="royal-card p-8 text-center hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 royal-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-royal-silver-800 mb-3">Premium Quality</h3>
              <p className="text-royal-silver-600">Top-grade materials and expert craftsmanship that define luxury</p>
            </div>
            <div className="royal-card p-8 text-center hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 royal-gradient-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-royal-silver-800 mb-3">Royal Delivery</h3>
              <p className="text-royal-silver-600">Swift and reliable delivery services with white-glove treatment</p>
            </div>
            <div className="royal-card p-8 text-center hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-royal-silver-400 to-royal-silver-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👑</span>
              </div>
              <h3 className="text-xl font-bold text-royal-silver-800 mb-3">Expert Support</h3>
              <p className="text-royal-silver-600">Royal consultation and personalized support for every project</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-royal-blue-800 to-royal-blue-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Royal Furniture & Interior Designing</h3>
            <p className="text-royal-blue-200">Premium Furniture & Design Solutions Since 2024</p>
          </div>
          <div className="border-t border-royal-blue-700 pt-6">
            <p className="text-royal-blue-200">© 2024 Royal Furniture & Interior Designing. All rights reserved.</p>
            <p className="text-royal-blue-300 text-sm mt-2">Crafted with Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
