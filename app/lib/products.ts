// Product data management
export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

// Initial product data
let products: Product[] = [
  {
    id: 1,
    name: "Modern Wooden Dining Table",
    description: "Elegant 6-seater dining table with premium wood finish",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop",
    price: 12999,
    category: "Dining"
  },
  {
    id: 2,
    name: "Luxury Sofa Set",
    description: "3-seater premium fabric sofa with wooden frame",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    price: 24999,
    category: "Living Room"
  },
  {
    id: 3,
    name: "King Size Bed",
    description: "Solid wood king size bed with storage",
    image: "https://images.unsplash.com/photo-1613047515355-7047084b56d8?w=400&h=300&fit=crop",
    price: 18999,
    category: "Bedroom"
  },
  {
    id: 4,
    name: "Office Study Table",
    description: "Modern workspace desk with drawers and cable management",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop",
    price: 8999,
    category: "Office"
  },
  {
    id: 5,
    name: "Wardrobe with Mirror",
    description: "Double door wardrobe with full-length mirror",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&h=300&fit=crop",
    price: 15999,
    category: "Bedroom"
  },
  {
    id: 6,
    name: "Coffee Table Set",
    description: "3-piece coffee table set with tempered glass top",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
    price: 6999,
    category: "Living Room"
  },
  {
    id: 7,
    name: "Bookshelf",
    description: "5-tier wooden bookshelf with adjustable shelves",
    image: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?w=400&h=300&fit=crop",
    price: 4999,
    category: "Storage"
  },
  {
    id: 8,
    name: "Dressing Table",
    description: "Vanity dressing table with mirror and stool",
    image: "https://images.unsplash.com/photo-1631678429419-0fb8490d7939?w=400&h=300&fit=crop",
    price: 9999,
    category: "Bedroom"
  }
];

// Product management functions
export class ProductManager {
  static getAll(): Product[] {
    return [...products];
  }
  
  static getById(id: number): Product | undefined {
    return products.find(product => product.id === id);
  }
  
  static create(product: Omit<Product, 'id'>): Product {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProduct = { ...product, id: newId };
    products.push(newProduct);
    return newProduct;
  }
  
  static update(id: number, updates: Partial<Product>): Product | null {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return null;
    
    products[index] = { ...products[index], ...updates };
    return products[index];
  }
  
  static delete(id: number): boolean {
    const initialLength = products.length;
    products = products.filter(product => product.id !== id);
    return products.length < initialLength;
  }
  
  static getCategories(): string[] {
    return [...new Set(products.map(product => product.category))];
  }
}