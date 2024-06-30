import React from 'react';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex items-center border-b py-4">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
      <div className="flex-grow">
        <h3 className="font-bold">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
        <span className="mx-2">{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
      </div>
      <button onClick={() => onRemove(item.id)} className="ml-4 text-red-500">Remove</button>
    </div>
  );
}

export default CartItem;
