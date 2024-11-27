import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Navbar = () => {
  const { cart, user } = useStore();
  
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
            ShopFuture
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
              Products
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
              
              <Link to={user ? "/profile" : "/login"}>
                <User className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};