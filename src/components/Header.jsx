import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const showSearchBar = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const handleResize = useCallback(() => {
    setIsSmallScreen(window.innerWidth < 768);
    if (window.innerWidth >= 768) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Cart', path: '/cart', icon: faShoppingCart },
    { name: 'Login/Signup', path: '/login'},
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center w-full md:w-auto justify-between">
            <Link to="/" className="text-2xl md:text-3xl font-bold transition duration-300 ease-in-out hover:text-indigo-200">
              E-Shop
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`md:hidden text-white focus:outline-none transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-90' : ''}`} 
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
          
          {showSearchBar && (
            <form onSubmit={handleSearch} className="w-full md:w-1/3 md:mx-4 mt-3 md:mt-0 order-3 md:order-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-indigo-500 text-white rounded-full px-4 py-2 pl-10 focus:outline-none w-full transition duration-300 ease-in-out focus:ring-2 focus:ring-indigo-300 placeholder-indigo-200 text-sm"
                  placeholder="Search products..."
                  aria-label="Search"
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-200 hover:text-white transition duration-300" aria-label="Submit search">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </form>
          )}

          <nav className={`md:flex items-center w-full md:w-auto mt-3 md:mt-0 order-2 md:order-3 ${isSmallScreen ? 'overflow-hidden transition-all duration-500 ease-in-out' : ''} ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 md:max-h-full opacity-0 md:opacity-100'}`}>
            <ul className={`flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 ${isSmallScreen ? 'transform transition-transform duration-500 ease-in-out' : ''} ${isMenuOpen ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}`}>
              {navItems.map((item, index) => (
                <li key={item.name} className={`${isSmallScreen ? 'transition-all duration-300 ease-in-out' : ''}`} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Link
                    to={item.path}
                    className="block py-1 transition duration-300 ease-in-out hover:text-indigo-200 group flex items-center relative nav-link text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <FontAwesomeIcon icon={item.icon} className="mr-2" />}
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-200 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;