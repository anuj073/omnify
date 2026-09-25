import Link from "next/link";

import type { Metadata } from "next";
import { ArrowLeft, MoveLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you are looking for does not exist.",
};
export default function NotFound() {
  return (
    <div className=" w-full  min-h-screen mx-auto flex justify-center items-center ">
      <div className="py-6 px-4 flex flex-col gap-2 items-center">
        <p className="text-neutral-700 font-semibold font-sans text-md sm:text-2xl">
          We are working on it{" "}
        </p>
        <Link
          href="/"
          className="rounded-[9px] group flex gap-1 items-center px-2 py-1.5 cursor-pointer border-[1.5px] hover:bg-primary/70 duration-300 ease-in-out transition-all border-blue-400 font-sans text-[12px] font-semibold leading-none  text-center text-white bg-primary "
        >
          <MoveLeft className="size-4 stroke-3  duration-300  ease-in-out group-hover:-translate-x-0.5" />
          <span>Back to home</span>
        </Link>
      </div>
    </div>
  );
}
