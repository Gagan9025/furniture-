import type { Route } from "./+types/products";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Our Products - Royal Hood Murli" },
    { name: "description", content: "Premium furniture collection with quality craftsmanship and modern designs" },
  ];
}

// Furniture products data
const products = [
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

// Cart item type
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function Products() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  // Add to cart function
  const addToCart = (product: typeof products[0]) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { 
          id: product.id, 
          name: product.name, 
          price: product.price, 
          quantity: 1,
          image: product.image
        }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Calculate total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Format price
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    if (cart.length === 0) return;
    // Store cart data in localStorage for the cart page
    localStorage.setItem('cartItems', JSON.stringify(cart));
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-green-600 transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
            <button 
              onClick={() => setShowCart(!showCart)}
              className="relative bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors duration-300"
            >
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-green-500 to-emerald-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Premium Furniture Collection
          </h2>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Quality craftsmanship meets modern design in our carefully curated furniture collection
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                {/* Product Image */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-green-600">{formatPrice(product.price)}</div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    <span className="mr-2">🛒</span>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCart(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                <button 
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500">Your cart is empty</p>
                  <p className="text-sm text-gray-400 mt-2">Add some products to get started</p>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center border-b pb-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                          <p className="text-green-600 font-bold">{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="mx-3 w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Cart Total */}
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">Total:</span>
                      <span className="text-2xl font-bold text-green-600">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={proceedToCheckout}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 text-lg"
                  >
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">© 2024 Royal Hood Murli. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}