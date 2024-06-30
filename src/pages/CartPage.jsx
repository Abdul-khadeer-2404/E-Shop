import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

const sampleCart = [
  { id: 1, name: 'Sample Product 1', price: 29.99, quantity: 1, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Sample Product 2', price: 49.99, quantity: 2, image: 'https://via.placeholder.com/150' }
];

function CartPage() {
  const [cart, setCart] = useState(sampleCart);

  const updateQuantity = (id, quantity) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
          <div className="mt-8">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <Link to="/checkout" className="bg-blue-500 text-white px-6 py-3 rounded-lg inline-block mt-4">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
