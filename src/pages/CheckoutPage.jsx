import React from 'react';
import CheckoutForm from '../components/CheckoutForm';

function CheckoutPage() {
  const handleCheckout = (formData) => {
    // Process the checkout (e.g., send to API, validate payment, etc.)
    console.log('Processing checkout:', formData);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <CheckoutForm onSubmit={handleCheckout} />
    </div>
  );
}

export default CheckoutPage;
