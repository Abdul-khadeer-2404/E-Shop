import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';

function CheckoutPage() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax rate
  const total = subtotal + tax;

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <CheckoutForm onSubmit={handleCheckout} isProcessing={isProcessing} />
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
        
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2 text-sm sm:text-base">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between mb-2 text-sm sm:text-base">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm sm:text-base">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base sm:text-lg mt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;