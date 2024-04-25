import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useBorrowStore from "@/utils/zustand_states/borrow";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useMemo } from "react";

export function Cart() {
  const { cart, removeBook, clearCart } = useBorrowStore((state) => state);

  function handleBorrow() {
    const body = {
      bookId: cart.map((item) => item.id),
      borrow_date: new Date().toISOString(),
    };

    console.log(body);
    // TODO: Add POST Borrow
    clearCart();
  }

  const isCartNull = useMemo(() => {
    return cart.length === 0 ? true : false;
  }, [cart]);

  return (
    <Sheet>
      <SheetTrigger className="text-white cursor-pointer" asChild>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
        </svg>
      </SheetTrigger>
      <SheetContent className="bg-neutral-50 text-black dark:bg-slate-900 border-slate-600 dark:text-white">
        <SheetHeader>
          <SheetTitle className="text-black dark:text-white">
            Your Cart
          </SheetTitle>
          <SheetDescription>
            Due date is 7 days after you click borrow.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4 w-full overflow-auto text-white">
          {cart.map((book) => (
            <div
              className="flex gap-5 items-center shadow-md shadow-gray-300 dark:shadow-gray-700 text-black dark:text-white"
              key={book.id}
            >
              <img
                className="object-contain w-1/4"
                src={book.cover_image}
                alt={book.title}
              />
              <p className="flex-grow">{book.title}</p>
              <Trash2
                className="cursor-pointer"
                onClick={() => removeBook(book)}
              />
            </div>
          ))}
        </div>
        <SheetFooter>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => handleBorrow()}
            disabled={isCartNull}
          >
            Borrow
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
