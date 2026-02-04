import type { Route } from "./+types/products";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { ProductManager, subscribeToContentUpdates, type ContentUpdate, type ContentType } from "../lib/products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Our Products - Royal Furniture & Interior Designing" },
    { name: "description", content: "Premium furniture collection with quality craftsmanship and modern designs" },
  ];
}

// Get products from centralized ProductManager - fetched dynamically
function getProducts() {
  return ProductManager.getAll();
}

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
  const [products, setProducts] = useState(getProducts());
  const navigate = useNavigate();

  // Subscribe to content updates
  useEffect(() => {
    const unsubscribe = subscribeToContentUpdates((update) => {
      // Only refresh products if the update is for products
      if (update.type === 'PRODUCT') {
        // Refresh products when any admin action occurs
        setProducts(getProducts());
        
        // Show notification
        const actionText = update.action === 'CREATE' ? 'added' : 
                          update.action === 'UPDATE' ? 'updated' : 'deleted';
        console.log(`Product ${update.data.name} has been ${actionText}`);
      }
    });
    
    return unsubscribe;
  }, []);

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

  // Refresh products manually when needed
  const refreshProducts = () => {
    setProducts(getProducts());
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    if (cart.length === 0) return;
    // Store cart data in localStorage for the cart page
    localStorage.setItem('cartItems', JSON.stringify(cart));
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-50 to-royal-silver-50">
      {/* Page Header with Cart */}
      <div className="bg-white py-6 sticky top-20 z-10 shadow-lg border-b-2 border-royal-blue-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-royal-blue-800">Our Premium Products</h1>
            <button 
              onClick={() => setShowCart(!showCart)}
              className="relative royal-btn-primary p-3"
            >
              <span className="text-xl">🛒</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-royal-gold-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 royal-gradient-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 fade-in">
            Royal Furniture Collection
          </h2>
          <p className="text-xl text-royal-blue-100 max-w-3xl mx-auto slide-up">
            Royal craftsmanship meets modern elegance in our carefully curated premium furniture collection
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="royal-section-title">Our Royal Collection</h2>
            <p className="royal-section-subtitle">Discover furniture that defines luxury and elegance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="royal-card overflow-hidden group">
                {/* Product Image */}
                <div className="h-52 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-royal-silver-800 group-hover:text-royal-blue-600 transition-colors">{product.name}</h3>
                    <span className="bg-royal-blue-100 text-royal-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-royal-silver-600 text-sm mb-5 leading-relaxed">{product.description}</p>
                  
                  {/* Price */}
                  <div className="mb-5">
                    <div className="text-2xl font-bold text-royal-gold-600">{formatPrice(product.price)}</div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full royal-btn-primary flex items-center justify-center group-hover:shadow-lg"
                  >
                    <span className="mr-2 text-lg">🛒</span>
                    Add to Royal Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 backdrop-blur-sm" onClick={() => setShowCart(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b border-royal-silver-200 pb-4">
                <h2 className="text-2xl font-bold text-royal-blue-800">Royal Cart</h2>
                <button 
                  onClick={() => setShowCart(false)}
                  className="text-royal-silver-500 hover:text-royal-blue-600 hover:bg-royal-blue-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-7xl mb-4 text-royal-silver-300">🛒</div>
                  <h3 className="text-xl font-bold text-royal-silver-700 mb-2">Your Royal Cart is Empty</h3>
                  <p className="text-royal-silver-500">Add some premium products to experience royal luxury</p>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center border-b border-royal-silver-100 pb-4 hover:bg-royal-blue-50 p-3 rounded-lg transition-all duration-300">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg mr-4 border-2 border-royal-silver-200"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-royal-silver-800 text-sm mb-1">{item.name}</h3>
                          <p className="text-royal-gold-600 font-bold text-lg">{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex items-center bg-royal-silver-100 rounded-full p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-royal-blue-100 text-royal-blue-600 transition-colors"
                          >
                            -
                          </button>
                          <span className="mx-3 w-8 text-center font-semibold text-royal-silver-700">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-royal-blue-100 text-royal-blue-600 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="ml-3 text-royal-silver-400 hover:text-red-500 hover:bg-red-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                          title="Remove item"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Cart Total */}
                  <div className="border-t border-royal-silver-200 pt-4 mb-6 bg-royal-blue-50 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-royal-silver-800">Royal Total:</span>
                      <span className="text-2xl font-bold text-royal-gold-600">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={proceedToCheckout}
                    className="w-full royal-btn-primary text-lg font-bold py-4 shadow-lg hover:shadow-xl"
                  >
                    Proceed to Royal Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

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