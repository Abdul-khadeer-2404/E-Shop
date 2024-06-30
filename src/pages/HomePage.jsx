import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Featured Product 1",
      price: 39.99,
      image: "https://picsum.photos/150/150?random=1",
    },
    {
      id: 2,
      name: "Featured Product 2",
      price: 59.99,
      image: "https://picsum.photos/150/150?random=2",
    },
    {
      id: 3,
      name: "Featured Product 3",
      price: 29.99,
      image: "https://picsum.photos/150/150?random=3",
    },
    {
      id: 4,
      name: "Featured Product 1",
      price: 39.99,
      image: "https://picsum.photos/150/150?random=4",
    },
    {
      id: 5,
      name: "Featured Product 2",
      price: 59.99,
      image: "https://picsum.photos/150/150?random=5",
    },
    {
      id: 6,
      name: "Featured Product 3",
      price: 29.99,
      image: "https://picsum.photos/150/150?random=6",
    },
    {
      id: 7,
      name: "Featured Product 3",
      price: 29.99,
      image: "https://picsum.photos/150/150?random=7",
    },
    {
      id: 8,
      name: "Featured Product 3",
      price: 29.99,
      image: "https://picsum.photos/150/150?random=8",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero relative overflow-hidden bg-blue-600 text-white text-center py-16 md:py-24 lg:py-32 transition-all duration-300 ease-in-out group mb-8">
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 lg:mb-6">
            Welcome to E-Shop
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto">
            Discover amazing products at great prices!
          </p>
          <Link
            to="/products"
            className="bg-white text-blue-600 px-5 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg text-base md:text-lg lg:text-xl font-bold transition-colors duration-300 hover:bg-blue-100"
          >
            Shop Now
          </Link>
        </div>
        <div className="absolute inset-0 bg-purple-600 transform -skew-y-12 translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"></div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products container mx-auto px-4 py-12 mb-8">
        <h2 className="text-2xl font-bold text-center mb-6 animate-fade-in">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-lg mb-1 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <Link
                  to={`/product/${product.id}`}
                  className="bg-blue-500 text-white text-sm px-3 py-1 rounded transition duration-300 hover:bg-blue-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summer Sale Section */}
      <section className="summer-sale relative overflow-hidden bg-yellow-500 text-white text-center py-16 md:py-24 lg:py-32 transition-all duration-300 ease-in-out group mb-8">
        <div className="relative z-10 container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 lg:mb-6">
            Summer Sale
          </h3>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto">
            Get up to 50% off on selected items!
          </p>
          <Link
            to="/products"
            className="bg-white text-yellow-500 px-5 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg text-base md:text-lg lg:text-xl font-bold transition-colors duration-300 hover:bg-yellow-100"
          >
            Shop Now
          </Link>
        </div>
        <div className="absolute inset-0 bg-orange-500 transform -skew-y-12 translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"></div>
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals relative overflow-hidden bg-green-500 text-white text-center py-16 md:py-24 lg:py-32 transition-all duration-300 ease-in-out group mb-8">
        <div className="relative z-10 container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 lg:mb-6">
            New Arrivals
          </h3>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto">
            Check out the latest additions to our store.
          </p>
          <Link
            to="/products"
            className="bg-white text-green-500 px-5 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg text-base md:text-lg lg:text-xl font-bold transition-colors duration-300 hover:bg-green-100"
          >
            Explore Now
          </Link>
        </div>
        <div className="absolute inset-0 bg-teal-500 transform -skew-y-12 translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"></div>
      </section>
    </div>
  );
}

export default HomePage;
