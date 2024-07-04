import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import {
  FaShoppingCart,
  FaList,
  FaThLarge,
  FaSearch,
  FaStar,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("title");
  const [filterPrice, setFilterPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const productsPerPage = 8;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(
        data.map((product) => ({
          ...product,
          rating: product.rating.rate,
          reviewCount: product.rating.count,
        }))
      );
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
      console.error("There was a problem with the fetch operation:", err);
    } finally {
      setLoading(false);
    }
  };

  const sortedAndFilteredProducts = useMemo(() => {
    return products
      .filter(
        (product) =>
          (filterPrice === "" || product.price <= parseFloat(filterPrice)) &&
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [products, filterPrice, searchTerm, sortBy]);

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return sortedAndFilteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
  }, [currentPage, sortedAndFilteredProducts]);

  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-800">
        Our Products
      </h1>

      <ProductControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterPrice={filterPrice}
        setFilterPrice={setFilterPrice}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <ProductList
        products={currentProducts}
        viewMode={viewMode}
        addToCart={addToCart}
      />

      <Pagination
        currentPage={currentPage}
        totalProducts={sortedAndFilteredProducts.length}
        productsPerPage={productsPerPage}
        paginate={paginate}
      />

      <CartButton cart={cart} setIsCartOpen={setIsCartOpen} />

      <AnimatePresence>
        {isCartOpen && (
          <CartModal
            cart={cart}
            removeFromCart={removeFromCart}
            setIsCartOpen={setIsCartOpen}
            clearCart={clearCart}
            updateQuantity={updateQuantity}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNotification && <AddToCartNotification />}
      </AnimatePresence>
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

function ProductControls({
  sortBy,
  setSortBy,
  filterPrice,
  setFilterPrice,
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
}) {
  const debouncedSetSearchTerm = debounce(setSearchTerm, 300);

  return (
    <div className="mb-8 flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center w-full sm:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-2 py-1 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="title">Name</option>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className="flex items-center w-full sm:w-auto">
          <input
            type="number"
            value={filterPrice}
            onChange={(e) => setFilterPrice(Math.max(0, e.target.value))}
            placeholder="Max Price"
            min="0"
            className="border rounded px-2 py-1 w-full sm:w-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => debouncedSetSearchTerm(e.target.value)}
            className="border rounded px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${
              viewMode === "grid"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${
              viewMode === "list"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            <FaList />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductList({ products, viewMode, addToCart }) {
  return (
    <AnimatePresence>
      {viewMode === "grid" ? (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {products.map((product) => (
            <ProductListItem
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProductCard({ product, addToCart }) {
  return (
    <motion.div
      className="border rounded-lg overflow-hidden shadow-md bg-white"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full pb-[100%] relative">
        <img
          src={product.image}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2 truncate text-indigo-800">
          {product.title}
        </h3>
        <div className="flex justify-between items-center mb-3">
          <p className="text-indigo-600 font-bold">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-sm text-gray-600">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <Link
            to={`/product/${product.id}`}
            className="bg-indigo-500 text-white text-sm px-3 py-1 rounded transition duration-300 hover:bg-indigo-600 text-center"
          >
            View Details
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="bg-green-500 text-white text-sm px-3 py-1 rounded transition duration-300 hover:bg-green-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProductListItem({ product, addToCart }) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row border rounded-lg overflow-hidden shadow-md bg-white"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full sm:w-48 h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg mb-2 text-indigo-800">
            {product.title}
          </h3>
          <p className="text-gray-600 mb-2">
            {product.description.substring(0, 100)}...
          </p>
          <div className="flex justify-between items-center mb-3">
            <p className="text-indigo-600 font-bold">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-sm text-gray-600">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Link
            to={`/product/${product.id}`}
            className="bg-indigo-500 text-white text-sm px-3 py-1 rounded transition duration-300 hover:bg-indigo-600 w-full sm:w-auto text-center"
          >
            View Details
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="bg-green-500 text-white text-sm px-3 py-1 rounded transition duration-300 hover:bg-green-600 w-full sm:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Pagination({ currentPage, totalProducts, productsPerPage, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-8 flex justify-center flex-wrap">
      {pageNumbers.map((number) => (
        <motion.button
          key={number}
          onClick={() => paginate(number)}
          className={`mx-1 my-1 px-3 py-1 rounded ${
            currentPage === number
              ? "bg-indigo-500 text-white"
              : "bg-indigo-100 text-indigo-700"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {number}
        </motion.button>
      ))}
    </nav>
  );
}

function CartButton({ cart, setIsCartOpen }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-10"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={() => setIsCartOpen(true)}
        className="bg-indigo-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-600 transition duration-300 flex items-center"
      >
        <FaShoppingCart className="mr-2" />
        <span>{totalItems}</span>
      </button>
    </motion.div>
  );
}

function CartModal({ cart, removeFromCart, setIsCartOpen, clearCart, updateQuantity }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm overflow-y-auto h-full w-full z-50"
      onClick={() => setIsCartOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: -20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative top-20 mx-auto p-6 border w-11/12 max-w-xl shadow-2xl rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Your Shopping Cart</h3>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-gray-500 transition-colors"
            aria-label="Close cart"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-2">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center text-sm border-b pb-4"
                >
                  <div className="flex items-center flex-1 mr-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-base">{item.title}</p>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="text-gray-500 hover:text-gray-700"
                          aria-label="Decrease quantity"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="mx-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-gray-700"
                          aria-label="Increase quantity"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex justify-between items-center text-xl font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-8 space-y-3">
          <Link
            to="/cart"
            className="block px-6 py-3 bg-indigo-600 text-white text-base font-medium rounded-md w-full text-center transition duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go to Cart
          </Link>
          <div className="flex space-x-3">
            <button
              onClick={clearCart}
              className="flex-1 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md transition duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Clear Cart
            </button>
            <button
              onClick={() => setIsCartOpen(false)}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md transition duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AddToCartNotification() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
    >
      Item added to cart!
    </motion.div>
  );
}

ProductControls.propTypes = {
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  filterPrice: PropTypes.string.isRequired,
  setFilterPrice: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  viewMode: PropTypes.string.isRequired,
  setViewMode: PropTypes.func.isRequired,
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  viewMode: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

ProductListItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalProducts: PropTypes.number.isRequired,
  productsPerPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

CartButton.propTypes = {
  cart: PropTypes.array.isRequired,
  setIsCartOpen: PropTypes.func.isRequired,
};

CartModal.propTypes = {
  cart: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  setIsCartOpen: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default ProductListPage;