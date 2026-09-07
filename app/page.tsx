import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-6 py-32 px-16 bg-white dark:bg-black">
        <Image
          src="/medex.webp"
          alt="MedEx"
          width={250}
          height={57}
          priority
        />
      </main>
    </div>
  );
}
