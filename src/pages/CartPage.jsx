import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

const sampleCart = [
  { id: 1, name: 'Sample Product 1', price: 29.99, quantity: 1, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Sample Product 2', price: 49.99, quantity: 2, image: 'https://via.placeholder.com/150' }
];

function CartPage() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : sampleCart;
  });
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shippingMethod, setShippingMethod] = useState('standard');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id, quantity) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeItem = (id) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      setCart(cart.filter(item => item.id !== id));
    }
  };

  const applyPromoCode = () => {
    if (promoCode === 'DISCOUNT20') {
      setDiscount(20);
    } else {
      alert('Invalid promo code');
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = shippingMethod === 'express' ? 15 : 5;
  const total = subtotal + shippingCost - discount;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-800">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center bg-white shadow-md rounded-lg p-8">
          <p className="text-xl mb-4 text-indigo-600">Your cart is empty.</p>
          <Link
            to="/products"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg inline-block hover:bg-indigo-700 transition duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="divide-y divide-gray-200">
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Promo Code</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-grow border rounded px-3 py-2"
                placeholder="Enter promo code"
              />
              <button
                onClick={applyPromoCode}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="standard"
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                />
                <span>Standard Shipping ($5)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="express"
                  checked={shippingMethod === 'express'}
                  onChange={() => setShippingMethod('express')}
                />
                <span>Express Shipping ($15)</span>
              </label>
            </div>
          </div>

          <div className="bg-indigo-100 p-4 sm:p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <p className="flex justify-between"><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></p>
              <p className="flex justify-between"><span>Shipping:</span> <span>${shippingCost.toFixed(2)}</span></p>
              {discount > 0 && (
                <p className="flex justify-between text-green-600"><span>Discount:</span> <span>-${discount.toFixed(2)}</span></p>
              )}
              <p className="flex justify-between font-bold text-lg"><span>Total:</span> <span>${total.toFixed(2)}</span></p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/products"
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg text-center hover:bg-indigo-50 transition duration-200"
              >
                Continue Shopping
              </Link>
              <Link
                to="/checkout"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-center hover:bg-indigo-700 transition duration-200"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4">Recently Viewed Items</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div className="border rounded p-2 text-center">
                <img src="https://via.placeholder.com/100" alt="Product" className="mx-auto mb-2 w-full h-auto" />
                <p className="text-sm">Product Name</p>
                <p className="text-sm font-semibold">$XX.XX</p>
              </div>
              {/* Repeat for other recently viewed items */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;