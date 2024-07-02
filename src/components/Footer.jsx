import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-indigo-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="flex flex-col mb-6 md:mb-0">
            <div className="flex space-x-4 mb-4">
              {[
                { icon: faFacebook, url: 'https://facebook.com' },
                { icon: faTwitter, url: 'https://twitter.com' },
                { icon: faInstagram, url: 'https://instagram.com' },
                { icon: faLinkedin, url: 'https://linkedin.com' },
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 text-white border border-indigo-400 rounded-xl hover:bg-indigo-700 transition duration-300"
                  aria-label={`Visit our ${social.icon.iconName} page`}
                >
                  <FontAwesomeIcon icon={social.icon} size="lg" />
                </a>
              ))}
            </div>
            <div>
              <h5 className="font-bold text-indigo-300 mb-2">Contact Us</h5>
              <p className="text-indigo-100">Email: support@eshop.com</p>
              <p className="text-indigo-100">Phone: (123) 456-7890</p>
              <p className="text-indigo-100">Address: 123 E-Shop St, Commerce City, CO 80022</p>
            </div>
          </div>
          <div className="text-left md:text-left">
            <h5 className="font-bold text-indigo-300 mb-2">Useful Links</h5>
            {[
              { text: 'Terms of Service', url: '/terms' },
              { text: 'Privacy Policy', url: '/privacy' },
              { text: 'Contact Us', url: '/contact' },
              { text: 'FAQ', url: '/faq' },
            ].map((link, index) => (
              <p key={index}>
                <a 
                  href={link.url} 
                  className="text-indigo-100 hover:text-white transition duration-300"
                >
                  {link.text}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-indigo-200">&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;