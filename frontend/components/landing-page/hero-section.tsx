import Link from "next/link";

export const HeroSection = () => {
  return (
    <div className=" w-full px-2    py-12 sm:py-18">
      <div className="flex flex-row  py-8 sm:py-12 justify-center items-center ">
        <div className="text-left flex flex-col gap-2 w-full  p-1">
          <div className=" flex gap-1.5 flex-col  p-0">
            <h1 className=" text-[20px]  flex flex-col  gap-0 tracking-tight  leading-none sm:text-3xl lg:text-4xl   font-sans font-semibold  text-neutral-950 ">
              <span className="dark:text-whit text-neutral-900">
                Connect Everything.
              </span>
              <span className="text-primary">Lose Nothing.</span>
            </h1>
            <p className=" dark:text-neutral-700 text-neutral-100 md:hidden max-w-2xl font-sans  tracking-tight w-full  text-sm sm:text-[18px] ">
              Bring all your apps, tools, and workflows together in one seamless
              workspace, without the hassle of switching between them.
            </p>
          </div>

          <Link
            href="/register"
            className="rounded-md w-fit   border-[1.5px] border-primary/70   px-2.5 py-1  ms:text-[14px] text-[12px] font-medium  shadow-primary/40 hover:text-neutral-50
            font-sans bg-primary/90 text-foreground  
             hover:opacity-80 transition-all duration-300"
          >
            Bring It Together
          </Link>
        </div>
        {/*Right side */}
        <div className=" p-1  hidden md:block text-left tracking-tighter leading-normal font-sans ">
          <p className="text-neutral-700  font-sans  text-[18px] ">
            Bring all your apps, tools, and workflows together in one seamless
            workspace, without the hassle of switching between them.
          </p>
        </div>
      </div>
    </div>
  );
};
