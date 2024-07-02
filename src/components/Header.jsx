import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const location = useLocation();
  const showSearchBar = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Cart', path: '/cart', icon: faShoppingCart },
    { name: 'Login', path: '/login' },
    { name: 'Signup', path: '/signup' },
  ];

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex justify-between items-center w-full lg:w-auto mb-4 lg:mb-0">
            <Link to="/" className="text-2xl font-bold transition duration-300 ease-in-out hover:text-indigo-200">E-Shop</Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white focus:outline-none" aria-label="Toggle menu">
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
          {showSearchBar && (
            <form onSubmit={handleSearch} className="w-full lg:w-96 lg:mx-auto mb-4 lg:mb-0">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-indigo-500 text-white rounded-full px-4 py-2 pl-10 focus:outline-none w-full transition duration-300 ease-in-out focus:ring-2 focus:ring-indigo-300 placeholder-indigo-200"
                  placeholder="Search..."
                  aria-label="Search"
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-200" aria-label="Submit search">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </form>
          )}
          <nav className="hidden lg:flex items-center">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="relative py-2 transition duration-300 ease-in-out hover:text-indigo-200 group flex items-center"
                  >
                    {item.icon && <FontAwesomeIcon icon={item.icon} className="mr-2" />}
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-300 transform scale-x-0 transition-transform duration-300 ease-in-out origin-left group-hover:scale-x-100"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="lg:hidden px-4 pt-2 pb-4 space-y-2 bg-indigo-700">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block py-2 text-white hover:bg-indigo-600 rounded transition duration-300 ease-in-out flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon && <FontAwesomeIcon icon={item.icon} className="mr-2" />}
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;