import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const location = useLocation();
  const showSearchBar = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <header className="bg-indigo-600 text-white shadow-md transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center w-full sm:w-auto justify-between">
            <Link to="/" className="text-xl sm:text-2xl font-bold transition duration-300 ease-in-out hover:text-indigo-200">E-Shop</Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`sm:hidden text-white focus:outline-none transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-90' : ''}`} 
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
          
          {showSearchBar && (
            <form onSubmit={handleSearch} className="w-full sm:w-1/3 sm:mx-4 mt-3 sm:mt-0 order-3 sm:order-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-indigo-500 text-white rounded-full px-4 py-2 pl-10 focus:outline-none w-full transition duration-300 ease-in-out focus:ring-2 focus:ring-indigo-300 placeholder-indigo-200 text-sm"
                  placeholder="Search..."
                  aria-label="Search"
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-200" aria-label="Submit search">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </form>
          )}

          <nav className={`sm:flex items-center w-full sm:w-auto mt-3 sm:mt-0 order-2 sm:order-3 ${isSmallScreen ? 'overflow-hidden transition-all duration-500 ease-in-out' : ''} ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 sm:max-h-full opacity-0 sm:opacity-100'}`}>
            <ul className={`flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 ${isSmallScreen ? 'transform transition-transform duration-500 ease-in-out' : ''} ${isMenuOpen ? 'translate-y-0' : '-translate-y-full sm:translate-y-0'}`}>
              {navItems.map((item, index) => (
                <li key={item.name} className={`${isSmallScreen ? 'transition-all duration-300 ease-in-out' : ''}`} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Link
                    to={item.path}
                    className="block py-1 transition duration-300 ease-in-out hover:text-indigo-200 group flex items-center relative nav-link"
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