import { create } from 'zustand';

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

const sampleItems: CartItem[] = [
  {
    id: 1,
    name: 'Silk Wrap Dress',
    price: 890,
    size: 'M',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1566479179817-b7f7e8e64b6d?fit=crop&w=120&h=160',
  },
  {
    id: 7,
    name: 'Gold Chain Necklace',
    price: 290,
    size: 'OS',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?fit=crop&w=120&h=160',
  },
];

export const useCartStore = create<CartState>((set, get) => ({
  items: sampleItems,
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
}));
