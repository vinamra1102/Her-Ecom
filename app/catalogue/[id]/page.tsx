'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, ChevronDown, Minus, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCartStore } from '@/lib/cart-store';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[];
  sizes: string[];
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Silk Wrap Dress',
    price: 890,
    category: 'Dresses',
    images: [
      'https://images.unsplash.com/photo-1566479179817-b7f7e8e64b6d?fit=crop&w=800&h=1067',
      'https://images.unsplash.com/photo-1548549557-dbe9155986b1?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?fit=crop&w=200&h=267',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'Crafted from the finest silk charmeuse, this wrap dress moves with effortless grace. Designed for the woman who commands attention without seeking it.',
  },
  {
    id: 2,
    name: 'Structured Blazer',
    price: 1100,
    category: 'Tops',
    images: [
      'https://images.unsplash.com/photo-1548549557-dbe9155986b1?fit=crop&w=800&h=1067',
      'https://images.unsplash.com/photo-1566479179817-b7f7e8e64b6d?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?fit=crop&w=200&h=267',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'A sharply structured blazer with clean lines and impeccable tailoring. Features peak lapels and a sculpted shoulder for a powerful silhouette.',
  },
  {
    id: 3,
    name: 'Wide Leg Trousers',
    price: 420,
    category: 'Tops',
    images: [
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?fit=crop&w=800&h=1067',
      'https://images.unsplash.com/photo-1548549557-dbe9155986b1?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?fit=crop&w=200&h=267',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'Flowing wide-leg trousers cut from premium wool crepe. High-waisted with pressed creases and a fluid drape that moves beautifully with every step.',
  },
  {
    id: 4,
    name: 'Cashmere Turtleneck',
    price: 550,
    category: 'Knitwear',
    images: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?fit=crop&w=800&h=1067',
      'https://images.unsplash.com/photo-1548549557-dbe9155986b1?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1566479179817-b7f7e8e64b6d?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?fit=crop&w=200&h=267',
    ],
    sizes: ['S', 'M', 'L'],
    description:
      'Luxuriously soft cashmere turtleneck spun from Grade-A Mongolian cashmere. A relaxed fit with ribbed cuffs and hem for understated warmth.',
  },
  {
    id: 5,
    name: 'Evening Gown',
    price: 2400,
    category: 'Evening Wear',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?fit=crop&w=800&h=1067',
      'https://images.unsplash.com/photo-1548549557-dbe9155986b1?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1566479179817-b7f7e8e64b6d?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?fit=crop&w=200&h=267',
    ],
    sizes: ['XS', 'S', 'M'],
    description:
      'A breathtaking evening gown with a floor-sweeping silhouette. Hand-finished with delicate draping and an open back that commands attention.',
  },
  {
    id: 6,
    name: 'Linen Shirt Dress',
    price: 380,
    category: 'Dresses',
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?fit=crop&w=800&h=1067',
      'https://images.unsplash.com/photo-1548549557-dbe9155986b1?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1566479179817-b7f7e8e64b6d?fit=crop&w=200&h=267',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'An effortlessly chic linen shirt dress for warm days. Relaxed fit with a concealed button placket, rolled sleeves, and a self-tie belt.',
  },
  {
    id: 7,
    name: 'Gold Chain Necklace',
    price: 290,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?fit=crop&w=800&h=1067',
      'https://images.unsplash.com/photo-1548549557-dbe9155986b1?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?fit=crop&w=200&h=267',
    ],
    sizes: ['One Size'],
    description:
      'A refined gold chain necklace with a delicate pendant. 18k gold-plated with a lobster clasp closure, designed to layer beautifully or wear alone.',
  },
  {
    id: 8,
    name: 'Wool Coat',
    price: 1650,
    category: 'Tops',
    images: [
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?fit=crop&w=800&h=1067',
      'https://images.unsplash.com/photo-1548549557-dbe9155986b1?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?fit=crop&w=200&h=267',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'An investment wool coat crafted from double-faced Italian wool. Oversized silhouette with notch lapels and a self-belt for versatile styling.',
  },
  {
    id: 9,
    name: 'Velvet Mini Dress',
    price: 720,
    category: 'Dresses',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?fit=crop&w=800&h=1067',
      'https://images.unsplash.com/photo-1548549557-dbe9155986b1?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?fit=crop&w=200&h=267',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?fit=crop&w=200&h=267',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'A sumptuous velvet mini dress with a body-skimming fit. Features a subtle cowl neckline and long sleeves for an alluring evening look.',
  },
];

