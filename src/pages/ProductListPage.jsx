import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

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
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
      console.log(data); // This logs the fetched data to the console
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
        return 0;
      });
  }, [products, filterPrice, searchTerm, sortBy]);

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return sortedAndFilteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [currentPage, sortedAndFilteredProducts]);

  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

  const addToCart = useCallback((product) => {
    setCart(prevCart => {
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
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter((item) => item.id !== productId));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-800">
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

      {isCartOpen && (
        <CartModal
          cart={cart}
          removeFromCart={removeFromCart}
          setIsCartOpen={setIsCartOpen}
        />
      )}
    </div>
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
    <div className="text-center py-8 text-red-500" role="alert">
      {message}
    </div>
  );
}

function ProductControls({ sortBy, setSortBy, filterPrice, setFilterPrice, searchTerm, setSearchTerm, viewMode, setViewMode }) {
  const debouncedSetSearchTerm = debounce(setSearchTerm, 300);

  return (
    <div className="mb-6 flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center w-full sm:w-auto">
          <label htmlFor="sort" className="mr-2 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-2 py-1 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="title">Name</option>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
          </select>
        </div>
        <div className="flex items-center w-full sm:w-auto">
          <label htmlFor="filter" className="mr-2 whitespace-nowrap">
            Max Price:
          </label>
          <input
            type="number"
            id="filter"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="border rounded px-2 py-1 w-full sm:w-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => debouncedSetSearchTerm(e.target.value)}
          className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${
              viewMode === "grid" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${
              viewMode === "list" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductList({ products, viewMode, addToCart }) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    );
  }
}

function ProductCard({ product, addToCart }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 bg-white">
      <div className="w-full pb-[75%] relative">
        <img
          src={product.image}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-2 sm:p-4">
        <h3 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2 truncate text-indigo-800">
          {product.title}
        </h3>
        <p className="text-indigo-600 text-xs mb-2 sm:mb-3">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex flex-col space-y-1 sm:space-y-2">
          <Link
            to={`/product/${product.id}`}
            className="bg-indigo-500 text-white text-xs px-2 sm:px-3 py-1 rounded transition duration-300 hover:bg-indigo-600 text-center"
          >
            View Details
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="bg-green-500 text-white text-xs px-2 sm:px-3 py-1 rounded transition duration-300 hover:bg-green-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductListItem({ product, addToCart }) {
  return (
    <div className="flex flex-col sm:flex-row border rounded-lg overflow-hidden shadow-md bg-white">
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
          <p className="text-indigo-600 text-sm mb-3">
            ${product.price.toFixed(2)}
          </p>
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
    </div>
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
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`mx-1 my-1 px-2 py-1 text-sm rounded ${
            currentPage === number
              ? "bg-indigo-500 text-white"
              : "bg-indigo-100 text-indigo-700"
          }`}
        >
          {number}
        </button>
      ))}
    </nav>
  );
}

function CartButton({ cart, setIsCartOpen }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <button
        onClick={() => setIsCartOpen(true)}
        className="bg-indigo-500 text-white px-3 py-2 text-sm rounded-full shadow-lg hover:bg-indigo-600 transition duration-300"
      >
        Cart ({totalItems})
      </button>
    </div>
  );
}

function CartModal({ cart, removeFromCart, setIsCartOpen }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="relative top-20 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Shopping Cart
          </h3>
          <div className="mt-2 px-2 sm:px-7 py-3">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul className="space-y-2">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="truncate mr-2">
                      {item.title} - ${item.price.toFixed(2)} x {item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white text-xs px-2 py-1 rounded transition duration-300 hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 font-bold">
              Total: ${total.toFixed(2)}
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <Link
              to="/cart"
              className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 block mb-2"
            >
              Go to Cart
            </Link>
            <button
              onClick={() => setIsCartOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
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
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

ProductListItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
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
};

export default ProductListPage;