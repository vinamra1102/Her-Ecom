'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCartStore();
  const router = useRouter();
  const total = subtotal();
  const count = totalItems();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed top-0 right-0 bottom-0 z-[70] bg-white w-full sm:w-[420px] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-baseline gap-2">
                <h2 className="font-script text-2xl text-gray-900">Your Bag</h2>
                <span className="text-xs text-gray-400 font-quicksand">
                  ({count} item{count !== 1 ? 's' : ''})
                </span>
              </div>
              <button onClick={closeCart} className="p-1 hover:opacity-60 transition-opacity">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-jewellect-maroon" />

            {/* Cart Items or Empty State */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6">
                <ShoppingBag size={64} className="text-gray-200 mb-6" strokeWidth={1} />
                <p className="font-script text-2xl text-gray-400 mb-4">
                  Your bag is empty
                </p>
                <Link
                  href="/catalogue"
                  onClick={closeCart}
                  className="text-sm tracking-wider underline hover:opacity-70 transition-opacity text-jewellect-maroon font-quicksand"
                >
                  Discover our collection
                </Link>
              </div>
            ) : (
              <>
                {/* Scrollable Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence initial={false}>
                    {items.map((item, i) => (
                      <motion.div
                        key={`${item.id}-${item.size}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.25, delay: i * 0.05 }}
                        className="flex gap-4 mb-6"
                      >
                        {/* Image */}
                        <div className="relative w-[60px] h-[80px] flex-shrink-0 overflow-hidden rounded-sm bg-gray-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-lg text-gray-900 leading-tight mb-0.5">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-400 mb-1 font-quicksand">
                            Size: {item.size}
                          </p>
                          <p className="text-sm text-gray-700 mb-2 font-quicksand">
                            &euro;{item.price.toLocaleString()}
                          </p>

                          {/* Quantity + Remove */}
                          <div className="flex items-center justify-between">
                            <div className="inline-flex items-center border rounded-full border-muted">
                              <button
                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-6 text-center text-xs font-medium font-quicksand">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id, item.size)}
                              className="text-[10px] tracking-wider underline hover:opacity-70 transition-opacity text-jewellect-maroon font-quicksand"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Order Summary + Buttons */}
                <div className="border-t border-muted">
                  <div className="px-6 pt-5 pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 font-quicksand">
                        Subtotal
                      </span>
                      <span className="text-sm font-semibold text-gray-900 font-quicksand">
                        &euro;{total.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 italic mb-3 font-quicksand">
                      Shipping calculated at checkout
                    </p>
                    <div className="h-px bg-gray-100 mb-3" />
                    {total >= 500 && (
                      <p className="text-[10px] tracking-wider mb-4 text-jewellect-maroon font-quicksand">
                        Complimentary shipping on orders over &euro;500
                      </p>
                    )}
                  </div>

                  <div className="px-6 pb-6 space-y-3">
                    <button
                      onClick={() => {
                        closeCart();
                        router.push('/checkout');
                      }}
                      className="w-full py-4 text-white text-xs tracking-[0.25em] uppercase transition-colors duration-300 flex items-center justify-center gap-2 bg-jewellect-black hover:bg-jewellect-maroon font-quicksand"
                    >
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={closeCart}
                      className="w-full py-3.5 text-xs tracking-[0.25em] uppercase border border-jewellect-black text-jewellect-black hover:border-jewellect-maroon hover:text-jewellect-maroon transition-colors duration-300 font-quicksand"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
