import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Replace this with your actual API call to fetch the product by id
        const fetchedProduct = {
          id: parseInt(id),
          name: `Product ${id}`,
          price: 29.99,
          image: `https://picsum.photos/400?random=${id}`,
          description: `This is a detailed description of product ${id}. It features high-quality materials and exceptional craftsmanship.`,
          features: ['High-quality materials', 'Exceptional craftsmanship', 'Perfect for everyday use', 'Unbeatable price'],
          stock: 10
        };
        
        setProduct(fetchedProduct);
        updateRecentlyViewed(fetchedProduct);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === product.id);
        if (existingItem) {
          return prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prevCart, { ...product, quantity }];
        }
      });
      // Show a notification or animation here
      alert(`Added ${quantity} of ${product.name} to cart`);
    }
  };

  const updateRecentlyViewed = (product) => {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const updatedRecentlyViewed = [
      product,
      ...recentlyViewed.filter(item => item.id !== product.id)
    ].slice(0, 4); // Keep only the 4 most recent items
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecentlyViewed));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, Math.min(product.stock, value)));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ProductNotFound />;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-col md:flex-row items-start">
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
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="w-full md:w-1/2 mb-6 md:mb-0">
      {imageError ? (
        <div className="w-full h-400 bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
          <span className="text-gray-500">Image not available</span>
        </div>
      ) : (
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-auto object-cover rounded-lg shadow-lg"
          onError={handleImageError}
        />
      )}
    </div>
  );
}

function ProductInfo({ product, quantity, onQuantityChange, onAddToCart }) {
  return (
    <div className="md:ml-8 w-full md:w-1/2">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-indigo-800">{product.name}</h1>
      <p className="text-xl sm:text-2xl font-semibold mb-3 text-indigo-600">${product.price.toFixed(2)}</p>
      <p className="mb-4 text-gray-700 text-sm sm:text-base">{product.description}</p>
      <ProductFeatures features={product.features} />
      <StockInfo stock={product.stock} />
      <QuantitySelector 
        quantity={quantity} 
        stock={product.stock} 
        onChange={onQuantityChange} 
      />
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <AddToCartButton 
          stock={product.stock} 
          onClick={onAddToCart} 
        />
        <Link to="/products" className="text-indigo-600 hover:text-indigo-800 underline text-sm sm:text-base">
          Back to Products
        </Link>
      </div>
    </div>
  );
}

function ProductFeatures({ features }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 text-indigo-800">Features:</h2>
      <ul className="list-disc list-inside text-sm sm:text-base">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-700">{feature}</li>
        ))}
      </ul>
    </div>
  );
}

function StockInfo({ stock }) {
  return (
    <div className="mb-4">
      <p className={`font-semibold ${stock > 0 ? 'text-green-600' : 'text-red-600'} text-sm sm:text-base`}>
        {stock > 0 ? `In stock: ${stock}` : 'Out of stock'}
      </p>
    </div>
  );
}

function QuantitySelector({ quantity, stock, onChange }) {
  return (
    <div className="flex items-center mb-4">
      <label htmlFor="quantity" className="mr-3 font-semibold text-sm sm:text-base">Quantity:</label>
      <input
        type="number"
        id="quantity"
        min="1"
        max={stock}
        value={quantity}
        onChange={onChange}
        className="border rounded px-2 py-1 w-16 text-center text-sm sm:text-base"
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
      } text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition duration-300 text-sm sm:text-base w-full sm:w-auto`}
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