import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Header = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const navItems = [
    { name: 'Início', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-sm py-3 shadow-lg' : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-serif font-bold"
          >
            <img  
              alt="Logo Guilherme Medeiros Acessoria em Agronegocio"
              src="https://i.ibb.co/GfLXTmxB/New-Project-50.png"
              className="h-10 md:h-14 w-auto"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                'font-medium transition-colors duration-300',
                isActive 
                  ? 'text-rural-green' 
                  : 'text-rural-darkgreen hover:text-rural-green'
              )}
            >
              {item.name}
            </NavLink>
          ))}
          <button 
            onClick={toggleSearch}
            className="p-2 rounded-full transition-colors duration-300 text-rural-darkgreen hover:bg-rural-beige/50"
          >
            <Search size={20} />
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={toggleSearch}
            className="p-2 rounded-full mr-2 transition-colors duration-300 text-rural-darkgreen hover:bg-rural-beige/50"
          >
            <Search size={20} />
          </button>
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-full transition-colors duration-300 text-rural-darkgreen hover:bg-rural-beige/50"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-rural-darkbeige/10"
          >
            <div className="container-custom py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => cn(
                      'py-2 px-4 rounded-xl font-medium transition-colors duration-300',
                      isActive 
                        ? 'bg-rural-beige text-rural-darkgreen' 
                        : 'text-rural-darkgreen hover:bg-rural-beige'
                    )}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-rural-darkgreen/95 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar no blog..."
                  className="w-full bg-white text-rural-darkgreen rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-rural-green"
                  autoFocus
                />
                <button
                  onClick={toggleSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-rural-darkgreen hover:text-rural-green transition-colors duration-300"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mt-4 text-white text-center">
                Pressione o "X" para fechar
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
