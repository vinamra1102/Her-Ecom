'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Silk Evening Gown',
    price: '$1,250',
    image: 'https://images.unsplash.com/photo-1566479179817-b7f7e8e64b6d?fit=crop&w=600&h=800',
  },
  {
    id: 2,
    name: 'Minimalist Blazer',
    price: '$695',
    image: 'https://images.unsplash.com/photo-1548549557-dbe9155986b1?fit=crop&w=600&h=800',
  },
  {
    id: 3,
    name: 'Tailored Trousers',
    price: '$420',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?fit=crop&w=600&h=800',
  },
  {
    id: 4,
    name: 'Cashmere Knit',
    price: '$550',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?fit=crop&w=600&h=800',
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

export default function NewArrivals() {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script italic text-4xl md:text-5xl text-gray-900 mb-2">
            New Arrivals
          </h2>
          <div
            className="w-12 h-px mx-auto"
            style={{ backgroundColor: '#7a0000' }}
          />
        </motion.div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative"
            >
              {/* Product Image Container */}
              <div className="relative h-96 md:h-[500px] overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Quick Add Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/70 flex items-center justify-center"
                >
                  <button
                    className="px-6 py-2 text-white border border-white hover:bg-white hover:text-black transition-all duration-300"
                    style={{ backgroundColor: '#7a0000' }}
                  >
                    Quick Add
                  </button>
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="mt-4 text-center">
                <h3 className="font-display text-lg md:text-xl text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}