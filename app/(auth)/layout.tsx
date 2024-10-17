import Image from "next/image";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`relative h-screen w-full`}
    >
      <div className="absolute h-screen w-full">
        <Image
          alt="background"
          fill
          className="size-full"
          src={'/images/bg-img.png'}
        />
      </div>
      {children}
    </main>
  );
}
