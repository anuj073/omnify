import { NavBar } from "@/components/landing-page/navabar";
import { Screen } from "@/components/landing-page/screen";
export default function Home() {
  return (
    <Screen>
      <NavBar />
    </Screen>
    // <div className="w-full bg-foreground items-center  min-h-screen flex justify-center">
    //   <div>
    //     <p className=" text-md font-sans text-neutral-800 font-medium">
    //       Omnify were all came togther one place{" "}
    //     </p>
    //   </div>
    // </div>
  );
}
