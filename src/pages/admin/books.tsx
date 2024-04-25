import { useEffect, useState } from "react";
import { IBook } from "@/utils/apis/books/type";
import { deleteBook, getBooks } from "@/utils/apis/books/api";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DataTable } from "@/components/data-table";
import { TabsContent } from "@/components/ui/tabs";

import EditBook from "./edit-book";
import AddBook from "./add-book";

function Books() {
  const [datas, setDatas] = useState<IBook[]>([]);
  // const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getBooks();
      setDatas(result.payload.datas);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  async function handleDeleteBook(bookId: number) {
    try {
      await deleteBook(bookId);
      fetchData();
      toast("Buku berhasil dihapus");
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  const columns: ColumnDef<IBook>[] = [
    {
      header: "No",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "isbn",
      header: "ISBN",
    },
    {
      header: "Features",
      cell: (info) => (
        <div className="flex gap-2">
          {/* <EditBook id={info.row.original.id} selectedBook={setSelectedBook} /> */}
          <EditBook id={info.row.original.id} />

          <Button
            className="hover:bg-red-700"
            variant={"destructive"}
            onClick={() => handleDeleteBook(info.row.original.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center ">
        <p className="text-2xl font-semibold">List of Books</p>

        <AddBook />
      </div>
      <TabsContent value="books">
        <DataTable columns={columns} data={datas} />
      </TabsContent>
    </>
  );
}

export default Books;
