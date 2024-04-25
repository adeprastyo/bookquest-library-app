import { useState, useEffect } from "react";
import { toast } from "sonner";

import Layout from "@/components/layout";

import { getBooks } from "@/utils/apis/books/api";
import { IBook } from "@/utils/apis/books/type";
import BookCard from "@/components/book-card";

const Homepage = () => {
  const [datas, setDatas] = useState<IBook[]>([]);

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

  return (
    <Layout>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {datas.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            cover_image={book.cover_image}
            author={book.author}
            id={book.id}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Homepage;
