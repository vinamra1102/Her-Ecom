'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  sizes: string[];
  colors: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'Silk Wrap Dress',
    price: 890,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1566479179817-b7f7e8e64b6d?fit=crop&w=600&h=800',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Black', 'Red'],
  },
  {
    id: 2,
    name: 'Structured Blazer',
    price: 1100,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1548549557-dbe9155986b1?fit=crop&w=600&h=800',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey'],
  },
  {
    id: 3,
    name: 'Wide Leg Trousers',
    price: 420,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?fit=crop&w=600&h=800',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Beige'],
  },
  {
    id: 4,
    name: 'Cashmere Turtleneck',
    price: 550,
    category: 'Knitwear',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?fit=crop&w=600&h=800',
    sizes: ['S', 'M', 'L'],
    colors: ['Beige', 'Grey', 'White'],
  },
  {
    id: 5,
    name: 'Evening Gown',
    price: 2400,
    category: 'Evening Wear',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?fit=crop&w=600&h=800',
    sizes: ['XS', 'S', 'M'],
    colors: ['Red', 'Black'],
  },
  {
    id: 6,
    name: 'Linen Shirt Dress',
    price: 380,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?fit=crop&w=600&h=800',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Beige'],
  },
  {
    id: 7,
    name: 'Gold Chain Necklace',
    price: 290,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?fit=crop&w=600&h=800',
    sizes: ['One Size'],
    colors: ['Red'],
  },
  {
    id: 8,
    name: 'Wool Coat',
    price: 1650,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?fit=crop&w=600&h=800',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Beige'],
  },
  {
    id: 9,
    name: 'Velvet Mini Dress',
    price: 720,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?fit=crop&w=600&h=800',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Red', 'Black'],
  },
];

