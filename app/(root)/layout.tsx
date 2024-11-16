import LeftSidebar from "@/components/LeftSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster"
import PodcastPlayer from "@/components/PodcastPlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex relative flex-col ">
      <main
        className={`flex relative bg-black-3`}
      >
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14" >
          <div className=" mx-auto flex w-full max-w-5xl flex-col max-sm:px-4 ">
            <div className="flex h-16 items-center justify-between md:hidden">
              <Image
                alt="menu icon"
                src="/icons/logo.svg"
                width={30}
                height={30}
              >
              </Image>
              <MobileNav />
            </div>
            <div className="flex flex-col md:pb-14 mb-5">
              <Toaster />
              {children}
            </div>
          </div>
        </section>
        <RightSidebar />
      </main>
      <PodcastPlayer/>
    </div>
  );
}
