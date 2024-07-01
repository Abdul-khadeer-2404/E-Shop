import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const sampleProducts = [
  {
    id: 1,
    name: "Sample Product 1",
    price: 29.99,
    image: "https://picsum.photos/300/225?random=1",
  },
  {
    id: 2,
    name: "Sample Product 2",
    price: 49.99,
    image: "https://picsum.photos/300/225?random=2",
  },
  {
    id: 3,
    name: "Sample Product 3",
    price: 19.99,
    image: "https://picsum.photos/300/225?random=3",
  },
  {
    id: 4,
    name: "Sample Product 4",
    price: 99.99,
    image: "https://picsum.photos/300/225?random=4",
  },
  {
    id: 5,
    name: "Sample Product 5",
    price: 29.99,
    image: "https://picsum.photos/300/225?random=5",
  },
  {
    id: 6,
    name: "Sample Product 6",
    price: 49.99,
    image: "https://picsum.photos/300/225?random=6",
  },
  {
    id: 7,
    name: "Sample Product 7",
    price: 19.99,
    image: "https://picsum.photos/300/225?random=7",
  },
  {
    id: 8,
    name: "Sample Product 8",
    price: 99.99,
    image: "https://picsum.photos/300/225?random=8",
  },
  {
    id: 9,
    name: "Sample Product 9",
    price: 29.99,
    image: "https://picsum.photos/300/225?random=9",
  },
  {
    id: 10,
    name: "Sample Product 10",
    price: 49.99,
    image: "https://picsum.photos/300/225?random=10",
  },
  {
    id: 11,
    name: "Sample Product 11",
    price: 19.99,
    image: "https://picsum.photos/300/225?random=11",
  },
  {
    id: 12,
    name: "Sample Product 12",
    price: 99.99,
    image: "https://picsum.photos/300/225?random=12",
  },
  {
    id: 13,
    name: "Sample Product 13",
    price: 29.99,
    image: "https://picsum.photos/300/225?random=13",
  },
  {
    id: 14,
    name: "Sample Product 14",
    price: 49.99,
    image: "https://picsum.photos/300/225?random=14",
  },
  {
    id: 15,
    name: "Sample Product 15",
    price: 19.99,
    image: "https://picsum.photos/300/225?random=15",
  },
  {
    id: 16,
    name: "Sample Product 16",
    price: 99.99,
    image: "https://picsum.photos/300/225?random=16",
  },
];

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProducts(sampleProducts);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
      setLoading(false);
    }
  };

  const sortedAndFilteredProducts = products
    .filter(
      (product) =>
        (filterPrice === "" || product.price <= parseFloat(filterPrice)) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      return 0;
    });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedAndFilteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  if (loading)
    return <div className="text-center py-8">Loading products...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">
        Our Products
      </h1>

      <div className="mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="name">Name</option>
              <option value="price_asc">Price (Low to High)</option>
              <option value="price_desc">Price (High to Low)</option>
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="filter" className="mr-2 whitespace-nowrap">
              Max Price:
            </label>
            <input
              type="number"
              id="filter"
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className="border rounded px-2 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-2 py-1 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded ${
                viewMode === "grid" ? "bg-indigo-500 text-white" : "bg-gray-200"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 rounded ${
                viewMode === "list" ? "bg-indigo-500 text-white" : "bg-gray-200"
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 bg-white"
            >
              <div className="w-full pb-[75%] relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm md:text-base mb-2 truncate text-indigo-800">
                  {product.name}
                </h3>
                <p className="text-indigo-600 text-xs md:text-sm mb-3">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-indigo-500 text-white text-xs md:text-sm px-3 py-1 rounded transition duration-300 hover:bg-indigo-600 w-full sm:w-auto text-center"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-500 text-white text-xs md:text-sm px-3 py-1 rounded transition duration-300 hover:bg-green-600 w-full sm:w-auto"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row border rounded-lg overflow-hidden shadow-md bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full sm:w-64 h-48 sm:h-auto object-cover aspect-[4/3]"
              />
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-indigo-800">
                    {product.name}
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
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center flex-wrap">
        {Array.from(
          {
            length: Math.ceil(
              sortedAndFilteredProducts.length / productsPerPage
            ),
          },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 my-1 px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-500 text-white"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      <div className="fixed bottom-4 right-4 z-10">
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="bg-indigo-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-600 transition duration-300"
        >
          Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      </div>

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Shopping Cart
              </h3>
              <div className="mt-2 px-7 py-3">
                {cart.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <ul className="space-y-2">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {item.name} - ${item.price.toFixed(2)} x{" "}
                          {item.quantity}
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
                  Total: $
                  {cart
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}
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
      )}
    </div>
  );
}

export default ProductListPage;
