'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/cart-store';
import CartDrawer from '@/components/CartDrawer';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCartStore();
  const itemCount = totalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Collections', 'Catalogue', 'About', 'Contact'];

  const navVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="group cursor-pointer">
              <div className="text-center">
                <p
                  className="font-script italic text-xl tracking-widest hover:opacity-70 transition"
                  style={{ color: isScrolled ? '#000000' : '#ffffff' }}
                >
                  her
                </p>
                <p
                  className="text-xs tracking-widest"
                  style={{ color: isScrolled ? '#574944' : '#ffffff' }}
                >
                  EST. 2030
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-12">
              {navItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={item === 'Catalogue' ? '/catalogue' : '#'}
                  custom={i}
                  variants={navVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-sm tracking-wide hover:opacity-60 transition"
                  style={{ color: isScrolled ? '#000000' : '#ffffff' }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-6">
              <button className="hover:opacity-60 transition">
                <Search
                  size={20}
                  style={{ color: isScrolled ? '#000000' : '#ffffff' }}
                />
              </button>
              <div className="relative">
                <button onClick={toggleCart} className="hover:opacity-60 transition">
                  <ShoppingBag
                    size={20}
                    style={{ color: isScrolled ? '#000000' : '#ffffff' }}
                  />
                </button>
                {itemCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: '#7a0000' }}
                  >
                    {itemCount}
                  </span>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X
                    size={24}
                    style={{ color: isScrolled ? '#000000' : '#ffffff' }}
                  />
                ) : (
                  <Menu
                    size={24}
                    style={{ color: isScrolled ? '#000000' : '#ffffff' }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black z-40 pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col gap-8 p-6">
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={item === 'Catalogue' ? '/catalogue' : '#'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-white text-2xl font-script italic hover:opacity-60 transition"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}

      <CartDrawer />
    </>
  );
}
