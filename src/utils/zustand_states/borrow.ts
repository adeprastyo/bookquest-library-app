import { create } from "zustand";

import { IBook } from "../apis/books/type";

interface BorrowState {
  cart: IBook[];
  addBook: (book: IBook) => void;
  removeBook: (book: IBook) => void;
  clearCart: () => void;
}

const useBorrowStore = create<BorrowState>()((set) => ({
  cart: [],
  addBook: (book) => set((state) => ({ cart: [...state.cart, book] })),
  removeBook: (book) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== book.id);
      return { cart: newCart };
    }),
  clearCart: () => set(() => ({ cart: [] })),
}));

export default useBorrowStore;
