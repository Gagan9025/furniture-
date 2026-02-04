// Content Management System for all dynamic content

import { broadcastContentUpdate } from './products';
import type { Product, ContentUpdate, ContentType } from './products';
import { ServerUpdateManager } from './server-updates';

// Interfaces for different content types
export interface Package {
  id: number;
  name: string;
  description: string;
  image: string;
  materials: string[];
  price: string;
  features: string[];
  whatsappLink: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  features: string[];
  whatsappLink: string;
}

// Data stores for different content types
let packages: Package[] = [
  {
    id: 1,
    name: "Basic Interior Package",
    description: "Perfect for small spaces and budget-friendly solutions",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop",
    materials: ["Standard plywood", "Basic laminates", "Essential fittings"],
    price: "₹45,000",
    features: ["Space planning", "Basic design consultation", "Standard materials"],
    whatsappLink: "https://wa.me/918248198534?text=I'm%20interested%20in%20Basic%20Interior%20Package"
  },
  {
    id: 2,
    name: "Premium Interior Package",
    description: "Mid-range solution with better materials and design options",
    image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=400&h=300&fit=crop",
    materials: ["Premium plywood", "High-grade laminates", "Designer fittings", "LED lighting"],
    price: "₹85,000",
    features: ["3D design visualization", "Material selection", "Professional installation"],
    whatsappLink: "https://wa.me/918248198534?text=I'm%20interested%20in%20Premium%20Interior%20Package"
  },
  {
    id: 3,
    name: "Luxury Interior Package",
    description: "High-end premium solutions with custom designs",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop",
    materials: ["Marine ply", "Designer laminates", "Premium hardware", "Smart lighting", "Custom carpentry"],
    price: "₹1,50,000",
    features: ["Custom design", "Premium materials", "Project management", "Warranty included"],
    whatsappLink: "https://wa.me/918248198534?text=I'm%20interested%20in%20Luxury%20Interior%20Package"
  }
];

let services: Service[] = [
  {
    id: 1,
    name: "Water Tank Cleaning",
    description: "Thorough cleaning and sanitization of water storage tanks to ensure safe drinking water",
    price: "₹800",
    features: ["Complete tank cleaning", "Sanitization", "Sediment removal", "Water quality check"],
    whatsappLink: "https://wa.me/918248198534?text=I'd%20like%20to%20book%20Water%20Tank%20Cleaning%20service"
  },
  {
    id: 2,
    name: "Water Pipe Cleaning",
    description: "Professional cleaning of water pipelines to remove deposits and ensure clean water flow",
    price: "₹1000",
    features: ["Pipeline inspection", "High-pressure cleaning", "Deposit removal", "Flow optimization"],
    whatsappLink: "https://wa.me/918248198534?text=I'd%20like%20to%20book%20Water%20Pipe%20Cleaning%20service"
  },
  {
    id: 3,
    name: "Furniture Repair",
    description: "Expert repair services for all types of furniture including wood, metal, and upholstery",
    price: "Starting at ₹500",
    features: ["Wood restoration", "Hardware replacement", "Upholstery repair", "Custom modifications"],
    whatsappLink: "https://wa.me/918248198534?text=I'd%20like%20to%20discuss%20Furniture%20Repair%20services"
  },
  {
    id: 4,
    name: "Deep Cleaning",
    description: "Comprehensive cleaning service for entire homes or offices",
    price: "Starting at ₹1500",
    features: ["Floor cleaning", "Window cleaning", "Bathroom sanitization", "Kitchen deep clean"],
    whatsappLink: "https://wa.me/918248198534?text=I'd%20like%20to%20book%20Deep%20Cleaning%20service"
  },
  {
    id: 5,
    name: "Furniture Assembly",
    description: "Professional assembly of new furniture items with proper installation",
    price: "Starting at ₹300",
    features: ["Flat pack assembly", "Proper installation", "Hardware included", "Warranty on work"],
    whatsappLink: "https://wa.me/918248198534?text=I'd%20like%20to%20book%20Furniture%20Assembly%20service"
  },
  {
    id: 6,
    name: "Custom Woodwork",
    description: "Custom carpentry and woodwork solutions for your specific requirements",
    price: "Custom Pricing",
    features: ["Custom cabinets", "Built-in furniture", "Wood finishing", "Design consultation"],
    whatsappLink: "https://wa.me/918248198534?text=I'd%20like%20to%20discuss%20Custom%20Woodwork%20services"
  }
];

// Content Manager class
export class ContentManager {
  // Product management methods are in the ProductManager class
  
