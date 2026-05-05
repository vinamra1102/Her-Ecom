'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, ChevronDown, Loader as Loader2 } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

interface FormData {
  email: string;
  newsletter: boolean;
  country: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  shippingMethod: 'standard' | 'express';
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardholder: string;
}

interface FormErrors {
  [key: string]: string;
}

const orderItems = [
  {
    id: 1,
    name: 'Silk Wrap Dress',
    size: 'M',
    price: 890,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1566479179817-b7f7e8e64b6d?fit=crop&w=120&h=160',
  },
  {
    id: 7,
    name: 'Gold Chain Necklace',
    size: 'OS',
    price: 290,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?fit=crop&w=120&h=160',
  },
  {
    id: 3,
    name: 'Wide Leg Trousers',
    size: 'XL',
    price: 420,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?fit=crop&w=120&h=160',
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function FloatingInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder = ' ',
  required = true,
  maxLength,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative pt-5 pb-1">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className="w-full bg-transparent border-b py-2 text-sm text-gray-900 outline-none transition-colors duration-200"
        style={{
          borderColor: error ? '#dc2626' : focused ? '#7a0000' : '#d2c8be',
          fontFamily: "'Quicksand', sans-serif",
        }}
      />
      <label
        htmlFor={id}
        className="absolute left-0 transition-all duration-200 pointer-events-none"
        style={{
          top: isActive ? '0px' : '26px',
          fontSize: isActive ? '10px' : '14px',
          color: error ? '#dc2626' : focused ? '#7a0000' : '#9ca3af',
          fontFamily: "'Quicksand', sans-serif",
          letterSpacing: isActive ? '0.1em' : '0',
          textTransform: isActive ? 'uppercase' : 'none',
          fontWeight: isActive ? 600 : 400,
        }}
      >
        {label}
      </label>
      {error && (
        <p className="text-[10px] mt-1" style={{ color: '#dc2626', fontFamily: "'Quicksand', sans-serif" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  const { subtotal } = useCartStore();
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<FormData>({
    email: '',
    newsletter: false,
    country: 'United Kingdom',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    shippingMethod: 'standard',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardholder: '',
  });

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const shippingCost = form.shippingMethod === 'express' ? 15 : 0;
  const orderSubtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = orderSubtotal + shippingCost;

  const cardType = useMemo(() => {
    const num = form.cardNumber.replace(/\s/g, '');
    if (/^4/.test(num)) return 'visa';
    if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return 'mastercard';
    if (/^3[47]/.test(num)) return 'amex';
    return null;
  }, [form.cardNumber]);

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(' ') : '';
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const validate = (): boolean => {
    const e: FormErrors = {};

    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';

    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    if (!form.address1.trim()) e.address1 = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.postalCode.trim()) e.postalCode = 'Postal code is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';

    const cardDigits = form.cardNumber.replace(/\s/g, '');
    if (!cardDigits) e.cardNumber = 'Card number is required';
    else if (cardDigits.length < 13 || cardDigits.length > 16) e.cardNumber = 'Invalid card number';

    if (!form.expiry.trim()) e.expiry = 'Expiry is required';
    else if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Use MM/YY format';

    if (!form.cvv.trim()) e.cvv = 'Security code is required';
    else if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = 'Invalid code';

    if (!form.cardholder.trim()) e.cardholder = 'Cardholder name is required';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => setIsSubmitting(false), 3000);
    }
  };

  return (
    <main className="w-full bg-white min-h-screen">
      {/* Top Bar */}
      <div className="w-full border-b" style={{ borderColor: '#7a0000' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 text-center">
          <Link href="/" className="inline-block">
            <p className="font-script italic text-2xl tracking-widest text-gray-900 hover:opacity-70 transition">
              her
            </p>
            <p
              className="text-[9px] tracking-[0.3em] text-gray-400"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              EST. 2030
            </p>
          </Link>
        </div>
      </div>

      {/* Breadcrumb Steps */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-center gap-0">
          {[
            { label: 'Cart', active: false },
            { label: 'Details', active: true },
            { label: 'Payment', active: false },
          ].map((step, i) => (
            <React.Fragment key={step.label}>
              {i > 0 && (
                <div className="w-12 sm:w-20 h-px mx-2" style={{ backgroundColor: '#d2c8be' }} />
              )}
              <div className="flex flex-col items-center">
                <span
                  className="text-[10px] tracking-[0.2em] uppercase font-semibold"
                  style={{
                    color: step.active ? '#7a0000' : '#9ca3af',
                    fontFamily: "'Quicksand', sans-serif",
                  }}
                >
                  {step.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column — Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit}>
              {/* Contact */}
              <motion.div
                className="mb-10"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0 }}
              >
                <h3
                  className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-500 mb-6"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Contact
                </h3>
                <FloatingInput
                  id="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => updateField('email', v)}
                  error={errors.email}
                />
                <label className="flex items-center gap-3 mt-5 cursor-pointer">
                  <div
                    className="w-4 h-4 border rounded-sm flex items-center justify-center transition-colors"
                    style={{
                      borderColor: form.newsletter ? '#7a0000' : '#d2c8be',
                      backgroundColor: form.newsletter ? '#7a0000' : 'transparent',
                    }}
                    onClick={() => updateField('newsletter', !form.newsletter)}
                  >
                    {form.newsletter && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-xs text-gray-500"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Email me with news and exclusive offers
                  </span>
                </label>
              </motion.div>

              {/* Delivery */}
              <motion.div
                className="mb-10"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <h3
                  className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-500 mb-6"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Delivery
                </h3>

                {/* Country */}
                <div className="relative pt-5 pb-1">
                  <select
                    value={form.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    className="w-full bg-transparent border-b py-2 text-sm text-gray-900 outline-none appearance-none cursor-pointer transition-colors duration-200"
                    style={{
                      borderColor: '#d2c8be',
                      fontFamily: "'Quicksand', sans-serif",
                    }}
                  >
                    <option>United Kingdom</option>
                    <option>France</option>
                    <option>Germany</option>
                    <option>Italy</option>
                    <option>Spain</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                  <label
                    className="absolute left-0 transition-all duration-200 pointer-events-none"
                    style={{
                      top: '0px',
                      fontSize: '10px',
                      color: '#9ca3af',
                      fontFamily: "'Quicksand', sans-serif",
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    Country
                  </label>
                  <ChevronDown size={14} className="absolute right-0 top-7 text-gray-400 pointer-events-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FloatingInput
                    id="firstName"
                    label="First Name"
                    value={form.firstName}
                    onChange={(v) => updateField('firstName', v)}
                    error={errors.firstName}
                  />
                  <FloatingInput
                    id="lastName"
                    label="Last Name"
                    value={form.lastName}
                    onChange={(v) => updateField('lastName', v)}
                    error={errors.lastName}
                  />
                </div>

                <FloatingInput
                  id="address1"
                  label="Address"
                  value={form.address1}
                  onChange={(v) => updateField('address1', v)}
                  error={errors.address1}
                />

                <FloatingInput
                  id="address2"
                  label="Apartment, suite, etc. (optional)"
                  value={form.address2}
                  onChange={(v) => updateField('address2', v)}
                  required={false}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FloatingInput
                    id="city"
                    label="City"
                    value={form.city}
                    onChange={(v) => updateField('city', v)}
                    error={errors.city}
                  />
                  <FloatingInput
                    id="state"
                    label="State"
                    value={form.state}
                    onChange={(v) => updateField('state', v)}
                    required={false}
                  />
                  <FloatingInput
                    id="postalCode"
                    label="Postal Code"
                    value={form.postalCode}
                    onChange={(v) => updateField('postalCode', v)}
                    error={errors.postalCode}
                  />
                </div>

                <FloatingInput
                  id="phone"
                  label="Phone"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => updateField('phone', v)}
                  error={errors.phone}
                />
              </motion.div>

              {/* Shipping Method */}
              <motion.div
                className="mb-10"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <h3
                  className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-500 mb-6"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Shipping Method
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      value: 'standard' as const,
                      label: 'Standard Delivery',
                      detail: '5-7 business days',
                      price: 'FREE',
                    },
                    {
                      value: 'express' as const,
                      label: 'Express Delivery',
                      detail: '2-3 business days',
                      price: '\u20AC15',
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField('shippingMethod', option.value)}
                      className="w-full flex items-center justify-between px-5 py-4 border transition-colors duration-200"
                      style={{
                        borderColor: form.shippingMethod === option.value ? '#7a0000' : '#d2c8be',
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors"
                          style={{
                            borderColor: form.shippingMethod === option.value ? '#7a0000' : '#d2c8be',
                          }}
                        >
                          {form.shippingMethod === option.value && (
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#7a0000' }} />
                          )}
                        </div>
                        <div className="text-left">
                          <p
                            className="text-sm font-medium text-gray-900"
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                          >
                            {option.label}
                          </p>
                          <p
                            className="text-xs text-gray-400"
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                          >
                            {option.detail}
                          </p>
                        </div>
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: option.price === 'FREE' ? '#7a0000' : '#374151',
                          fontFamily: "'Quicksand', sans-serif",
                        }}
                      >
                        {option.price}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Payment */}
              <motion.div
                className="mb-10"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <h3
                  className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-500 mb-2"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Payment
                </h3>
                <p
                  className="text-xs text-gray-400 mb-6 flex items-center gap-1.5"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  <Lock size={12} />
                  All transactions are secure and encrypted
                </p>

                <div className="relative">
                  <FloatingInput
                    id="cardNumber"
                    label="Card Number"
                    value={form.cardNumber}
                    onChange={(v) => updateField('cardNumber', formatCardNumber(v))}
                    error={errors.cardNumber}
                    maxLength={19}
                  />
                  {cardType && (
                    <span
                      className="absolute right-0 top-6 text-[10px] font-bold tracking-wider text-gray-400"
                      style={{ fontFamily: "'Quicksand', sans-serif" }}
                    >
                      {cardType === 'visa' ? 'VISA' : cardType === 'mastercard' ? 'MC' : 'AMEX'}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FloatingInput
                    id="expiry"
                    label="Expiry Date"
                    value={form.expiry}
                    onChange={(v) => updateField('expiry', formatExpiry(v))}
                    error={errors.expiry}
                    maxLength={5}
                  />
                  <FloatingInput
                    id="cvv"
                    label="Security Code"
                    value={form.cvv}
                    onChange={(v) => updateField('cvv', v.replace(/\D/g, '').slice(0, 4))}
                    error={errors.cvv}
                    maxLength={4}
                  />
                </div>

                <FloatingInput
                  id="cardholder"
                  label="Cardholder Name"
                  value={form.cardholder}
                  onChange={(v) => updateField('cardholder', v)}
                  error={errors.cardholder}
                />

                {/* Card Logos */}
                <div className="flex items-center gap-3 mt-4">
                  {['VISA', 'MC', 'AMEX'].map((brand) => (
                    <div
                      key={brand}
                      className="px-2 py-1 border text-[9px] font-bold tracking-wider text-gray-300"
                      style={{
                        borderColor: '#d2c8be',
                        fontFamily: "'Quicksand', sans-serif",
                      }}
                    >
                      {brand}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Place Order */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-white text-xs tracking-[0.25em] uppercase transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-60"
                  style={{
                    backgroundColor: '#000000',
                    fontFamily: "'Quicksand', sans-serif",
                  }}
                  onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#7a0000')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      PLACE ORDER — &euro;{total.toLocaleString()}
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </div>

          {/* Right Column — Order Summary */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-8">
              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
                className="lg:hidden w-full flex items-center justify-between py-4 border-b mb-4"
                style={{ borderColor: '#d2c8be' }}
              >
                <span
                  className="font-script italic text-xl text-gray-900"
                >
                  Order Summary
                </span>
                <motion.div
                  animate={{ rotate: mobileSummaryOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={18} className="text-gray-400" />
                </motion.div>
              </button>

              {/* Desktop Header */}
              <h2 className="hidden lg:block font-script italic text-2xl text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <motion.div
                className={`space-y-5 ${mobileSummaryOpen ? 'block' : 'hidden lg:block'}`}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
                }}
              >
                {orderItems.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="flex gap-4"
                  >
                    <div className="relative w-[50px] h-[65px] flex-shrink-0 overflow-hidden rounded-sm bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <div
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                        style={{ backgroundColor: '#7a0000' }}
                      >
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex justify-between">
                      <div>
                        <p className="font-display text-base text-gray-900 leading-tight">
                          {item.name}
                        </p>
                        <p
                          className="text-xs text-gray-400 mt-0.5"
                          style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                          Size: {item.size}
                        </p>
                      </div>
                      <p
                        className="text-sm text-gray-700"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                      >
                        &euro;{item.price.toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Cost Breakdown */}
              <div
                className={`mt-6 pt-6 border-t ${mobileSummaryOpen ? 'block' : 'hidden lg:block'}`}
                style={{ borderColor: '#d2c8be' }}
              >
                <div className="flex justify-between mb-2">
                  <span
                    className="text-sm text-gray-500"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Subtotal
                  </span>
                  <span
                    className="text-sm text-gray-700"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    &euro;{orderSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span
                    className="text-sm text-gray-500"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Shipping
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      color: shippingCost === 0 ? '#7a0000' : '#374151',
                      fontFamily: "'Quicksand', sans-serif",
                    }}
                  >
                    {shippingCost === 0 ? 'FREE' : `\u20AC${shippingCost}`}
                  </span>
                </div>
                <div className="h-px mb-4" style={{ backgroundColor: '#d2c8be' }} />
                <div className="flex justify-between items-baseline mb-2">
                  <span
                    className="text-sm font-semibold text-gray-900"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Total
                  </span>
                  <span className="font-display text-2xl text-gray-900">
                    &euro;{total.toLocaleString()}
                  </span>
                </div>
                <p
                  className="text-[10px] text-gray-400"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Taxes included where applicable
                </p>
              </div>

              {/* Trust Signals */}
              <div
                className={`mt-8 space-y-3 ${mobileSummaryOpen ? 'block' : 'hidden lg:block'}`}
              >
                {[
                  { icon: <Lock size={14} />, text: 'Secure 256-bit SSL encryption' },
                  { icon: <span className="text-sm">&#8617;</span>, text: 'Free returns within 30 days' },
                  { icon: <span className="text-sm">&#128230;</span>, text: 'Complimentary gift packaging' },
                ].map((signal, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-400">
                    <span className="flex-shrink-0">{signal.icon}</span>
                    <span
                      className="text-xs"
                      style={{ fontFamily: "'Quicksand', sans-serif" }}
                    >
                      {signal.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
