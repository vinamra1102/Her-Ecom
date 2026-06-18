import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) => {
    const { items } = get();
    const existing = items.find((i) => i.id === item.id && i.size === item.size);
    if (existing) {
      set({
        items: items.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        ),
      });
    } else {
      set({ items: [...items, { ...item, quantity: item.quantity || 1 }] });
    }
  },

  removeItem: (id, size) => {
    set({ items: get().items.filter((i) => !(i.id === id && i.size === size)) });
  },

  updateQuantity: (id, size, quantity) => {
    if (quantity < 1) return;
    set({
      items: get().items.map((i) =>
        i.id === id && i.size === size ? { ...i, quantity } : i
      ),
    });
  },

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set({ isOpen: !get().isOpen }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}),
    {
      name: 'jewellect-cart',
      skipHydration: true,
    }
  )
);
