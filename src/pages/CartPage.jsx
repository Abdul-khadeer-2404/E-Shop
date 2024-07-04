import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function CartPage() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const savedRecentlyViewed = localStorage.getItem("recentlyViewed");
    return savedRecentlyViewed ? JSON.parse(savedRecentlyViewed) : [];
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id) => {
    setItemToRemove(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmRemove = () => {
    setCart(cart.filter((item) => item.id !== itemToRemove));
    setShowConfirmDialog(false);
    setItemToRemove(null);
  };

  const handleCancelRemove = () => {
    setShowConfirmDialog(false);
    setItemToRemove(null);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-indigo-800">
        Your Cart
      </h1>
      {cart.length === 0 ? (
        <div className="text-center bg-white shadow-md rounded-lg p-6 sm:p-8">
          <p className="text-lg sm:text-xl mb-4 text-indigo-600">
            Your cart is empty.
          </p>
          <Link
            to="/products"
            className="bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg inline-block hover:bg-indigo-700 transition duration-200 text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6 sm:mb-8">
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Shipping Method
            </h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  value="standard"
                  checked={shippingMethod === "standard"}
                  onChange={() => setShippingMethod("standard")}
                />
                <span>Standard Shipping ($5)</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  value="express"
                  checked={shippingMethod === "express"}
                  onChange={() => setShippingMethod("express")}
                />
                <span>Express Shipping ($15)</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end mb-6 sm:mb-8">
            <Link
              to="/checkout"
              className="bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-center hover:bg-indigo-700 transition duration-200 text-sm sm:text-base"
            >
              Proceed to Checkout
            </Link>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Recently Viewed Items
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recentlyViewed.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 bg-white"
                >
                  <div className="w-full pb-[75%] relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2 sm:p-4">
                    <h3 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2 truncate text-indigo-800">
                      {product.name}
                    </h3>
                    <p className="text-indigo-600 text-xs mb-2 sm:mb-3">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="flex flex-col space-y-1 sm:space-y-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="bg-indigo-500 text-white text-xs px-2 sm:px-3 py-1 rounded transition duration-300 hover:bg-indigo-600 text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Remove Item</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to remove this item from your cart?
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleConfirmRemove}
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Remove
                </button>
                <button
                  onClick={handleCancelRemove}
                  className="mt-3 px-4 py-2 bg-white text-gray-800 text-base font-medium rounded-md w-full shadow-sm border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;