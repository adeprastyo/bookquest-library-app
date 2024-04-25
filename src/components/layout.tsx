import { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";

import { cn } from "@/lib/utils";
import Navbar from "./navbar";
import Footer from "./footer";

interface Props {
  children: ReactNode;
  centerY?: boolean;
  centerX?: boolean;
}

const Layout = (props: Props) => {
  const { children, centerX, centerY } = props;

  return (
    <div className="w-full  h-dvh  bg-neutral-50  dark:bg-slate-950 overflow-auto flex flex-col text-white">
      <Navbar />
      <div
        className={cn(
          "container grow py-4 px-8 flex flex-col",
          centerX && "items-center",
          centerY && "justify-center"
        )}
      >
        {children}
      </div>
      <Toaster />

      <Footer />
    </div>
  );
};

export default Layout;
