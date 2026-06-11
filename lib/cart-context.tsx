"use client";

import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

const STORAGE_KEY = "ex_cart";

export type CartItem = {
  id: string; // productId
  slug: string;
  name: string;
  price: number; // итоговая цена за штуку (с учётом предзаказа)
  size: string;
  qty: number;
  preorder?: boolean;
};

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: string; size: string }
  | { type: "QTY"; id: string; size: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

const keyOf = (id: string, size: string) => `${id}__${size}`;

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const k = keyOf(action.item.id, action.item.size);
      const existing = state.items.find((i) => keyOf(i.id, i.size) === k);
      if (existing) {
        return {
          items: state.items.map((i) =>
            keyOf(i.id, i.size) === k ? { ...i, qty: i.qty + action.item.qty } : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE":
      return {
        items: state.items.filter(
          (i) => keyOf(i.id, i.size) !== keyOf(action.id, action.size)
        ),
      };
    case "QTY":
      return {
        items: state.items.map((i) =>
          keyOf(i.id, i.size) === keyOf(action.id, action.size)
            ? { ...i, qty: Math.max(1, action.qty) }
            : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}

const CartContext = createContext<{
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: CartItem) => void;
  remove: (id: string, size: string) => void;
  setQty: (id: string, size: string, qty: number) => void;
  clear: () => void;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  const count = state.items.reduce((s, i) => s + i.qty, 0);
  const total = state.items.reduce((s, i) => s + i.qty * i.price, 0);

  const value = {
    items: state.items,
    count,
    total,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    add: (item: CartItem) => {
      dispatch({ type: "ADD", item });
      setIsOpen(true);
    },
    remove: (id: string, size: string) => dispatch({ type: "REMOVE", id, size }),
    setQty: (id: string, size: string, qty: number) =>
      dispatch({ type: "QTY", id, size, qty }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
