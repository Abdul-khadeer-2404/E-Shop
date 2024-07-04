import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: faFacebook, url: 'https://facebook.com', name: 'Facebook' },
    { icon: faTwitter, url: 'https://twitter.com', name: 'Twitter' },
    { icon: faInstagram, url: 'https://instagram.com', name: 'Instagram' },
    { icon: faLinkedin, url: 'https://linkedin.com', name: 'LinkedIn' },
  ];

  const usefulLinks = [
    { text: 'Terms of Service', url: '/terms' },
    { text: 'Privacy Policy', url: '/privacy' },
    { text: 'Contact Us', url: '/contact' },
    { text: 'FAQ', url: '/faq' },
  ];

  return (
    <footer className="bg-gradient-to-r from-indigo-800 to-indigo-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-indigo-300">E-Shop</h4>
            <p className="text-indigo-100 max-w-xs">Your one-stop shop for all your e-commerce needs. Quality products, great prices, and excellent customer service.</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white bg-indigo-700 rounded-full hover:bg-indigo-600 transition duration-300"
                  aria-label={`Visit our ${social.name} page`}
                >
                  <FontAwesomeIcon icon={social.icon} size="lg" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-xl font-bold text-indigo-300 mb-4">Useful Links</h5>
            <ul className="space-y-2">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-indigo-100 hover:text-white transition duration-300"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xl font-bold text-indigo-300 mb-4">Contact Us</h5>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-indigo-400" />
                <a href="mailto:support@eshop.com" className="text-indigo-100 hover:text-white transition duration-300">support@eshop.com</a>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-2 text-indigo-400" />
                <span className="text-indigo-100">(123) 456-7890</span>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 mt-1 text-indigo-400" />
                <span className="text-indigo-100">123 E-Shop St, Commerce City, CO 80022</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center">
        <p className="text-indigo-200">&copy; {currentYear} E-Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
