'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Category {
  id: number;
  name: string;
  image: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?fit=crop&w=600&h=800',
  },
  {
    id: 2,
    name: 'Tops',
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?fit=crop&w=600&h=800',
  },
  {
    id: 3,
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?fit=crop&w=600&h=800',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function CategoryCards() {
  return (
    <section
      className="w-full py-24"
      style={{ backgroundColor: '#d2c8be' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script italic text-4xl md:text-5xl text-gray-900">
            Explore Categories
          </h2>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group relative h-80 md:h-96 overflow-hidden cursor-pointer"
            >
              {/* Category Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Dark Overlay */}
              <motion.div
                initial={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <h3 className="font-script italic text-3xl md:text-4xl text-white">
                  {category.name}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
