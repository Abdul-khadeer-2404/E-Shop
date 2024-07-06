import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

function useScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isVisible;
}

function SkeletonLoader() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="border rounded-lg overflow-hidden shadow-md bg-white p-4"
        >
          <div className="w-full h-24 lg:h-48 bg-gray-300 animate-pulse mb-4"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse w-2/3"></div>
        </div>
      ))}
    </div>
  );
}


function FeaturedProducts({ products, isLoading }) {
  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          className="border rounded-lg overflow-hidden shadow-md bg-white"
        >
          <motion.div
            className="w-full pb-[75%] relative"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="absolute top-0 left-0 w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <div className="p-2 sm:p-4">
            <motion.h3
              className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2 truncate text-indigo-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {product.name}
            </motion.h3>
            <motion.p
              className="text-indigo-600 text-xs mb-2 sm:mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              ${product.price.toFixed(2)}
            </motion.p>
            <motion.div
              className="flex flex-col space-y-1 sm:space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <Link
                to={`/product/${product.id}`}
                className="bg-indigo-500 text-white text-xs px-2 sm:px-3 py-1 rounded transition duration-300 hover:bg-indigo-600 text-center"
              >
                View Details
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isVisible = useScrollToTop();

  const heroSlides = useMemo(
    () => [
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
    ],
    []
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        const limitedProducts = json.slice(0, 8).map((product) => ({
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.image,
        }));
        setFeaturedProducts(limitedProducts);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-indigo-50">
      <Helmet>
        <title>E-Shop - Your One-Stop Online Store</title>
        <meta
          name="description"
          content="Discover amazing products at great prices on E-Shop. Shop our latest collections and trending styles."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="hero relative overflow-hidden bg-indigo-600 text-white text-center h-64 sm:h-80 md:h-96 flex items-center justify-center">
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
            <div className="bg-black bg-opacity-50 p-4 sm:p-6 md:p-8 rounded-lg">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
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
                  className="bg-white text-indigo-600 px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 rounded-lg text-sm sm:text-base md:text-lg font-bold transition-colors duration-300 hover:bg-indigo-100"
                >
                  Shop Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Featured Products Section */}
      <section className="featured-products container mx-auto px-4 py-8 sm:py-12">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-4xl font-bold text-center mb-4 sm:mb-6 text-indigo-800"
        >
          Featured Products
        </motion.h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <FeaturedProducts products={featuredProducts} isLoading={isLoading} />
      </section>

      {/* Summer Sale Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="summer-sale flex flex-col align-center justify-center relative h-64 sm:h-80 md:h-96 overflow-hidden bg-indigo-600 text-white text-center py-8 sm:py-16 md:py-24 mb-8"
      >
        <div className="absolute inset-0 bg-pattern opacity-10"></div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative z-10 container mx-auto px-4"
        >
          <motion.h3
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6"
          >
            Summer Spectacular Sale
          </motion.h3>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 max-w-xl mx-auto"
          >
            Dive into savings with up to 50% off on selected summer essentials!
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link
              to="/products"
              className="inline-block bg-white text-indigo-600 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-lg sm:text-xl font-bold transition-all duration-300 hover:bg-indigo-100 hover:shadow-lg transform hover:-translate-y-1"
            >
              Explore Deals
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.2 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="absolute -bottom-16 -right-16 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-white rounded-full"
        ></motion.div>

        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.2 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="absolute -top-16 -left-16 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-purple-300 rounded-full"
        ></motion.div>
      </motion.section>

      {/* New Arrivals Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="new-arrivals flex flex-col align-center justify-center relative h-64 sm:h-80 md:h-96 overflow-hidden bg-gradient-to-r from-indigo-400 to-purple-500 text-white text-center py-8 sm:py-16 md:py-24 mb-8"
      >
        <div className="absolute inset-0 bg-pattern opacity-10"></div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative z-10 container mx-auto px-4"
        >
          <motion.h3
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6"
          >
            Discover New Arrivals
          </motion.h3>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 max-w-xl mx-auto"
          >
            Be the first to explore our latest collections and trending styles.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link
              to="/products"
              className="inline-block bg-white text-indigo-600 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-lg sm:text-xl font-bold transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg transform hover:-translate-y-1"
            >
              Shop New Arrivals
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ x: "100%" }}
          whileInView={{ x: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="absolute -bottom-16 -right-16 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-indigo-300 rounded-full opacity-30"
        ></motion.div>

        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="absolute -top-16 -left-16 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-purple-300 rounded-full opacity-30"
        ></motion.div>
      </motion.section>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none"
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6"
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
