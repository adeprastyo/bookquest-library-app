import BookCard from "@/components/book-card";
import Layout from "@/components/layout";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function HistoryBorrow() {
  return (
    <Layout centerX>
      <div className="flex flex-col items-center gap-10">
        <div className="text-white text-2xl font-bold tracking-wide">
          <p>History Borrow</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <BookCard
            title="To Kill a Mockingbird"
            cover_image="http://res.cloudinary.com/hypeotesa/image/upload/v1699406533/kitchen-sink/jgpqif7vc5m5ko2niufi.jpg"
            author="Harper Lee"
            id={1}
          />
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Layout>
  );
}

export default HistoryBorrow;
