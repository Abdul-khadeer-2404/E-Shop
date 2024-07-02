import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';

const sampleProducts = [
  { id: 1, name: 'Sample Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Sample Product 2', price: 49.99, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Sample Product 3', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Sample Product 4', price: 99.99, image: 'https://via.placeholder.com/150' }
];

function ProductGrid({ products = sampleProducts, loading = false, error = null }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-32 sm:h-64">
        <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4 sm:py-8">
        <p className="text-sm sm:text-base">Error: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4 sm:py-8">
        <p className="text-sm sm:text-base">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default ProductGrid;