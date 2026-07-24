"use client"
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";


export default function Home() {
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      <div className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px),linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `repeating-linear-gradient(to right,black 0px,black 3px,transparent 3px,transparent 8px),repeating-linear-gradient(to bottom,black 0px,black 3px,transparent 3px,transparent 8px)`,
          WebkitMaskImage: `repeating-linear-gradient(to right,black 0px,black 3px,transparent 3px,transparent 8px),repeating-linear-gradient(to bottom,black 0px,black 3px,transparent 3px,transparent 8px)`,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-screen w-screen flex-col items-center justify-center gap-4">
        <Navbar />
        <p className="border border-[#000000] bg-white font-medium py-1 px-5 rounded-2xl">Smart Groups. Stronger Goals.</p>
        <h1 className="text-8xl font-bold">The Future of <br /> Group Savings<span className="text-[#4F47EA]">.</span></h1>
        <p>Build trusted savings groups, automate contributions, and achieve financial goals together.</p>
        <div className="flex items-center justify-center gap-4 mt-7">
          <button
            onClick={() => router.push("/signup")}
            className=" text-black border border-[#dadada] bg-white px-3 py-2 rounded-lg text-[15px] font-medium cursor-pointer">Get Started  </button>
          <button 
          className="text-white bg-[#000000] px-3 py-2 rounded-lg text-[15px] font-medium cursor-pointer flex items-center justify-center gap-2">Learn More</button>
        </div>
      </div>
      
    </div>
  );
}