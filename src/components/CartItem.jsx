import React from "react";

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const handleQuantityChange = (change) => {
    onUpdateQuantity(item.id, Math.max(1, item.quantity + change));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center border-b py-4 px-2 sm:px-4 gap-4">
      <div className="flex items-center w-full sm:w-auto">
        <img
          src={item.image}
          alt={item.title}
          className="w-16 h-16 object-cover rounded-md mr-4"
        />
        <div className="flex-grow flex flex-col">
          <h3 className="font-bold text-sm mb-1 line-clamp-2">{item.title}</h3>
          <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full sm:w-auto sm:ml-auto gap-4">
        <div className="flex items-center">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300 transition duration-200 text-sm"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-3 py-1 bg-gray-100 text-sm">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300 transition duration-200 text-sm"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 transition duration-200 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;