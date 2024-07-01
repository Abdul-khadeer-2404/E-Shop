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

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
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
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center bg-indigo-100 p-6 rounded-lg">
            <p className="text-2xl font-bold text-indigo-800 mb-4 md:mb-0">
              Total: ${total.toFixed(2)}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/products" 
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg inline-block hover:bg-indigo-50 transition duration-200 text-center"
              >
                Continue Shopping
              </Link>
              <Link 
                to="/checkout" 
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg inline-block hover:bg-indigo-700 transition duration-200 text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;