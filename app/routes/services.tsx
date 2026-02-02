import type { Route } from "./+types/services";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Services - Royal Hood Murli" },
    { name: "description", content: "Professional cleaning, repair, and maintenance services for your home" },
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Our Services</h1>
            <div className="w-32"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional Home Services
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Quality services to keep your home clean, functional, and beautiful
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                {/* Service Header */}
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-6">
                  <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                  <div className="text-3xl font-bold text-white mt-2">{service.price}</div>
                  {service.price.includes("Starting") && (
                    <p className="text-blue-100 text-sm mt-1">*Varies by size/scope</p>
                  )}
                </div>
                
                {/* Service Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-800 mb-3">What's Included:</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Buttons */}
                  <div className="space-y-3">
                    <div className="text-center py-3">
                      <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                      {service.price === "Custom Pricing" && (
                        <p className="text-sm text-gray-500 mt-1">Get personalized quote</p>
                      )}
                    </div>
                    <a 
                      href={service.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                    >
                      Enquire on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Service Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Book Service</h3>
              <p className="text-gray-600 text-sm">Contact us via WhatsApp or phone to schedule your service</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Free Assessment</h3>
              <p className="text-gray-600 text-sm">Our expert will assess your requirements and provide exact pricing</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Professional Service</h3>
              <p className="text-gray-600 text-sm">Our trained professionals deliver quality service on time</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Satisfaction</h3>
              <p className="text-gray-600 text-sm">We ensure your complete satisfaction with our work</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Service Banner */}
      <section className="py-12 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Emergency Repairs?</h2>
          <p className="text-xl text-red-100 mb-6 max-w-2xl mx-auto">
            We offer emergency repair services for urgent furniture and home maintenance needs
          </p>
          <a 
            href="https://wa.me/919876543210?text=I%20need%20emergency%20repair%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
          >
            Call for Emergency Service
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