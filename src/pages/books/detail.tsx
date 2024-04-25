import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout";

import { getDetailBook } from "@/utils/apis/books/api";
import { IBook } from "@/utils/apis/books/type";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useBorrowStore from "@/utils/zustand_states/borrow";
import { useToken } from "@/utils/contexts/token";
import { cn } from "@/lib/utils";

const DetailBook = () => {
  const { user } = useToken();
  const { addBook, cart } = useBorrowStore((state) => state);
  const params = useParams();
  const [data, setData] = useState<IBook>();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getDetailBook(params.id_book!);
      setData(result.payload);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  }

  function handleBorrow() {
    toast("Book has been added to cart");
    addBook(data!);
  }

  const isInCart = useMemo(() => {
    const checkCart = cart.find((item) => item.id === +params.id_book!);

    if (checkCart) return true;

    return false;
  }, [cart]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Card className="bg-neutral-100 text-black dark:bg-slate-900 dark:text-white border-slate-500 shadow-md shadow-gray-600 dark:shadow-none">
        <CardContent className="flex flex-col md:flex-row gap-4 pt-6">
          <div className="w-3/4">
            <img
              className="w-full aspect-[3/4] object-cover"
              src={data?.cover_image}
              alt={data?.title}
            />
          </div>
          <div className="flex flex-col gap-2 justify-center p-5 ">
            <div className="w-fit text-white hover:cursor-pointer">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <p className="font-bold text-3xl">{data?.title}</p>
            <p className="font-light">by {data?.author}</p>
            <p className="text-sm bg-white text-black rounded-full w-fit px-2">
              {data?.category}
            </p>

            <Separator className="my-3 bg-slate-700" />

            <p className="text-justify tracking-tight text-base">
              {data?.description}
            </p>

            <Separator className="my-3 bg-slate-700" />
            {user ? (
              <>
                <Button
                  className={cn(
                    "w-1/6 bg-green-600 hover:bg-green-700",
                    user?.role === "admin" && "hidden"
                  )}
                  onClick={() => handleBorrow()}
                  disabled={isInCart}
                >
                  {isInCart ? "In Cart" : "Borrow"}
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default DetailBook;

// import { useState, useEffect } from "react";
// import { toast } from "sonner";

// import { Card, CardContent } from "@/components/ui/card";
// import Layout from "@/components/layout";

// import { getDetailBook } from "@/utils/apis/books/api";
// import { IBook } from "@/utils/apis/books/type";
// import { Separator } from "@/components/ui/separator";

// const DetailBook = () => {
//   const [data, setData] = useState<IBook>();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   async function fetchData() {
//     try {
//       const result = await getDetailBook();
//       setData(result.payload.datas);
//     } catch (error) {
//       toast((error as Error).message.toString());
//     }
//   }

//   return (
//     <Layout>
//       <Card className="bg-slate-900 text-white border-slate-500">
//         <CardContent className="flex flex-col md:flex-row gap-4 pt-6 ">
//           <div className="w-3/4 ">
//             <img
//               className="w-full aspect-[3/4] object-cover"
//               src={data?.cover_image}
//               alt={data?.title}
//             />
//           </div>
//           <div className="flex flex-col gap-2 justify-center p-5 ">
//             <div className="w-fit text-white hover:cursor-pointer">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 className="w-5 h-5"
//               >
//                 <path
//                   fill-rule="evenodd"
//                   d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
//                   clip-rule="evenodd"
//                 />
//               </svg>
//             </div>
//             <p className="font-bold text-3xl">{data?.title}</p>
//             <p className="font-light">by {data?.author}</p>
//             <p className="text-sm bg-white text-black rounded-full w-fit px-2">
//               {data?.category}
//             </p>

//             <Separator className="my-3 bg-slate-700" />

//             <p className="text-justify tracking-tight text-base">
//               {data?.description}
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </Layout>
//   );
// };

// export default DetailBook;