  // Package management methods
  static getAllPackages(): Package[] {
    return [...packages];
  }
  
  static getPackageById(id: number): Package | undefined {
    return packages.find(pkg => pkg.id === id);
  }
  
  static createPackage(pkg: Omit<Package, 'id'>): Package {
    const newId = Math.max(...packages.map(p => p.id), 0) + 1;
    const newPackage = { ...pkg, id: newId };
    packages.push(newPackage);
    
    // Broadcast update to all clients
    broadcastContentUpdate({
      type: 'PACKAGE',
      action: 'CREATE',
      data: newPackage,
      id: newPackage.id
    });
    
    // Send server-side update for cross-tab/cross-device synchronization
    ServerUpdateManager.broadcast({
      type: 'PACKAGE',
      action: 'CREATE',
      data: newPackage,
      id: newPackage.id
    });
    
    return newPackage;
  }
  
  static updatePackage(id: number, updates: Partial<Package>): Package | null {
    const index = packages.findIndex(pkg => pkg.id === id);
    if (index === -1) return null;
    
    packages[index] = { ...packages[index], ...updates };
    const updatedPackage = packages[index];
    
    // Broadcast update to all clients
    broadcastContentUpdate({
      type: 'PACKAGE',
      action: 'UPDATE',
      data: updatedPackage,
      id: updatedPackage.id
    });
    
    // Send server-side update for cross-tab/cross-device synchronization
    ServerUpdateManager.broadcast({
      type: 'PACKAGE',
      action: 'UPDATE',
      data: updatedPackage,
      id: updatedPackage.id
    });
    
    return updatedPackage;
  }
  
  static deletePackage(id: number): boolean {
    const initialLength = packages.length;
    const deletedPackage = packages.find(pkg => pkg.id === id);
    packages = packages.filter(pkg => pkg.id !== id);
    const success = packages.length < initialLength;
    
    if (success && deletedPackage) {
      // Broadcast update to all clients
      broadcastContentUpdate({
        type: 'PACKAGE',
        action: 'DELETE',
        data: deletedPackage,
        id: deletedPackage.id
      });
      
      // Send server-side update for cross-tab/cross-device synchronization
      ServerUpdateManager.broadcast({
        type: 'PACKAGE',
        action: 'DELETE',
        data: deletedPackage,
        id: deletedPackage.id
      });
    }
    
    return success;
  }
  
  // Service management methods
  static getAllServices(): Service[] {
    return [...services];
  }
  
  static getServiceById(id: number): Service | undefined {
    return services.find(service => service.id === id);
  }
  
  static createService(service: Omit<Service, 'id'>): Service {
    const newId = Math.max(...services.map(s => s.id), 0) + 1;
    const newService = { ...service, id: newId };
    services.push(newService);
    
    // Broadcast update to all clients
    broadcastContentUpdate({
      type: 'SERVICE',
      action: 'CREATE',
      data: newService,
      id: newService.id
    });
    
    // Send server-side update for cross-tab/cross-device synchronization
    ServerUpdateManager.broadcast({
      type: 'SERVICE',
      action: 'CREATE',
      data: newService,
      id: newService.id
    });
    
    return newService;
  }
  
  static updateService(id: number, updates: Partial<Service>): Service | null {
    const index = services.findIndex(service => service.id === id);
    if (index === -1) return null;
    
    services[index] = { ...services[index], ...updates };
    const updatedService = services[index];
    
    // Broadcast update to all clients
    broadcastContentUpdate({
      type: 'SERVICE',
      action: 'UPDATE',
      data: updatedService,
      id: updatedService.id
    });
    
    // Send server-side update for cross-tab/cross-device synchronization
    ServerUpdateManager.broadcast({
      type: 'SERVICE',
      action: 'UPDATE',
      data: updatedService,
      id: updatedService.id
    });
    
    return updatedService;
  }
  
  static deleteService(id: number): boolean {
    const initialLength = services.length;
    const deletedService = services.find(service => service.id === id);
    services = services.filter(service => service.id !== id);
    const success = services.length < initialLength;
    
    if (success && deletedService) {
      // Broadcast update to all clients
      broadcastContentUpdate({
        type: 'SERVICE',
        action: 'DELETE',
        data: deletedService,
        id: deletedService.id
      });
      
      // Send server-side update for cross-tab/cross-device synchronization
      ServerUpdateManager.broadcast({
        type: 'SERVICE',
        action: 'DELETE',
        data: deletedService,
        id: deletedService.id
      });
    }
    
    return success;
  }
}