import { NavbarLinks } from "@/types/navgation-types";
import Image from "next/image";
import Link from "next/link";

export const NavBar = () => {
  const NavLinks: NavbarLinks[] = [
    {
      name: "How it works",
      href: "#how-it-works",
    },
    {
      name: "Integrations",
      href: "#integrations",
    },
    {
      name: "Features",
      href: "#features",
    },
    {
      name: "Pricing",
      href: "#pricing",
    },
  ];

  return (
    <header className="w-full ">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex w-fit gap-1 items-center "
          aria-label="Omnify"
        >
          {/* Logo mark */}
          {/* <div className="relative  flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md ">
            <Image
              src="/images/logo.png"
              alt="Omnify"
              fill
              priority
              className="object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </div> */}

          {/* Wordmark */}
          <p className="text-[16px] text-neutral-900 font-semibold tracking-[-0.03em] ">
            Omin
            <span className="text-primary">fy</span>
          </p>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-10  md:flex ">
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[14px] text-neutral-700 font-medium   font-sans  transition-colors hover:text-neutral-500"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5 ">
          <Link
            href="/signup"
            className="rounded-md border-[1.5px] border-blue-400  px-2.5 py-1 text-[12px] font-medium  shadow-primary/50 hover:text-neutral-100
            font-sans bg-primary/90 text-foreground  
             hover:opacity-90 transition-all duration-300"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
};
