import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { Product } from "@/types/typeProduct"

type CartState = {
  items: Product[]
  addItemToCart: (item: Product) => void
  removeItemFromCart: (id: number) => void
  total: () => number
  increment: (id: number) => void
  decrement: (id: number) => void
  removeAllFromCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItemToCart: (item: Product) =>
        set((state) => ({
          items: [item, ...state.items],
        })),

      removeItemFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      removeAllFromCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce(
          (acc, item) => acc + item.price * (item.quantity ?? 1),
          0,
        ),

      increment: (id: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: (item.quantity ?? 1) + 1 }
              : item,
          ),
        })),
      decrement: (id: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity && item.quantity > 1 ? item.quantity - 1 : 1,
                }
              : item,
          ),
        })),
    }),

    { name: "cartStore", storage: createJSONStorage(() => localStorage) },
  ),
)
