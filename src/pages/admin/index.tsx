import Layout from "@/components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import Books from "./books";
import Borrow from "./borrow";

const Dashboard = () => {
  return (
    <Layout centerX>
      <Tabs
        defaultValue="books"
        className="w-full flex flex-col items-center gap-2"
      >
        <TabsList className="grid w-fit grid-cols-2 bg-slate-500 text-white">
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="borrow">Borrow</TabsTrigger>
        </TabsList>

        <TabsContent className="w-11/12 flex flex-col gap-2" value="books">
          <Books />
        </TabsContent>
        <TabsContent value="borrow">
          <Borrow />
        </TabsContent>
      </Tabs>

      <Pagination className="mt-5">
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
    </Layout>
  );
};

export default Dashboard;
