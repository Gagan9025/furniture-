import type { Route } from "./+types/cart";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cart - Royal Hood Murli" },
    { name: "description", content: "Review your cart and complete your order" },
  ];
}

// Cart item type
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

// Order form data type
type OrderFormData = {
  name: string;
  mobile: string;
  address: string;
  quantity: number;
  notes: string;
};

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    mobile: '',
    address: '',
    quantity: 1,
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  // Load cart items from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Calculate total
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Format price
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // Store order data in localStorage
    const orderData = {
      customer: formData,
      items: cartItems,
      total: cartTotal,
      orderId: `ORD-${Date.now()}`,
      date: new Date().toISOString()
    };
    
    localStorage.setItem('orderData', JSON.stringify(orderData));
    
    // Clear cart
    localStorage.removeItem('cartItems');
    
    // Navigate to confirmation page
    navigate('/order-confirmation');
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    if (updatedCart.length === 0) {
      navigate('/products');
    }
  };

  // Update quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-blue-50 to-royal-silver-50">
      {/* Page Header */}
      <div className="bg-white py-8 border-b-2 border-royal-blue-100">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-royal-blue-800 text-center">Your Royal Cart</h1>
        </div>
      </div>

      {cartItems.length === 0 ? (
        // Empty Cart State
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-8xl mb-6 text-royal-silver-300">🛒</div>
            <h2 className="text-3xl font-bold text-royal-silver-800 mb-4">Your Royal Cart is Empty</h2>
            <p className="text-royal-silver-600 mb-8">
              Discover our premium collection and experience royal luxury.
            </p>
            <Link 
              to="/products"
              className="inline-block royal-btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl"
            >
              Browse Royal Products
            </Link>
          </div>
        </div>
      ) : (
        // Cart with Items
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div className="royal-card p-6 mb-6">
                <h2 className="text-2xl font-bold text-royal-silver-800 mb-6">Royal Order Summary</h2>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center border-b border-royal-silver-100 pb-4 last:border-b-0 hover:bg-royal-blue-50 p-3 rounded-lg transition-all duration-300">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg mr-4 border-2 border-royal-silver-200"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-royal-silver-800">{item.name}</h3>
                        <p className="text-royal-gold-600 font-bold text-lg">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center bg-royal-silver-100 rounded-full p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-royal-blue-100 text-royal-blue-600 transition-colors"
                        >
                          -
                        </button>
                        <span className="mx-4 w-12 text-center font-semibold text-royal-silver-700">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-royal-blue-100 text-royal-blue-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="ml-6 text-royal-silver-400 hover:text-red-500 hover:bg-red-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                        title="Remove item"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Form Section */}
            <div className="lg:col-span-1">
              <div className="royal-card p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-royal-silver-800 mb-6">Royal Order Details</h2>
                
                {/* Cart Total */}
                <div className="mb-6 p-4 bg-royal-blue-50 rounded-xl border border-royal-blue-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-royal-silver-600">Subtotal</span>
                    <span className="font-semibold text-royal-silver-800">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-royal-silver-600">Royal Delivery</span>
                    <span className="font-semibold text-royal-gold-600">Free</span>
                  </div>
                  <div className="border-t border-royal-blue-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-royal-silver-800">Royal Total</span>
                      <span className="text-2xl font-bold text-royal-gold-600">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-royal-silver-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-colors ${
                        errors.name ? 'border-red-500' : 'border-royal-silver-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-semibold text-royal-silver-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-colors ${
                        errors.mobile ? 'border-red-500' : 'border-royal-silver-300'
                      }`}
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                    />
                    {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-royal-silver-700 mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-colors resize-none ${
                        errors.address ? 'border-red-500' : 'border-royal-silver-300'
                      }`}
                      placeholder="Enter your complete address"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-semibold text-royal-silver-700 mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-royal-silver-300 rounded-lg focus:ring-2 focus:ring-royal-blue-500 focus:border-royal-blue-500 transition-colors resize-none"
                      placeholder="Any special royal instructions or requirements"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full royal-btn-primary text-lg font-bold py-4 shadow-lg hover:shadow-xl"
                  >
                    Place Royal Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-royal-blue-800 to-royal-blue-900 text-white py-12 mt-20">
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