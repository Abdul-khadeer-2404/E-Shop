import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const location = useLocation();
  const showSearchBar = location.pathname === '/' || location.pathname === '/products';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex justify-between items-center w-full lg:w-auto mb-4 lg:mb-0">
            <Link to="/" className="text-2xl font-bold transition duration-300 ease-in-out hover:text-gray-300">E-Shop</Link>
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
              </button>
            </div>
          </div>
          {showSearchBar && (
            <div className="w-full lg:w-96 lg:mx-auto mb-4 lg:mb-0">
              <div className="relative">
                <input
                  type="text"
                  className="bg-gray-700 text-white rounded-full px-4 py-2 pl-10 focus:outline-none w-full transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-300"
                  placeholder="Search..."
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          )}
          <nav className="hidden lg:flex items-center">
            <ul className="flex space-x-4">
              {['Home', 'Products', 'Cart', 'Login', 'Signup'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="relative py-2 transition duration-300 ease-in-out hover:text-gray-300 group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 ease-in-out origin-left group-hover:scale-x-100"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            {['Home', 'Products', 'Cart', 'Login', 'Signup'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="block py-2 text-white hover:bg-gray-700 rounded transition duration-300 ease-in-out"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;