import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Laptop, Book, LayoutDashboard, Languages, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', name: 'Home', icon: <Languages className="w-5 h-5" /> },
    { to: '/courses', name: 'Courses', icon: <Book className="w-5 h-5" /> },
    { to: '/learn', name: 'Translator', icon: <Laptop className="w-5 h-5" /> },
  ];

  const authLinks = user
    ? [
        { to: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { 
          to: '#', 
          name: 'Logout', 
          icon: <LogOut className="w-5 h-5" />,
          onClick: () => {
            logout();
            window.location.href = '/';
          }
        },
      ]
    : [
        { to: '/login', name: 'Login' },
        { to: '/signup', name: 'Sign Up', highlight: true },
      ];

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Languages className="w-8 h-8 text-blue-700" />
            <span className="text-xl font-bold text-gray-800">SignVerse</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`px-3 py-2 rounded-md flex items-center space-x-1 ${
                  location.pathname === link.to
                    ? 'text-blue-700 font-semibold'
                    : 'text-gray-600 hover:text-blue-700'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            <div className="border-l border-gray-300 h-6 mx-2"></div>

            {authLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={link.onClick}
                className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-1 ${
                  link.highlight
                    ? 'bg-blue-700 text-white hover:bg-blue-800'
                    : location.pathname === link.to
                    ? 'text-blue-700 font-semibold'
                    : 'text-gray-600 hover:text-blue-700'
                }`}
              >
                {link.icon && link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={mobileMenuVariants}
        className={`md:hidden fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg pt-20 z-40`}
      >
        <div className="flex flex-col space-y-3 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`px-3 py-3 rounded-md flex items-center space-x-2 ${
                location.pathname === link.to
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}

          <div className="border-t border-gray-200 my-2 py-2"></div>

          {authLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={link.onClick}
              className={`px-3 py-3 rounded-md flex items-center space-x-2 ${
                link.highlight
                  ? 'bg-blue-700 text-white'
                  : location.pathname === link.to
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {link.icon && link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Backdrop for mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="md:hidden fixed inset-0 bg-black z-30"
          onClick={() => setIsOpen(false)}
        ></motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;