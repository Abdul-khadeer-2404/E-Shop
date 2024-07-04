import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaExclamationCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const fetchedProduct = await response.json();

        const transformedProduct = {
          id: fetchedProduct.id,
          name: fetchedProduct.title,
          price: fetchedProduct.price,
          image: fetchedProduct.image,
          description: fetchedProduct.description,
          features: [fetchedProduct.category],
          stock: Math.floor(Math.random() * 20) + 1, // Random stock between 1 and 20
          rating: fetchedProduct.rating.rate,
          reviewCount: fetchedProduct.rating.count,
        };

        setProduct(transformedProduct);
        updateRecentlyViewed(transformedProduct);
      } catch (err) {
        setError("Failed to fetch product details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prevCart, { ...product, quantity }];
        }
      });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const updateRecentlyViewed = (product) => {
    const recentlyViewed = JSON.parse(
      localStorage.getItem("recentlyViewed") || "[]"
    );
    const updatedRecentlyViewed = [
      product,
      ...recentlyViewed.filter((item) => item.id !== product.id),
    ].slice(0, 4);
    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(updatedRecentlyViewed)
    );
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, Math.min(product.stock, value)));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ProductNotFound />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col lg:flex-row items-start">
        <ProductImage product={product} />
        <ProductInfo
          product={product}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
        />
      </div>
      {showNotification && (
        <AddToCartNotification product={product} quantity={quantity} />
      )}
    </motion.div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
        role="alert"
      >
        <p className="font-bold">Error</p>
        <p>{message}</p>
      </div>
    </div>
  );
}

function ProductNotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <FaExclamationCircle className="mx-auto text-6xl text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-gray-600">
          We couldn't find the product you're looking for.
        </p>
        <Link
          to="/products"
          className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
}

function ProductImage({ product }) {
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (imageRef.current) {
      const { left, top, width, height } =
        imageRef.current.getBoundingClientRect();
      const x = ((e.pageX - left) / width) * 100;
      const y = ((e.pageY - top) / height) * 100;
      setMousePosition({ x, y });
    }
  };

  return (
    <div className="w-full lg:w-1/2 mb-8 lg:mb-0 relative">
      {imageError ? (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
          <span className="text-gray-500">Image not available</span>
        </div>
      ) : (
        <>
          <img
            ref={imageRef}
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-contain rounded-lg shadow-lg cursor-zoom-in"
            onError={handleImageError}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          />
          {isZoomed && (
            <div
              className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "250%",
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

function ProductInfo({ product, quantity, onQuantityChange, onAddToCart }) {
  return (
    <div className="lg:ml-12 w-full lg:w-1/2">
      <h1 className="text-3xl font-bold mb-3 text-indigo-800">
        {product.name}
      </h1>
      <div className="flex items-center mb-4">
        <Rating rating={product.rating} />
        <span className="ml-2 text-gray-600">
          ({product.reviewCount} reviews)
        </span>
      </div>
      <p className="text-2xl font-semibold mb-4 text-indigo-600">
        ${product.price.toFixed(2)}
      </p>

      {/* Formatted Description */}
      <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-inner">
        <h2 className="text-lg font-semibold mb-2 text-indigo-700">
          Product Description
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {product.description.split(". ").map((sentence, index, array) => (
            <React.Fragment key={index}>
              {sentence}
              {index < array.length - 1 && (
                <>
                  .
                  <br className="hidden md:block" />
                </>
              )}
            </React.Fragment>
          ))}
        </p>
      </div>

      <ProductFeatures features={product.features} />
      <StockInfo stock={product.stock} />
      <QuantitySelector
        quantity={quantity}
        stock={product.stock}
        onChange={onQuantityChange}
      />
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <AddToCartButton stock={product.stock} onClick={onAddToCart} />
        <WishlistButton />
      </div>
      <Link
        to="/products"
        className="text-indigo-600 hover:text-indigo-800 underline"
      >
        Back to Products
      </Link>
    </div>
  );
}

function Rating({ rating }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={
            index < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

function ProductFeatures({ features }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-indigo-800">Features:</h2>
      <ul className="list-disc list-inside">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-700">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StockInfo({ stock }) {
  return (
    <div className="mb-4">
      <p
        className={`font-semibold ${
          stock > 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {stock > 0 ? `In stock: ${stock}` : "Out of stock"}
      </p>
    </div>
  );
}

function QuantitySelector({ quantity, stock, onChange }) {
  return (
    <div className="flex items-center mb-6">
      <label htmlFor="quantity" className="mr-3 font-semibold">
        Quantity:
      </label>
      <input
        type="number"
        id="quantity"
        min="1"
        max={stock}
        value={quantity}
        onChange={onChange}
        className="border rounded px-2 py-1 w-20 text-center"
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
      className={`
        flex items-center justify-center
        ${
          stock > 0
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-gray-400 cursor-not-allowed"
        }
        text-white px-6 py-3 rounded-lg transition duration-300 w-full sm:w-auto
      `}
    >
      <FaShoppingCart className="mr-2" />
      {stock > 0 ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}

function WishlistButton() {
  return (
    <button className="flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg transition duration-300 w-full sm:w-auto">
      <FaHeart className="mr-2" />
      Add to Wishlist
    </button>
  );
}

function AddToCartNotification({ product, quantity }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
    >
      Added {quantity} {quantity > 1 ? "items" : "item"} to cart: {product.name}
    </motion.div>
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
    rating: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
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

AddToCartNotification.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
};

export default ProductDetailPage;
