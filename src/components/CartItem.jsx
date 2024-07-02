import React from 'react';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex flex-row items-center border-b py-4 px-4">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-3" />
      <div className="flex-grow mr-3">
        <h3 className="font-bold text-sm">{item.name}</h3>
        <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center mr-3">
        <button 
          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))} 
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition duration-200 text-sm"
        >
          -
        </button>
        <span className="mx-2 text-sm">{item.quantity}</span>
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} 
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition duration-200 text-sm"
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
  );
}

export default CartItem;