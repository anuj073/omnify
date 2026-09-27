"use client";
import { Card } from "@/components/ui/card";
import { Eye, EyeClosed, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [fullname, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  //  TooglePassword
  const PasswordToogle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Card className=" mx-auto w-full p-0 bg-transparent   rounded sm:rounded-[14px]">
      <div className="  grid grid-cols-1 sm:grid-cols-2 gap-1 ">
        {/*Left side */}
        {/* Left side */}
        <div className="hidden sm:flex flex-col relative overflow-hidden px-6 py-6">
          {/* Logo */}
          <div className="flex items-center gap-1 tracking-tight">
            <div className="flex h-5.5 w-5.5 shrink-0 items-center justify-center overflow-hidden rounded-[7px] border border-primary bg-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-background"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10s-10-4.477-10-10s4.477-10 10-10m0 5a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0v-4a3 3 0 0 0-3-3m0 2a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1" />
              </svg>
            </div>

            <h1 className="text-[16px] font-semibold tracking-[-0.03em] text-neutral-900">
              Omnify
            </h1>
          </div>

          {/* Text */}
          <div className="pt-10">
            <h1 className="mt-1.5 flex flex-col text-4xl font-semibold font-sans leading-none tracking-tighter text-neutral-900">
              Connect everything
              <span className="text-3xl font-semibold text-primary">
                Lose nothing
              </span>
            </h1>

            <p className="mt-4 max-w-sm text-sm text-neutral-600 font-sans">
              One workspace for your application conversation,calendar and
              workkflows.
            </p>
          </div>

          {/* Image */}
          <div className="relative mt-6 min-h-[280px] flex-1 overflow-hidden">
            <Image
              src="/images/main-image.png"
              alt="Omnify dashboard"
              fill
              priority
              sizes="(max-width: 1024px) 50vw, 600px"
              className="object-contain object-center"
            />
          </div>
          <div>
            <p className="text-[10px] font-sans font-medium text-neutral-600">
              @2026 Omnify
            </p>
          </div>
        </div>

        {/*Right  side */}
        <div className="py-6 px-2 sm:px-8  bg-white">
          <div className="flex items-center gap-1  text-left tracking-tight py-6">
            <div className="   flex h-5.5 w-5.5 rounded-[7px] bg-primary  border-primary border shrink-0 items-center justify-center overflow-hidden  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="icon icon-tabler  icons-tabler-filled icon-tabler-circle-letter-o text-background"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10m0 5a3 3 0 0 0 -3 3v4a3 3 0 0 0 6 0v-4a3 3 0 0 0 -3 -3m0 2a1 1 0 0 1 1 1v4a1 1 0 0 1 -2 0v-4a1 1 0 0 1 1 -1" />
              </svg>
            </div>
            {/* Wordmark */}
            <h1 className="text-[20px] text-neutral-900 font-sans font-semibold tracking-[-0.03em] ">
              Ominfy
            </h1>
          </div>
          <div className=" ">
            <h1 className=" font-sans font-semibold text-left text-neutral-900 text-xl sm:text-3xl tracking-tight">
              Create your account
            </h1>
            <p className=" text-[12px] sm:text-sm font-sans  text-neutral-600 leading-normal tracking-tight text-left">
              Start bringing everything togther.
            </p>
          </div>
          {/*Form Section */}
          <div className=" py-6 flex flex-col gap-4  ">
            <div className="  flex flex-col gap-1 p-0 ">
              <h1 className=" px-0.5  text-sm font-medium font-sans text-left text-neutral-600">
                Full Name
              </h1>
              <div className="relative w-full">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="email"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className=" h-10   w-full font-sans rounded-[6px]  border   border-neutral-200  bg-neutral-50  pl-10  pr-3  text-sm  text-neutral-600    
                outline-none   transition placeholder:text-muted-foreground  focus:border-primary focus:ring-2   focus:ring-primary/20 "
                />
              </div>
            </div>
            <div className="  flex flex-col gap-1 p-0 ">
              <h1 className=" px-0.5  text-sm font-medium font-sans text-left text-neutral-600">
                Email address
              </h1>
              <div className="relative w-full">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourexample.com"
                  className=" h-10   w-full font-sans rounded-[6px]  border   border-neutral-200  bg-neutral-50  pl-10  pr-3  text-sm  text-neutral-600    
                outline-none   transition placeholder:text-muted-foreground  focus:border-primary focus:ring-2   focus:ring-primary/20 "
                />
              </div>
            </div>
            <div className="  flex flex-col gap-1  mt-1">
              <h1 className=" px-0.5  text-sm font-medium font-sans text-left text-neutral-600">
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
              <button className="w-full text-balance  hover:bg-primary/80  transition-all  duration-300 ease-in-out py-2 cursor-pointer text-secondary bg-primary rounded-[6px] text-center font-sans font-medium">
                Create account
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
                Already have a have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline font-medium font-sans "
                >
                  Sign in
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
