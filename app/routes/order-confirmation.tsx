import type { Route } from "./+types/order-confirmation";
import { Link } from "react-router";
import { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Order Confirmation - Royal Furniture & Interior Designing" },
    { name: "description", content: "Your order has been placed successfully" },
  ];
}

// Order data type
type OrderData = {
  customer: {
    name: string;
    mobile: string;
    address: string;
    notes: string;
  };
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  orderId: string;
  date: string;
};

export default function OrderConfirmation() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  // Load order data from localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem('orderData');
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
    } else {
      // Redirect to home if no order data
      window.location.href = '/';
    }
  }, []);

  // Format price
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // WhatsApp contact link
  const whatsappLink = orderData 
    ? `https://wa.me/919876543210?text=Hello,%20I%20placed%20order%20${orderData.orderId}%20and%20would%20like%20to%20discuss%20further%20details.`
    : 'https://wa.me/919876543210?text=Hello,%20I%20would%20like%20to%20discuss%20my%20order.';

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Page Header */}
      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Order Confirmation</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
            <div className="text-6xl mb-6 text-green-500">✅</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 text-lg mb-2">
              Thank you for your order, <span className="font-semibold">{orderData.customer.name}</span>!
            </p>
            <p className="text-gray-500">
              Your order has been received and is being processed.
            </p>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>
                
                {/* Order Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-semibold text-gray-800">{orderData.orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-semibold text-gray-800">{formatDate(orderData.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <p className="font-semibold text-gray-800">{orderData.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="font-semibold text-gray-800">{orderData.customer.mobile}</p>
                  </div>
                </div>

                {/* Items List */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Items Ordered</h4>
                  <div className="space-y-4">
                    {orderData.items.map((item) => (
                      <div key={item.id} className="flex items-center border-b pb-4 last:border-b-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                        />
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800">{item.name}</h5>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{formatPrice(item.price * item.quantity)}</p>
                          <p className="text-sm text-gray-500">₹{item.price.toLocaleString('en-IN')} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total Amount</span>
                    <span className="text-2xl font-bold text-green-600">{formatPrice(orderData.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer & Actions */}
            <div className="lg:col-span-1">
              {/* Delivery Address */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Delivery Address</h3>
                <div className="text-gray-700 whitespace-pre-line">
                  {orderData.customer.address}
                </div>
                {orderData.customer.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold text-gray-800 mb-2">Special Notes</h4>
                    <p className="text-gray-600">{orderData.customer.notes}</p>
                  </div>
                )}
              </div>

              {/* Next Steps */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">What's Next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">1.</span>
                    <p className="text-gray-600">Our team will contact you within 24 hours to confirm your order</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">2.</span>
                    <p className="text-gray-600">We'll discuss delivery timing and any customization needs</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">3.</span>
                    <p className="text-gray-600">Your order will be processed and delivered as per agreed schedule</p>
                  </div>
                </div>
              </div>

              {/* Contact Options */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Need Assistance?</h3>
                
                {!showWhatsApp ? (
                  <button
                    onClick={() => setShowWhatsApp(true)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 mb-3 flex items-center justify-center"
                  >
                    <span className="mr-2">💬</span>
                    Contact on WhatsApp
                  </button>
                ) : (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 mb-3"
                  >
                    Open WhatsApp Chat
                  </a>
                )}
                
                <Link
                  to="/"
                  className="w-full block text-center bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  Continue Browsing
                </Link>
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg p-8 text-center text-white mt-8">
            <h3 className="text-2xl font-bold mb-2">Thank You for Choosing Royal Furniture & Interior Designing!</h3>
            <p className="text-green-100">
              We're committed to providing you with quality furniture and excellent service.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">© 2024 Royal Furniture & Interior Designing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}