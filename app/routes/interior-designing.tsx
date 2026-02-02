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
    <div className="min-h-screen bg-gradient-to-br from-royal-gold-50 to-royal-blue-50">
      {/* Page Header */}
      <div className="bg-white py-8 border-b-2 border-royal-gold-200">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-royal-gold-700 text-center">Royal Interior Designing</h1>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 royal-gradient-gold relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 fade-in">
            Transform Your Royal Space
          </h2>
          <p className="text-xl text-royal-gold-100 max-w-3xl mx-auto slide-up">
            Royal interior design solutions tailored to your style and budget with premium craftsmanship
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="royal-section-title">Royal Design Packages</h2>
            <p className="royal-section-subtitle">Choose from our curated packages or request a custom royal design solution</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designPackages.map((pkg) => (
              <div key={pkg.id} className="royal-card overflow-hidden group hover:-translate-y-2">
                {/* Image */}
                <div className="h-52 overflow-hidden relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-royal-silver-800 mb-3 group-hover:text-royal-gold-600 transition-colors">{pkg.name}</h3>
                  <p className="text-royal-silver-600 mb-5 leading-relaxed">{pkg.description}</p>
                  
                  {/* Materials */}
                  <div className="mb-5">
                    <h4 className="font-semibold text-royal-silver-800 mb-2">Premium Materials:</h4>
                    <ul className="text-sm text-royal-silver-600 space-y-1">
                      {pkg.materials.map((material, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-royal-gold-500 mr-2 text-lg">✓</span>
                          {material}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-royal-silver-800 mb-2">Royal Features:</h4>
                    <ul className="text-sm text-royal-silver-600 space-y-1">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-royal-blue-500 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-6 bg-royal-gold-50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-royal-gold-600">Starting at {pkg.price}</div>
                    <p className="text-sm text-royal-silver-500 mt-1">*Price may vary based on royal customization</p>
                  </div>
                  
                  {/* Buttons */}
                  <div className="space-y-3">
                    <button 
                      onClick={() => alert(`Royal pricing details for ${pkg.name}: ${pkg.price}`)}
                      className="w-full royal-btn-secondary"
                    >
                      View Royal Pricing
                    </button>
                    <a 
                      href={pkg.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block text-center royal-btn-primary"
                    >
                      Enquire / Custom Royal Design
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Design Section */}
      <section className="py-16 bg-gradient-to-br from-royal-blue-50 to-royal-silver-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="royal-section-title">Need Something Royal & Custom?</h2>
          <p className="royal-section-subtitle">
            Have a unique royal vision? Our expert designers can create custom solutions tailored to your specific requirements and preferences with royal attention to detail.
          </p>
          <a 
            href="https://wa.me/919876543210?text=I'd%20like%20to%20discuss%20a%20royal%20custom%20interior%20design%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block royal-btn-primary text-lg px-10 py-4 shadow-xl hover:shadow-2xl"
          >
            Discuss Royal Custom Project
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-royal-blue-800 to-royal-blue-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">ROYAL HOOD MURLI</h3>
            <p className="text-royal-blue-200">Premium Interior Solutions Since 2024</p>
          </div>
          <div className="border-t border-royal-blue-700 pt-6">
            <p className="text-royal-blue-200">© 2024 Royal Hood Murli. All rights reserved.</p>
            <p className="text-royal-blue-300 text-sm mt-2">Crafted with Royal Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}