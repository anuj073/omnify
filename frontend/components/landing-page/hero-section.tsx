import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <div className=" w-full px-2    py-12 sm:py-18">
      <div className="flex flex-col sm:flex-row  py-8 sm:py-12 justify-center items-center ">
        {/*Lef-side */}
        <div className="text-left flex flex-col gap-2 w-full  p-1">
          <div className=" flex gap-1.5 flex-col  p-0">
            <h1 className=" text-[20px]  flex flex-col  gap-0 tracking-tight  leading-none  sm:text-[32px] lg:text-5xl   font-sans font-semibold  text-neutral-950 ">
              <span className="dark:text-whit font-bold text-neutral-900">
                Connect Everything.
              </span>
              <span className="text-primary font-bold">Lose Nothing.</span>
            </h1>
            <p className=" text-neutral-700  max-w-lg font-sans  tracking-tighter w-full  leading-normal  text-[12px] sm:text-[14px] ">
              Bring all your apps, tools, and workflows together in one seamless
              workspace, without the hassle of switching between them.
            </p>
          </div>

          <Link
            href="/register"
            className="rounded-md w-fit   border-[1.5px] border-primary/70   px-2.5 py-1  ms:text-[14px] text-[12px] font-medium  shadow-primary/40 hover:text-neutral-50
            font-sans bg-primary/90 text-secondary  
             hover:opacity-80 transition-all duration-300"
          >
            Bring It Together
          </Link>
        </div>
        {/*Right side */}
        <div className="w-full p-1 text-left tracking-tighter leading-normal font-sans">
          <div className="relative mx-auto mt-6 w-full max-w-3xl aspect-video overflow-hidden">
            <Image
              src="/images/main-image.png"
              alt="Omnify dashboard"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
