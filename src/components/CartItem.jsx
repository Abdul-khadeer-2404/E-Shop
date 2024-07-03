import React from "react";

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex flex-col justify-between sm:flex-row items-center border-b py-4 px-2 sm:px-4">
      <div className="flex items-center w-full sm:w-auto mb-3 sm:mb-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-16 h-16 object-cover mr-3"
        />
        <div className="flex-grow mr-3 flex flex-col">
          <h3 className="font-bold text-sm mb-1">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end">
        <div className="flex items-center mr-3">
          <button
            onClick={() =>
              onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
            }
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
    </div>
  );
}

export default CartItem;