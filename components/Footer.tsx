'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');

  const footerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const columnVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="w-full bg-black text-white">
      {/* Divider */}
      <div
        className="w-full h-px"
        style={{ backgroundColor: '#7a0000' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-script italic text-3xl">her</p>
          <p className="text-xs tracking-widest text-gray-400 mt-1">
            EST. 2030
          </p>
        </motion.div>

        {/* Three Columns */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Navigation */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display text-lg mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Catalogue
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display text-lg mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a
                  href="mailto:hello@her.com"
                  className="hover:text-white transition"
                >
                  hello@her.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-white transition">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="pt-2">
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  NYC Studio
                </p>
                <p className="text-sm">New York, NY 10001</p>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display text-lg mb-6">Newsletter</h4>
            <p className="text-sm text-gray-300 mb-4">
              Receive curated selections & exclusive updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-gray-800 text-white text-sm px-4 py-2 focus:outline-none"
              />
              <button
                className="px-4 py-2 hover:opacity-70 transition"
                style={{ backgroundColor: '#7a0000' }}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-800 pt-8 text-center"
        >
          <p className="text-xs text-gray-400 tracking-widest">
            Copyright 2030 HER – For All Women. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
