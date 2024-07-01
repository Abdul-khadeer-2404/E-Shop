import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-indigo-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start">
        <div className="flex flex-col mb-4 md:mb-0">
          <div className="flex space-x-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 text-white border border-indigo-400 rounded-xl hover:bg-indigo-700 transition duration-300">
              <FontAwesomeIcon icon={faFacebook} size="xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 text-white border border-indigo-400 rounded-xl hover:bg-indigo-700 transition duration-300">
              <FontAwesomeIcon icon={faTwitter} size="xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 text-white border border-indigo-400 rounded-xl hover:bg-indigo-700 transition duration-300">
              <FontAwesomeIcon icon={faInstagram} size="xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 text-white border border-indigo-400 rounded-xl hover:bg-indigo-700 transition duration-300">
              <FontAwesomeIcon icon={faLinkedin} size="xl" />
            </a>
          </div>
          <div>
            <h5 className="font-bold text-indigo-300">Contact Us</h5>
            <p className="text-indigo-100">Email: support@eshop.com</p>
            <p className="text-indigo-100">Phone: (123) 456-7890</p>
            <p className="text-indigo-100">Address: 123 E-Shop St, Commerce City, CO 80022</p>
          </div>
        </div>
        <div className="text-left md:text-left">
          <div className="mb-4">
            <h5 className="font-bold text-indigo-300">Useful Links</h5>
            <p><a href="/terms" className="text-indigo-100 hover:text-white transition duration-300">Terms of Service</a></p>
            <p><a href="/privacy" className="text-indigo-100 hover:text-white transition duration-300">Privacy Policy</a></p>
            <p><a href="/contact" className="text-indigo-100 hover:text-white transition duration-300">Contact Us</a></p>
            <p><a href="/faq" className="text-indigo-100 hover:text-white transition duration-300">FAQ</a></p>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-indigo-200">&copy; 2024 E-Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;