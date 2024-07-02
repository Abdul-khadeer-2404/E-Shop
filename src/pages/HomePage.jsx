import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Noise-Cancelling Headphones",
      price: 249.99,
      image: "https://picsum.photos/seed/headphones/300/300",
    },
    {
      id: 2,
      name: "4K Ultra HD Smart TV - 55\"",
      price: 699.99,
      image: "https://picsum.photos/seed/tv/300/300",
    },
    {
      id: 3,
      name: "Ergonomic Office Chair",
      price: 199.99,
      image: "https://picsum.photos/seed/chair/300/300",
    },
    {
      id: 4,
      name: "Smartphone - Latest Model",
      price: 799.99,
      image: "https://picsum.photos/seed/smartphone/300/300",
    },
    {
      id: 5,
      name: "Stainless Steel Kitchen Appliance Set",
      price: 1299.99,
      image: "https://picsum.photos/seed/kitchenset/300/300",
    },
    {
      id: 6,
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      image: "https://picsum.photos/seed/speaker/300/300",
    },
    {
      id: 7,
      name: "Fitness Tracker Watch",
      price: 129.99,
      image: "https://picsum.photos/seed/fitnesstracker/300/300",
    },
    {
      id: 8,
      name: "Digital SLR Camera",
      price: 649.99,
      image: "https://picsum.photos/seed/camera/300/300",
    },
  ];

  const heroSlides = [
    {
      title: "Welcome to E-Shop",
      subtitle: "Discover amazing products at great prices!",
      image: "https://picsum.photos/seed/hero1/1920/1080",
    },
    {
      title: "Summer Collection",
      subtitle: "Get ready for the season with our latest arrivals!",
      image: "https://picsum.photos/seed/hero2/1920/1080",
    },
    {
      title: "Tech Gadgets",
      subtitle: "Explore cutting-edge technology at unbeatable prices!",
      image: "https://picsum.photos/seed/hero3/1920/1080",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-indigo-50">
      {/* Hero Section */}
      <section className="hero relative overflow-hidden bg-indigo-600 text-white text-center h-96 flex items-center justify-center">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-black bg-opacity-50 p-8 rounded-lg">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 lg:mb-6"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto"
              >
                {slide.subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link
                  to="/products"
                  className="bg-white text-indigo-600 px-5 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg text-base md:text-lg lg:text-xl font-bold transition-colors duration-300 hover:bg-indigo-100"
                >
                  Shop Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Featured Products Section */}
      <section className="featured-products container mx-auto px-4 py-12 mb-8">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-center mb-6 text-indigo-800"
        >
          Featured Products
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="border border-indigo-200 rounded-lg overflow-hidden shadow-md bg-white"
            >
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-1 truncate text-indigo-800">
                  {product.name}
                </h3>
                <p className="text-indigo-600 text-sm mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <Link
                  to={`/product/${product.id}`}
                  className="bg-indigo-500 text-white text-xs px-3 py-1 rounded transition duration-300 hover:bg-indigo-600"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Summer Sale Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="summer-sale relative lg:h-96 sm:h-80 overflow-hidden bg-indigo-500 text-white text-center py-16 md:py-24 lg:py-32 mb-8"
      >
        <div className="relative z-10 container mx-auto px-4">
          <motion.h3
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 lg:mb-6"
          >
            Summer Sale
          </motion.h3>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto"
          >
            Get up to 50% off on selected items!
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/products"
              className="bg-white text-indigo-500 px-5 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg text-base md:text-lg lg:text-xl font-bold transition-colors duration-300 hover:bg-indigo-100"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-indigo-600 transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
      </motion.section>

      {/* New Arrivals Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="new-arrivals lg:h-96 sm:h-80 relative overflow-hidden bg-indigo-400 text-white text-center py-16 md:py-24 lg:py-32 mb-8"
      >
        <div className="relative z-10 container mx-auto px-4">
          <motion.h3
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 lg:mb-6"
          >
            New Arrivals
          </motion.h3>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto"
          >
            Check out the latest additions to our store.
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/products"
              className="bg-white text-indigo-400 px-5 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg text-base md:text-lg lg:text-xl font-bold transition-colors duration-300 hover:bg-indigo-100"
            >
              Explore Now
            </Link>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-indigo-500 transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
      </motion.section>
      
      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </div>
  );
}

export default HomePage;
