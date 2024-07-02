import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log(`Added ${quantity} of ${product.name} to cart`);
    // Add animation or notification here
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, Math.min(product.stock, value)));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ProductNotFound />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-start">
        <ProductImage product={product} />
        <ProductInfo 
          product={product} 
          quantity={quantity} 
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return <div className="text-center py-8" aria-live="polite">Loading...</div>;
}

function ErrorMessage({ message }) {
  return <div className="text-center py-8 text-red-500" role="alert">{message}</div>;
}

function ProductNotFound() {
  return <div className="text-center py-8">Product not found</div>;
}

function ProductImage({ product }) {
  return (
    <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
      <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
    </div>
  );
}

function ProductInfo({ product, quantity, onQuantityChange, onAddToCart }) {
  return (
    <div className="lg:ml-12 w-full lg:w-1/2">
      <h1 className="text-3xl font-bold mb-4 text-indigo-800">{product.name}</h1>
      <p className="text-2xl font-semibold mb-4 text-indigo-600">${product.price.toFixed(2)}</p>
      <p className="mb-6 text-gray-700">{product.description}</p>
      <ProductFeatures features={product.features} />
      <StockInfo stock={product.stock} />
      <QuantitySelector 
        quantity={quantity} 
        stock={product.stock} 
        onChange={onQuantityChange} 
      />
      <AddToCartButton 
        stock={product.stock} 
        onClick={onAddToCart} 
      />
      <Link to="/products" className="ml-4 text-indigo-600 hover:text-indigo-800 underline">
        Back to Products
      </Link>
    </div>
  );
}

function ProductFeatures({ features }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-indigo-800">Features:</h2>
      <ul className="list-disc list-inside">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-700">{feature}</li>
        ))}
      </ul>
    </div>
  );
}

function StockInfo({ stock }) {
  return (
    <div className="mb-6">
      <p className={`font-semibold ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {stock > 0 ? `In stock: ${stock}` : 'Out of stock'}
      </p>
    </div>
  );
}

function QuantitySelector({ quantity, stock, onChange }) {
  return (
    <div className="flex items-center mb-6">
      <label htmlFor="quantity" className="mr-4 font-semibold">Quantity:</label>
      <input
        type="number"
        id="quantity"
        min="1"
        max={stock}
        value={quantity}
        onChange={onChange}
        className="border rounded px-2 py-1 w-16 text-center"
        aria-label="Product quantity"
      />
    </div>
  );
}

function AddToCartButton({ stock, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={stock === 0}
      className={`${
        stock > 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
      } text-white px-6 py-3 rounded-lg transition duration-300`}
    >
      {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
    </button>
  );
}

ProductDetailPage.propTypes = {
  id: PropTypes.string.isRequired,
};

ProductImage.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

ProductFeatures.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
};

StockInfo.propTypes = {
  stock: PropTypes.number.isRequired,
};

QuantitySelector.propTypes = {
  quantity: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

AddToCartButton.propTypes = {
  stock: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProductDetailPage;