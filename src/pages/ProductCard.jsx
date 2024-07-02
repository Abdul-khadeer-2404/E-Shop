import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProductCard({ product, addToCart }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white transform hover:-translate-y-1">
      <div className="relative pb-[75%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
        />
        {product.discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.discount}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-900 font-bold text-lg">
            ${product.price.toFixed(2)}
          </p>
          {product.originalPrice && (
            <p className="text-gray-500 line-through text-sm">
              ${product.originalPrice.toFixed(2)}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-blue-500 text-white text-center text-sm px-4 py-2 rounded hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            View Details
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-green-500 text-white text-sm px-4 py-2 rounded hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    discount: PropTypes.number,
    originalPrice: PropTypes.number,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;