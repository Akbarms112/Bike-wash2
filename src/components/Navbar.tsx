import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-800">BikeWash</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                Services
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {isServiceDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link
                    to="/services/pickup"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Pickup Only
                  </Link>
                  <Link
                    to="/services/drop"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Drop Only
                  </Link>
                  <Link
                    to="/services/pickup-drop"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Pickup & Drop
                  </Link>
                </div>
              )}
            </div>
            
            <Link to="/gallery" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Gallery
            </Link>
            
            <Link to="/contact" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  Book Service
                </Link>
                {user?.isAdmin && (
                  <Link to="/admin-dashboard" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white hover:bg-gray-50 text-blue-500 border border-blue-500 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Home
            </Link>
            
            {/* Mobile Services Menu */}
            <div className="space-y-1">
              <button
                onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                className="flex items-center w-full text-left text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
              >
                Services
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {isServiceDropdownOpen && (
                <div className="pl-4 space-y-1">
                  <Link
                    to="/services/pickup"
                    className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
                    onClick={toggleMenu}
                  >
                    Pickup Only
                  </Link>
                  <Link
                    to="/services/drop"
                    className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
                    onClick={toggleMenu}
                  >
                    Drop Only
                  </Link>
                  <Link
                    to="/services/pickup-drop"
                    className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
                    onClick={toggleMenu}
                  >
                    Pickup & Drop
                  </Link>
                </div>
              )}
            </div>
            
            <Link
              to="/gallery"
              className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Gallery
            </Link>
            
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                >
                  Book Service
                </Link>
                {user?.isAdmin && (
                  <Link
                    to="/admin-dashboard"
                    className="block text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
                    onClick={toggleMenu}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full text-left block bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-1">
                <Link
                  to="/login"
                  className="block bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block bg-white hover:bg-gray-50 text-blue-500 border border-blue-500 px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;