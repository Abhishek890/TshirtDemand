import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Printer } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Printer className="w-8 h-8 text-[#e2ff3d]" />
              <span className="text-xl font-bold">PrintOnDemand</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              226 Devshree garden commercial complex<br />
              near rutu tower 400601
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Office Hours: 10 AM to 7 PM (Mon to Sat)
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#e2ff3d] transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#e2ff3d] transition-colors"
              >
                <Youtube size={24} />
              </a>
            </div>
            <Link
              to="/designer"
              className="inline-block mt-4 bg-[#e2ff3d] text-black px-6 py-2 rounded-full font-semibold hover:bg-[#c8e235] transition-colors"
            >
              Start Designing
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;