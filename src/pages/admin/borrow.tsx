import { useEffect, useState } from "react";
import { IBorrowed } from "@/utils/apis/books/type";
import { deleteBorrow, getBorrowedBooks } from "@/utils/apis/books/api";
import dayjs from "dayjs";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DataTable } from "@/components/data-table";
import { TabsContent } from "@/components/ui/tabs";

import EditBorrow from "./edit-borrow";

function Borrow() {
  const [datas, setDatas] = useState<IBorrowed[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getBorrowedBooks();

      setDatas(result.payload.datas);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  async function handleDeleteBorrow(borrowId: number) {
    try {
      await deleteBorrow(borrowId);

      fetchData();

      toast("Peminjaman berhasil dihapus");
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  const columns: ColumnDef<IBorrowed>[] = [
    {
      header: "No",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "user.full_name",
      header: "User",
    },
    {
      accessorKey: "book.title",
      header: "Book",
    },
    {
      accessorKey: "borrow_date",
      header: "Borrow Date",
      cell: (info) =>
        dayjs(info.row.original.borrowed_date).format("ddd, D MMM YYYY"),
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: (info) =>
        dayjs(info.row.original.due_date).format("ddd, D MMM YYYY"),
    },
    {
      accessorKey: "return_date",
      header: "Return Date",
    },
    {
      header: "Features",
      cell: (info) => (
        <div className="flex gap-2">
          <EditBorrow />
          <Button
            variant={"destructive"}
            onClick={() => {
              handleDeleteBorrow(info.row.original.id);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <p className="text-2xl font-semibold">List of Borrowed Books</p>
      </div>
      <TabsContent value="borrow">
        <DataTable columns={columns} data={datas} />
      </TabsContent>
    </>
  );
}

export default Borrow;
