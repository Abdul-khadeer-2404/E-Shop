import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const sampleProducts = [
  { id: 1, name: 'Sample Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Sample Product 2', price: 49.99, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Sample Product 3', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Sample Product 4', price: 99.99, image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Sample Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Sample Product 2', price: 49.99, image: 'https://via.placeholder.com/150' },
  { id: 7, name: 'Sample Product 3', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 8, name: 'Sample Product 4', price: 99.99, image: 'https://via.placeholder.com/150' },
  { id: 9, name: 'Sample Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 10, name: 'Sample Product 2', price: 49.99, image: 'https://via.placeholder.com/150' },
  { id: 11, name: 'Sample Product 3', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 12, name: 'Sample Product 4', price: 99.99, image: 'https://via.placeholder.com/150' },
  { id: 13, name: 'Sample Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 14, name: 'Sample Product 2', price: 49.99, image: 'https://via.placeholder.com/150' },
  { id: 15, name: 'Sample Product 3', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 16, name: 'Sample Product 4', price: 99.99, image: 'https://via.placeholder.com/150' },
];

function ProductListPage() {
  const [products, setProducts] = useState(sampleProducts);

  useEffect(() => {
    // Fetch products from API
    // For example: fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105">
            <div className="w-full">
              <img src={product.image} alt={product.name} className="w-full h-auto object-contain" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm md:text-base mb-2 truncate">{product.name}</h3>
              <p className="text-gray-700 text-xs md:text-sm mb-3">${product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`} className="bg-blue-500 text-white text-xs md:text-sm px-3 py-1 rounded transition duration-300 hover:bg-blue-600">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;