const categories = ['All', 'Dresses', 'Tops', 'Knitwear', 'Accessories', 'Evening Wear'];
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];
const colorSwatches: { name: string; hex: string }[] = [
  { name: 'White', hex: '#ffffff' },
  { name: 'Black', hex: '#000000' },
  { name: 'Red', hex: '#7a0000' },
  { name: 'Beige', hex: '#d2c8be' },
  { name: 'Grey', hex: '#8a8a8a' },
];
const sortOptions = ['Featured', 'Price Low-High', 'Price High-Low', 'Newest'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function CataloguePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Featured');
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setPriceRange([0, 2000]);
    setSelectedColors([]);
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedSizes.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 2000 ||
    selectedColors.length > 0;

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedSizes.length > 0 && !selectedSizes.some((s) => p.sizes.includes(s))) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedColors.length > 0 && !selectedColors.some((c) => p.colors.includes(c))) return false;
      return true;
    });

    switch (sortBy) {
      case 'Price Low-High':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'Price High-Low':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'Newest':
        result = [...result].reverse();
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, selectedSizes, priceRange, selectedColors, sortBy]);

  const sidebarContent = (
    <div className="space-y-8">
      {/* Filter Heading */}
      <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-900">
        Filter
      </h3>

      {/* Category */}
      <div>
        <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
          Category
        </h4>
        <div className="space-y-3">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className="w-4 h-4 border rounded-sm flex items-center justify-center transition-colors"
                style={{
                  borderColor: selectedCategory === cat ? '#7a0000' : '#d2c8be',
                  backgroundColor: selectedCategory === cat ? '#7a0000' : 'transparent',
                }}
              >
                {selectedCategory === cat && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                className="text-sm transition-colors"
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  color: selectedCategory === cat ? '#7a0000' : '#374151',
                  fontWeight: selectedCategory === cat ? 600 : 400,
                }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
          Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className="w-10 h-10 text-xs font-medium border rounded-full transition-all duration-200"
              style={{
                borderColor: selectedSizes.includes(size) ? '#7a0000' : '#d2c8be',
                backgroundColor: selectedSizes.includes(size) ? '#7a0000' : 'transparent',
                color: selectedSizes.includes(size) ? '#ffffff' : '#374151',
                fontFamily: "'Quicksand', sans-serif",
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
          Price Range
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between text-sm" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            <span>&euro;{priceRange[0]}</span>
            <span>&euro;{priceRange[1]}</span>
          </div>
          <input
            type="range"
            min={0}
            max={2000}
            step={50}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #7a0000 0%, #7a0000 ${((priceRange[1]) / 2000) * 100}%, #d2c8be ${((priceRange[1]) / 2000) * 100}%, #d2c8be 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            <span>&euro;0</span>
            <span>&euro;2000</span>
          </div>
        </div>
      </div>

      {/* Color */}
      <div>
        <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
          Color
        </h4>
        <div className="flex flex-wrap gap-3">
          {colorSwatches.map((swatch) => (
            <button
              key={swatch.name}
              onClick={() => toggleColor(swatch.name)}
              className="group relative"
              title={swatch.name}
            >
              <div
                className="w-7 h-7 rounded-full border-2 transition-all duration-200"
                style={{
                  backgroundColor: swatch.hex,
                  borderColor: selectedColors.includes(swatch.name)
                    ? '#7a0000'
                    : swatch.hex === '#ffffff'
                    ? '#d2c8be'
                    : 'transparent',
                  boxShadow: selectedColors.includes(swatch.name)
                    ? '0 0 0 2px #7a0000'
                    : 'none',
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-sm tracking-wider transition-opacity hover:opacity-70"
          style={{ color: '#7a0000', fontFamily: "'Quicksand', sans-serif" }}
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <main className="w-full bg-white min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section
        className="w-full pt-28 pb-12"
        style={{ backgroundColor: '#d2c8be' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-script italic text-4xl md:text-5xl text-gray-900 mb-3"
          >
            Our Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm tracking-widest text-gray-600"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            CURATED PIECES FOR THE MODERN WOMAN
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 text-sm tracking-wider text-gray-700"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            <SlidersHorizontal size={16} />
            FILTERS
          </button>
        </div>

        <div className="flex gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-[260px] flex-shrink-0">
            <div className="sticky top-28">{sidebarContent}</div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1 min-w-0">
            {/* Sort Bar */}
            <div
              className="flex items-center justify-between pb-4 mb-8 border-b"
              style={{ borderColor: '#7a0000' }}
            >
              <p
                className="text-sm text-gray-500"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                {filteredProducts.length} piece{filteredProducts.length !== 1 ? 's' : ''}
              </p>
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 text-sm text-gray-700"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Sort: {sortBy}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-lg rounded-sm z-20 min-w-[180px] overflow-hidden"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option);
                            setSortOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50"
                          style={{
                            fontFamily: "'Quicksand', sans-serif",
                            color: sortBy === option ? '#7a0000' : '#374151',
                            fontWeight: sortBy === option ? 600 : 400,
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Product Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${selectedSizes.join()}-${priceRange.join()}-${selectedColors.join()}-${sortBy}`}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={cardVariants}>
                    <Link href={`/catalogue/${product.id}`} className="group block">
                      {/* Image Container */}
                      <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: '3/4' }}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span
                            className="px-6 py-2.5 border border-white text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-300"
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                          >
                            View Item
                          </span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="mt-4">
                        <h3 className="font-display text-lg text-gray-900 mb-1">
                          {product.name}
                        </h3>
                        <p
                          className="text-[10px] tracking-[0.2em] uppercase mb-1.5"
                          style={{ color: '#7a0000', fontFamily: "'Quicksand', sans-serif" }}
                        >
                          {product.category}
                        </p>
                        <p
                          className="text-sm text-gray-700"
                          style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                          &euro;{product.price.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <p
                  className="font-script italic text-2xl text-gray-400 mb-4"
                >
                  No pieces found
                </p>
                <p
                  className="text-sm text-gray-400 mb-6"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Try adjusting your filters to discover more.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm tracking-wider hover:opacity-70 transition-opacity"
                  style={{ color: '#7a0000', fontFamily: "'Quicksand', sans-serif" }}
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-900">
                    Filter
                  </h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
                {sidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