const recommendedProducts = [
  {
    id: 10,
    name: 'Satin Camisole',
    price: 340,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?fit=crop&w=600&h=800',
  },
  {
    id: 11,
    name: 'Pleated Midi Skirt',
    price: 520,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?fit=crop&w=600&h=800',
  },
  {
    id: 12,
    name: 'Leather Clutch',
    price: 410,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?fit=crop&w=600&h=800',
  },
  {
    id: 13,
    name: 'Silk Blouse',
    price: 480,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?fit=crop&w=600&h=800',
  },
];

const accordionSections = [
  {
    title: 'Details & Care',
    content:
      '100% Silk Charmeuse. Dry clean only. Store on a padded hanger to maintain shape. Avoid direct sunlight when storing. Iron on low heat with a pressing cloth.',
  },
  {
    title: 'Shipping & Returns',
    content:
      'Complimentary express shipping on all orders. Delivery within 2-4 business days. Free returns within 14 days of delivery. Items must be unworn with all tags attached. Contact concierge@her.com for return authorization.',
  },
  {
    title: 'Size & Fit',
    content:
      'Model is 5\'10" and wears size S. Relaxed fit — we recommend ordering your usual size. Wrap closure with adjustable tie. Falls to mid-calf on most heights.',
  },
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id));
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const { addItem, openCart } = useCartStore();

  const handleAddToBag = () => {
    if (!product || !selectedSize) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.images[0],
    });
    openCart();
  };

  if (!product) {
    return (
      <main className="w-full bg-white min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="font-script italic text-3xl text-gray-400 mb-4">
              Piece not found
            </p>
            <Link
              href="/catalogue"
              className="text-sm tracking-wider hover:opacity-70 transition-opacity"
              style={{ color: '#7a0000', fontFamily: "'Quicksand', sans-serif" }}
            >
              Back to Collection
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full bg-white min-h-screen">
      <Navbar />

      <div className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <ol className="flex items-center gap-2 text-xs" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              <li>
                <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-300">/</li>
              <li>
                <Link href="/catalogue" style={{ color: '#7a0000' }} className="hover:opacity-70 transition-opacity">
                  Catalogue
                </Link>
              </li>
              <li className="text-gray-300">/</li>
              <li className="text-gray-500">{product.name}</li>
            </ol>
          </motion.nav>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column — Image Gallery (55%) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' as const }}
              className="lg:col-span-7"
            >
              {/* Main Image */}
              <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: '3/4' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.images[activeImage]}
                      alt={`${product.name} - view ${activeImage + 1}`}
                      fill
                      className="object-cover"
                      priority={activeImage === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3 mt-3">
                {product.images.slice(1).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i + 1)}
                    className="relative overflow-hidden bg-gray-100 cursor-pointer group"
                    style={{ aspectRatio: '3/4' }}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - thumbnail ${i + 1}`}
                      fill
                      className="object-cover transition-opacity duration-200"
                      style={{ opacity: activeImage === i + 1 ? 1 : 0.6 }}
                    />
                    <div
                      className="absolute inset-0 border-2 transition-colors duration-200"
                      style={{
                        borderColor: activeImage === i + 1 ? '#7a0000' : 'transparent',
                      }}
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right Column — Product Info (45%) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' as const, delay: 0.1 }}
              className="lg:col-span-5"
            >
              {/* Category Tag */}
              <p
                className="text-[10px] tracking-[0.25em] uppercase mb-3"
                style={{ color: '#7a0000', fontFamily: "'Quicksand', sans-serif" }}
              >
                {product.category}
              </p>

              {/* Product Name */}
              <h1 className="font-script italic text-gray-900 mb-4" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
                {product.name}
              </h1>

              {/* Price */}
              <p
                className="text-xl mb-6"
                style={{ color: '#574944', fontFamily: "'Quicksand', sans-serif" }}
              >
                &euro;{product.price.toLocaleString()}
              </p>

              {/* Divider */}
              <div className="w-12 h-px mb-6" style={{ backgroundColor: '#7a0000' }} />

              {/* Description */}
              <p
                className="text-sm leading-relaxed text-gray-600 mb-8"
                style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 300 }}
              >
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4
                    className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Select Size
                  </h4>
                  <button
                    className="text-[10px] tracking-wider underline"
                    style={{ color: '#7a0000', fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[44px] h-11 px-4 text-xs font-medium border rounded-full transition-all duration-200"
                      style={{
                        borderColor: selectedSize === size ? '#7a0000' : '#d2c8be',
                        backgroundColor: selectedSize === size ? '#7a0000' : 'transparent',
                        color: selectedSize === size ? '#ffffff' : '#374151',
                        fontFamily: "'Quicksand', sans-serif",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h4
                  className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Quantity
                </h4>
                <div className="inline-flex items-center border rounded-full" style={{ borderColor: '#d2c8be' }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span
                    className="w-10 text-center text-sm font-medium"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToBag}
                disabled={!selectedSize}
                className="w-full py-4 text-white text-xs tracking-[0.25em] uppercase transition-colors duration-300 flex items-center justify-center gap-3 mb-3 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: '#000000',
                  fontFamily: "'Quicksand', sans-serif",
                }}
                onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#7a0000')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
              >
                <ShoppingBag size={16} />
                {selectedSize ? 'Add to Bag' : 'Select a Size'}
              </button>

              {/* Wishlist */}
              <button
                className="w-full py-4 text-xs tracking-[0.25em] uppercase border transition-colors duration-300 flex items-center justify-center gap-3 mb-8"
                style={{
                  borderColor: '#d2c8be',
                  color: '#374151',
                  fontFamily: "'Quicksand', sans-serif",
                }}
              >
                <Heart size={16} />
                Add to Wishlist
              </button>

              {/* Divider */}
              <div className="w-full h-px mb-6" style={{ backgroundColor: '#d2c8be' }} />

              {/* Accordion Sections */}
              <div className="space-y-0">
                {accordionSections.map((section, i) => (
                  <div key={i} className="border-b" style={{ borderColor: '#d2c8be' }}>
                    <button
                      onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                      className="w-full flex items-center justify-between py-5 text-left"
                    >
                      <span
                        className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-700"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                      >
                        {section.title}
                      </span>
                      <motion.div
                        animate={{ rotate: openAccordion === i ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={16} className="text-gray-400" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {openAccordion === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' as const }}
                          className="overflow-hidden"
                        >
                          <p
                            className="pb-5 text-sm leading-relaxed text-gray-500"
                            style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 300 }}
                          >
                            {section.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* You May Also Like */}
          <div className="mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-script italic text-3xl md:text-4xl text-gray-900 mb-2">
                You May Also Like
              </h2>
              <div className="w-12 h-px mx-auto" style={{ backgroundColor: '#7a0000' }} />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.15 },
                },
              }}
            >
              {recommendedProducts.map((item) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: 'easeOut' as const },
                    },
                  }}
                >
                  <Link href={`/catalogue/${item.id}`} className="group block">
                    <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: '3/4' }}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span
                          className="px-6 py-2.5 border border-white text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-300"
                          style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                          View Item
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-display text-lg text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p
                        className="text-[10px] tracking-[0.2em] uppercase mb-1.5"
                        style={{ color: '#7a0000', fontFamily: "'Quicksand', sans-serif" }}
                      >
                        {item.category}
                      </p>
                      <p
                        className="text-sm text-gray-700"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                      >
                        &euro;{item.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
