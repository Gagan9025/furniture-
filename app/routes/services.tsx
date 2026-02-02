import type { Route } from "./+types/services";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Services - Royal Furniture & Interior Designing" },
    { name: "description", content: "Professional furniture & interior design services for your home" },
  ];
}

// Services data
const services = [
  {
    id: 1,
    name: "Water Tank Cleaning",
    description: "Thorough cleaning and sanitization of water storage tanks to ensure safe drinking water",
    price: "₹800",
    features: ["Complete tank cleaning", "Sanitization", "Sediment removal", "Water quality check"],
    whatsappLink: "https://wa.me/919876543210?text=I'd%20like%20to%20book%20Water%20Tank%20Cleaning%20service"
  },
  {
    id: 2,
    name: "Water Pipe Cleaning",
    description: "Professional cleaning of water pipelines to remove deposits and ensure clean water flow",
    price: "₹1000",
    features: ["Pipeline inspection", "High-pressure cleaning", "Deposit removal", "Flow optimization"],
    whatsappLink: "https://wa.me/919876543210?text=I'd%20like%20to%20book%20Water%20Pipe%20Cleaning%20service"
  },
  {
    id: 3,
    name: "Furniture Repair",
    description: "Expert repair services for all types of furniture including wood, metal, and upholstery",
    price: "Starting at ₹500",
    features: ["Wood restoration", "Hardware replacement", "Upholstery repair", "Custom modifications"],
    whatsappLink: "https://wa.me/919876543210?text=I'd%20like%20to%20discuss%20Furniture%20Repair%20services"
  },
  {
    id: 4,
    name: "Deep Cleaning",
    description: "Comprehensive cleaning service for entire homes or offices",
    price: "Starting at ₹1500",
    features: ["Floor cleaning", "Window cleaning", "Bathroom sanitization", "Kitchen deep clean"],
    whatsappLink: "https://wa.me/919876543210?text=I'd%20like%20to%20book%20Deep%20Cleaning%20service"
  },
  {
    id: 5,
    name: "Furniture Assembly",
    description: "Professional assembly of new furniture items with proper installation",
    price: "Starting at ₹300",
    features: ["Flat pack assembly", "Proper installation", "Hardware included", "Warranty on work"],
    whatsappLink: "https://wa.me/919876543210?text=I'd%20like%20to%20book%20Furniture%20Assembly%20service"
  },
  {
    id: 6,
    name: "Custom Woodwork",
    description: "Custom carpentry and woodwork solutions for your specific requirements",
    price: "Custom Pricing",
    features: ["Custom cabinets", "Built-in furniture", "Wood finishing", "Design consultation"],
    whatsappLink: "https://wa.me/919876543210?text=I'd%20like%20to%20discuss%20Custom%20Woodwork%20services"
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-50 to-royal-silver-50">
      {/* Page Header */}
      <div className="bg-white py-8 border-b-2 border-royal-blue-100">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-royal-blue-800 text-center">Royal Services</h1>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 royal-gradient-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 fade-in">
            Royal Home Services
          </h2>
          <p className="text-xl text-royal-blue-100 max-w-3xl mx-auto slide-up">
            Premium services to keep your home pristine, functional, and beautifully maintained with royal care
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="royal-section-title">Our Royal Services</h2>
            <p className="royal-section-subtitle">Experience premium home services with unmatched quality and royal attention to detail</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="royal-card overflow-hidden group hover:-translate-y-2">
                {/* Service Header */}
                <div className="royal-gradient-blue p-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-royal-gold-200 transition-colors">{service.name}</h3>
                  <div className="text-3xl font-bold text-white mt-3">{service.price}</div>
                  {service.price.includes("Starting") && (
                    <p className="text-royal-blue-100 text-sm mt-2">*Varies by size/scope</p>
                  )}
                </div>
                
                {/* Service Content */}
                <div className="p-6">
                  <p className="text-royal-silver-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-royal-silver-800 mb-3">What's Included:</h4>
                    <ul className="text-sm text-royal-silver-600 space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-royal-gold-500 mr-2 mt-1 text-lg">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Buttons */}
                  <div className="space-y-3">
                    <div className="text-center py-3 bg-royal-blue-50 rounded-lg">
                      <span className="text-2xl font-bold text-royal-blue-600">{service.price}</span>
                      {service.price === "Custom Pricing" && (
                        <p className="text-sm text-royal-silver-500 mt-1">Get personalized royal quote</p>
                      )}
                    </div>
                    <a 
                      href={service.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block text-center royal-btn-primary"
                    >
                      Enquire on Royal WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process Section */}
      <section className="py-16 bg-gradient-to-br from-royal-blue-50 to-royal-silver-50">
        <div className="container mx-auto px-4">
          <h2 className="royal-section-title">Royal Service Process</h2>
          <p className="royal-section-subtitle">Our streamlined process ensures royal treatment from start to finish</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            <div className="text-center group">
              <div className="w-20 h-20 royal-gradient-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="font-bold text-royal-silver-800 mb-3 text-lg">Book Service</h3>
              <p className="text-royal-silver-600 text-sm leading-relaxed">Contact us via WhatsApp or phone to schedule your royal service</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 royal-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="font-bold text-royal-silver-800 mb-3 text-lg">Free Assessment</h3>
              <p className="text-royal-silver-600 text-sm leading-relaxed">Our expert will assess your requirements and provide exact royal pricing</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-royal-silver-400 to-royal-silver-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="font-bold text-royal-silver-800 mb-3 text-lg">Professional Service</h3>
              <p className="text-royal-silver-600 text-sm leading-relaxed">Our trained professionals deliver quality service with royal precision</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 royal-gradient-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="font-bold text-royal-silver-800 mb-3 text-lg">Royal Satisfaction</h3>
              <p className="text-royal-silver-600 text-sm leading-relaxed">We ensure your complete satisfaction with our royal standard work</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Service Banner */}
      <section className="py-16 royal-gradient-gold">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Royal Emergency Repairs?</h2>
          <p className="text-xl text-royal-gold-100 mb-8 max-w-3xl mx-auto">
            Experience our royal emergency repair services for urgent furniture and home maintenance needs with priority response
          </p>
          <a 
            href="https://wa.me/919876543210?text=I%20need%20royal%20emergency%20repair%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-royal-gold-700 font-bold py-4 px-8 rounded-xl hover:bg-royal-gold-50 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-white"
          >
            Call for Royal Emergency Service
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