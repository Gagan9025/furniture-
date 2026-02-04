import type { Route } from "./+types/interior-designing";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { ContentManager, type Package } from "../lib/content-manager";
import { subscribeToContentUpdates, type ContentUpdate, type ContentType } from "../lib/products";
import { useRealTimeUpdates } from "../lib/useRealTimeUpdates";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Interior Designing - Royal Furniture & Interior Designing" },
    { name: "description", content: "Premium interior design packages with quality materials and expert craftsmanship" },
  ];
}

// Get packages from centralized ContentManager - fetched dynamically
function getPackages() {
  return ContentManager.getAllPackages();
}

export default function InteriorDesigning() {
  const [packages, setPackages] = useState<Package[]>(getPackages());

  // Subscribe to content updates
  useEffect(() => {
    const unsubscribe = subscribeToContentUpdates((update) => {
      // Only refresh packages if the update is for packages
      if (update.type === 'PACKAGE') {
        // Refresh packages when any admin action occurs
        setPackages(getPackages());
        
        // Show notification
        const actionText = update.action === 'CREATE' ? 'added' : 
                          update.action === 'UPDATE' ? 'updated' : 'deleted';
        console.log(`Package ${update.data.name} has been ${actionText}`);
      }
    });
    
    return unsubscribe;
  }, []);
  
  // Initialize real-time updates
  useRealTimeUpdates();

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
            {packages.map((pkg: Package) => (
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
                      {pkg.materials.map((material: string, index: number) => (
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
                      {pkg.features.map((feature: string, index: number) => (
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
            href="https://wa.me/918248198534?text=I'd%20like%20to%20discuss%20a%20royal%20custom%20interior%20design%20project"
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