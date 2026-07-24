"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar(){
    const router = useRouter();
    return(
        <div className="absolute top-4 left-1/2 w-[90%] h-10  -translate-x-1/2 flex items-center justify-between">
            <div>
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={150}
                    height={150}
                />
            </div>
            <div className="flex items-center justify-center text-white bg-black px-8 py-1 gap-12 
            rounded-xl h-10 text-[15px] font-medium">
                <p>Home</p>
                <p>About</p>
                <p>How its work?</p>
                <p>Contact</p>
            </div>
            <div className="flex items-center justify-center gap-4">
                <button onClick={() => router.push("/signin")} className=" text-white bg-[#000000] px-3 py-2 rounded-lg text-[15px] font-medium cursor-pointer flex items-center justify-center gap-2">Login</button>
                <button onClick={() => router.push("/signup")} className="text-black border border-[#dadada] bg-white px-2 py-2 rounded-lg text-[15px] font-medium cursor-pointer">Create{" "} account</button>
            </div>
        </div>
    )
}