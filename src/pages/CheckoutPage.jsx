import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';

function CheckoutPage() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = shippingMethod === 'express' ? 15 : 5;
  const tax = subtotal * 0.1; // 10% tax rate
  const total = subtotal + tax + shippingCost - discount;

  const handleCheckout = async (formData) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Process the checkout (e.g., send to API, validate payment, etc.)
      console.log('Processing checkout:', formData);

      // Clear the cart from localStorage
      localStorage.removeItem('cart');

      // Redirect to a success page
      navigate('/order-confirmation');
    } catch (err) {
      setError('An error occurred while processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const applyPromoCode = () => {
    if (promoCode === 'DISCOUNT20') {
      setDiscount(20);
    } else {
      alert('Invalid promo code');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <CheckoutForm 
            onSubmit={handleCheckout} 
            isProcessing={isProcessing} 
            onShippingMethodChange={setShippingMethod}
          />
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
        
        <div className="w-full lg:w-1/3">
          <div className="bg-indigo-100 p-4 sm:p-6 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-indigo-800">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2 text-sm sm:text-base">
                <span><b>{item.title} x {item.quantity}</b></span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr className="my-4" />
            <div className="space-y-2 mb-4 text-sm sm:text-base">
              <p className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping ({shippingMethod}):</span>
                <span>${shippingCost.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </p>
              {discount > 0 && (
                <p className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-${discount.toFixed(2)}</span>
                </p>
              )}
              <p className="flex justify-between font-bold text-base sm:text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </p>
            </div>
            <div className="mt-4">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm mb-2"
                placeholder="Enter promo code"
              />
              <button
                onClick={applyPromoCode}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200 text-sm"
              >
                Apply Promo Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;