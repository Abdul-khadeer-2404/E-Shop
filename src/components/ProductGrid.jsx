import React from 'react';
import ProductCard from '../pages/ProductCard';

const sampleProducts = [
  { id: 1, name: 'Sample Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Sample Product 2', price: 49.99, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Sample Product 3', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Sample Product 4', price: 99.99, image: 'https://via.placeholder.com/150' }
];

function ProductGrid({ products = sampleProducts }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;