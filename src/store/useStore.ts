import { create } from 'zustand';
import { CartItem, Product, User } from '../types';
import { mockProducts } from '../data/mockProducts';

interface Store {
  cart: CartItem[];
  user: User | null;
  products: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  setUser: (user: User | null) => void;
  setProducts: (products: Product[]) => void;
}

export const useStore = create<Store>((set) => ({
  cart: [],
  user: null,
  products: mockProducts,
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  setUser: (user) => set({ user }),
  setProducts: (products) => set({ products }),
}));