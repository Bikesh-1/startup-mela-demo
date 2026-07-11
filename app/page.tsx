"use client"
import { useRouter } from "next/navigation";
import Navbar from "./component/navbar";


export default function Home() {
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* Dashed Grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.25) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-screen w-screen flex-col items-center justify-center">
        <Navbar />
        <p className="border border-[#4F47EA] font-black font-mono py-1 px-5 rounded-2xl">Smart Groups. Stronger Goals.</p>
        <h1 className="text-8xl font-mono font-black">The Future of <br /> Group Savings<span className="text-[#4F47EA]">.</span></h1>
        <p className="font-mono font-black">Build trusted savings groups, automate contributions, and achieve financial goals together.</p>
        <div className="flex items-center justify-center gap-4 font-mono mt-7">
          <button
            onClick={() => router.push("/signup")}
            className=" text-white bg-[#0a0a0a] px-2 py-1 rounded cursor-pointer border border-[#0a0a0a]">Get Started  </button>
          <button 
          className="text-black px-2 py-1 rounded border border-[#0a0a0a]">Learn More</button>
        </div>
      </div>
      
    </div>
  );
}