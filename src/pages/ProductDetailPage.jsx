import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const sampleProduct = {
  id: 1,
  name: 'Sample Product 1',
  price: 29.99,
  image: 'https://via.placeholder.com/150',
  description: 'This is a detailed description of the sample product. It features high-quality materials and exceptional craftsmanship. Perfect for everyday use and available at an unbeatable price. Add it to your cart now and experience the difference.'
};

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(sampleProduct);

  useEffect(() => {
    // Fetch product details from API
    // For example: fetch(`/api/products/${id}`).then(res => res.json()).then(setProduct);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center">
        <img src={product.image} alt={product.name} className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-lg" />
        <div className="md:ml-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
