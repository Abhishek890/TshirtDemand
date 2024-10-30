import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, TrendingUp, Users, Zap, Package, Clock } from 'lucide-react';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-[#fdf6e3]">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-[#eee8d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Printer className="w-8 h-8 text-[#dc322f]" />
              <span className="text-xl font-bold text-[#073642]">PrintOnDemand</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-[#073642] hover:text-[#dc322f] transition-colors">
                Login
              </Link>
              <Link
                to="/login"
                className="bg-[#dc322f] text-white px-6 py-2 rounded-lg hover:bg-[#cb4b16] transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-5xl font-bold text-[#073642] mb-6 leading-tight">
                Transform Your Ideas into
                <span className="text-[#dc322f]"> Premium Prints</span>
              </h1>
              <p className="text-xl text-[#657b83] mb-8">
                Professional print-on-demand service for your business. 
                High-quality prints, fast delivery, and exceptional customer service.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="bg-[#dc322f] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#cb4b16] transition-colors"
                >
                  Start Printing
                </Link>
                <Link
                  to="/pricing"
                  className="bg-[#eee8d5] text-[#073642] px-8 py-4 rounded-lg font-semibold hover:bg-[#93a1a1] hover:text-white transition-colors"
                >
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1588534510807-86dfb5ed5d5b?auto=format&fit=crop&q=80"
                alt="Print on demand service"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#eee8d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#073642] mb-4">Why Choose Us?</h2>
            <p className="text-[#657b83] max-w-2xl mx-auto">
              We provide end-to-end solutions for your print-on-demand needs with cutting-edge technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-12 h-12 text-[#dc322f]" />,
                title: "Quick Turnaround",
                description: "Get your prints delivered within 2-3 business days"
              },
              {
                icon: <Package className="w-12 h-12 text-[#dc322f]" />,
                title: "Premium Quality",
                description: "High-quality materials and state-of-the-art printing"
              },
              {
                icon: <Users className="w-12 h-12 text-[#dc322f]" />,
                title: "Expert Support",
                description: "Dedicated support team to help you every step"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#073642] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#657b83]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#dc322f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Printing?
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience premium printing services.
          </p>
          <Link
            to="/login"
            className="bg-white text-[#dc322f] px-8 py-4 rounded-lg font-semibold hover:bg-[#eee8d5] transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#073642] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Printer className="w-8 h-8 text-[#dc322f]" />
                <span className="text-xl font-bold">PrintOnDemand</span>
              </div>
              <p className="text-[#93a1a1]">
                Premium printing services for your business needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-[#93a1a1]">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/services" className="hover:text-white">Services</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-[#93a1a1]">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/refund" className="hover:text-white">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-[#93a1a1]">
                <li>support@printondemand.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Print Street, Design City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#586e75] mt-8 pt-8 text-center text-[#93a1a1]">
            <p>&copy; 2024 PrintOnDemand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;