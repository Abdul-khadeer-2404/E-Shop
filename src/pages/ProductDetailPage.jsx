import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const sampleProduct = {
  id: 1,
  name: 'Sample Product 1',
  price: 29.99,
  image: 'https://via.placeholder.com/400x400',
  description: 'This is a detailed description of the sample product. It features high-quality materials and exceptional craftsmanship. Perfect for everyday use and available at an unbeatable price.',
  features: ['High-quality materials', 'Exceptional craftsmanship', 'Perfect for everyday use', 'Unbeatable price'],
  stock: 10
};

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProduct(sampleProduct);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-8">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-start">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
        </div>
        <div className="lg:ml-12 w-full lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4 text-indigo-600">${product.price.toFixed(2)}</p>
          <p className="mb-6 text-gray-700">{product.description}</p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-indigo-800">Features:</h2>
            <ul className="list-disc list-inside">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-700">{feature}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <p className="text-indigo-600 font-semibold">
              {product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}
            </p>
          </div>
          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="mr-4 font-semibold">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
              className="border rounded px-2 py-1 w-16 text-center"
            />
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`${
              product.stock > 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
            } text-white px-6 py-3 rounded-lg transition duration-300`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <Link to="/products" className="ml-4 text-indigo-600 hover:text-indigo-800 underline">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;