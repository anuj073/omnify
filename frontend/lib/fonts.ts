import { Geist, Geist_Mono,} from "next/font/google";
import { cn } from  "./utils";




const FontMono=Geist_Mono({
  subsets:["latin"],
  variable:"--font-mono"
})

const FontSans=Geist({
  variable:"--font-sans",
   subsets:["latin"]
})

export const  fontVariables=cn(
   
    FontMono.variable,
    FontSans.variable
)