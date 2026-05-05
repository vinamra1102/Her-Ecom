'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function EditorialBanner() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full py-24 md:py-32 text-center"
      style={{ backgroundColor: '#7a0000' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quote */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-script italic text-4xl md:text-5xl text-white mb-6"
        >
          Timeless. Refined. Hers.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white text-sm md:text-base tracking-wide mb-8 opacity-90"
        >
          Curated for the woman of quiet luxury
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border-2 border-white text-white px-8 py-3 tracking-wider text-sm hover:bg-white hover:text-gray-900 transition-all duration-300"
        >
          SHOP NOW
        </motion.button>
      </div>
    </motion.section>
  );
}
