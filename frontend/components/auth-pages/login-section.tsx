"use client";
import { Card } from "@/components/ui/card";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  //  TooglePassword
  const PasswordToogle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Card className=" mx-auto w-full p-0 bg-transparent sm:border-[1.5px] border-neutral-300  rounded sm:rounded-[14px]">
      <div className="  grid grid-cols-1 sm:grid-cols-2 gap-1 ">
        {/*Left side */}
        <div className="  px-4 py-6 hidden sm:block bg-foreground">
          <div className="flex items-center text-left tracking-tight">
            <div className="relative  flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md ">
              <Image
                src="/images/logo.png"
                alt="Omnify"
                fill
                priority
                sizes="20"
                className="object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            {/* Wordmark */}
            <h1 className="text-[16px] text-neutral-900 font-sans font-semibold tracking-[-0.03em] ">
              Ominfy
            </h1>
          </div>
          <div className="px-0 py-10">
            <span className="text-md font-sans font-medium text-primary">
              Your world, connected
            </span>
            <h1 className=" mt-1.5 text-neutral-900 flex flex-col leading-none text-4xl font-sans font-semibold tracking-tighter">
              All your apps,tools,{" "}
              <span className="text-primary text-3xl  font-sans font-semibold">
                in one place
              </span>
            </h1>
            <p className="text-sm font-sans text-neutral-600 max-w-sm ">
              Omnify brings everything you need together so you can focus on
              what truly matters.
            </p>
          </div>
        </div>
        {/*Right  side */}

        <div className="py-6 px-2 sm:px-8  bg-white">
          <div className="flex items-center text-left tracking-tight py-6">
            <div className="relative  flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md ">
              <Image
                src="/images/logo.png"
                alt="Omnify"
                fill
                priority
                sizes="20"
                className="object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            {/* Wordmark */}
            <h1 className="text-[20px] text-neutral-900 font-sans font-semibold tracking-[-0.03em] ">
              Ominfy
            </h1>
          </div>
          <div className=" ">
            <h1 className=" font-sans font-semibold text-left text-neutral-900 text-xl sm:text-3xl tracking-tight">
              Welcome back
            </h1>
            <p className=" text-[12px] sm:text-sm font-sans  text-neutral-600 leading-normal tracking-tight text-left">
              Sgin in to your account and continue building with Omnify
            </p>
          </div>
          {/*Form Section */}
          <div className=" py-6 flex flex-col gap-4  ">
            <div className="  flex flex-col gap-1 p-0 ">
              <h1 className=" px-0.5  text-base font-medium font-sans text-left text-neutral-600">
                Email address
              </h1>
              <div className="relative w-full">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="email"
                  placeholder="yourexample.com"
                  className=" h-10   w-full font-sans rounded-[6px]  border   border-neutral-200  bg-neutral-50  pl-10  pr-3  text-sm  text-neutral-600    
                outline-none   transition placeholder:text-muted-foreground  focus:border-primary focus:ring-2   focus:ring-primary/20 "
                />
              </div>
            </div>
            <div className="  flex flex-col gap-1  mt-1">
              <h1 className=" px-0.5  text-base font-medium font-sans text-left text-neutral-600">
                Password
              </h1>
              <div className="relative w-full">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className=" h-10   w-full font-sans rounded-[6px]  border   border-neutral-200  bg-neutral-50  pl-10  pr-3  text-sm  text-neutral-600    
                outline-none   transition placeholder:text-muted-foreground  focus:border-primary focus:ring-2   focus:ring-primary/20 "
                />
                <button onClick={PasswordToogle} type="button" className="">
                  {showPassword ? (
                    <Eye
                      size={18}
                      className=" absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                    />
                  ) : (
                    <EyeClosed
                      size={18}
                      className=" absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 mt-2">
              <div className=" w-full  flex justify-end items-center">
                <Link
                  href="/forgot-password"
                  className="text-primary font-medium font-sans hover:underline"
                >
                  Forgot password
                </Link>
              </div>
              <button className="w-full text-balance  hover:bg-primary/80  transition-all  duration-300 ease-in-out py-2 cursor-pointer text-foreground bg-primary rounded-[6px] text-center font-sans font-medium">
                Sigin in
              </button>
            </div>
            <div className="my-2 flex items-center gap-3">
              <div className="h-px flex-1  bg-neutral-500 " />

              <span className="text-xs font-medium text-muted-foreground">
                OR
              </span>

              <div className="h-px flex-1  bg-neutral-500" />
            </div>
            <div>
              <button className="w-full  flex  gap-1 justify-center  items-center text-balance  text-neutral-600 border-[1.5px] bg-neutral-50 border-neutral-200 transition-all  duration-300 ease-in-out py-1.5 cursor-pointer   rounded-[6px] text-center font-sans font-medium">
                <GoogleIcon /> Continue with Google
              </button>
            </div>
            <div className=" flex gap-2  justify-center items-center w-full">
              <p className=" text-sm text-neutral-500 font-sans tracking-tighter">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary hover:underline font-medium font-sans "
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

function GoogleIcon({ size = 14, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <path
        fill="#4285F4"
        d="M23.766 12.276c0-.818-.074-1.606-.212-2.364H12.24v4.474h6.482a5.54 5.54 0 0 1-2.402 3.632v3.017h3.887c2.276-2.098 3.56-5.187 3.56-8.76z"
      />
      <path
        fill="#34A853"
        d="M12.24 24c3.24 0 5.956-1.075 7.943-2.905l-3.887-3.017c-1.077.722-2.454 1.147-4.056 1.147-3.12 0-5.76-2.107-6.702-4.938H1.517v3.113C3.492 21.303 7.562 24 12.24 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.538 14.287a7.216 7.216 0 0 1-.377-2.287c0-.793.136-1.564.377-2.287V6.6H1.517A11.99 11.99 0 0 0 .24 12c0 1.936.464 3.767 1.277 5.4l4.021-3.113z"
      />
      <path
        fill="#EA4335"
        d="M12.24 4.773c1.762 0 3.344.606 4.588 1.796l3.442-3.442C18.19 1.19 15.475 0 12.24 0 7.562 0 3.492 2.697 1.517 6.6l4.021 3.113c.942-2.831 3.582-4.94 6.702-4.94z"
      />
    </svg>
  );
}

export default GoogleIcon;
