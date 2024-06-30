import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <div className="p-2 sm:p-3">
        <h3 className="font-semibold text-xs sm:text-sm mb-1 truncate">{product.name}</h3>
        <p className="text-gray-700 text-xs sm:text-sm mb-2">${product.price.toFixed(2)}</p>
        <Link
          to={`/product/${product.id}`}
          className="bg-blue-500 text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1 rounded hover:bg-blue-600 transition duration-300"
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;