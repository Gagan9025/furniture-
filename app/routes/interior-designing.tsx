import type { Route } from "./+types/interior-designing";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Interior Designing - Royal Hood Murli" },
    { name: "description", content: "Premium interior design packages with quality materials and expert craftsmanship" },
  ];
}

// Interior design packages data
const designPackages = [
  {
    id: 1,
    name: "Basic Interior Package",
    description: "Perfect for small spaces and budget-friendly solutions",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop",
    materials: ["Standard plywood", "Basic laminates", "Essential fittings"],
    price: "₹45,000",
    features: ["Space planning", "Basic design consultation", "Standard materials"],
    whatsappLink: "https://wa.me/919876543210?text=I'm%20interested%20in%20Basic%20Interior%20Package"
  },
  {
    id: 2,
    name: "Premium Interior Package",
    description: "Mid-range solution with better materials and design options",
    image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=400&h=300&fit=crop",
    materials: ["Premium plywood", "High-grade laminates", "Designer fittings", "LED lighting"],
    price: "₹85,000",
    features: ["3D design visualization", "Material selection", "Professional installation"],
    whatsappLink: "https://wa.me/919876543210?text=I'm%20interested%20in%20Premium%20Interior%20Package"
  },
  {
    id: 3,
    name: "Luxury Interior Package",
    description: "High-end premium solutions with custom designs",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop",
    materials: ["Marine ply", "Designer laminates", "Premium hardware", "Smart lighting", "Custom carpentry"],
    price: "₹1,50,000",
    features: ["Custom design", "Premium materials", "Project management", "Warranty included"],
    whatsappLink: "https://wa.me/919876543210?text=I'm%20interested%20in%20Luxury%20Interior%20Package"
  }
];

export default function InteriorDesigning() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-amber-600 transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Interior Designing</h1>
            <div className="w-32"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Transform Your Space
          </h2>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Professional interior design solutions tailored to your style and budget
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  
                  {/* Materials */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Materials Included:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {pkg.materials.map((material, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          {material}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-amber-500 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-amber-600">Starting at {pkg.price}</div>
                    <p className="text-sm text-gray-500 mt-1">*Price may vary based on customization</p>
                  </div>
                  
                  {/* Buttons */}
                  <div className="space-y-3">
                    <button 
                      onClick={() => alert(`Exact pricing details for ${pkg.name}: ${pkg.price}`)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                    >
                      View Pricing Details
                    </button>
                    <a 
                      href={pkg.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                    >
                      Enquire / Custom Design
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Design Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Need Something Custom?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Have a unique vision? Our expert designers can create custom solutions tailored to your specific requirements and preferences.
          </p>
          <a 
            href="https://wa.me/919876543210?text=I'd%20like%20to%20discuss%20a%20custom%20interior%20design%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Discuss Custom Project
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">© 2024 Royal Hood Murli. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}