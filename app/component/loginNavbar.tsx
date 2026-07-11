"use client"
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function LoginNavbar(){
    return(
        <div className=" w-full p-4 mt-5 h-10 font-mono flex items-center justify-between">
            <div>
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={150}
                    height={150}
                />
            </div>
            <div className="flex items-center justify-center gap-4">
                <button  className="text-black px-2 py-1 rounded border border-[#0a0a0a]">+ Add your details</button>
                <button onClick={() => signOut({callbackUrl:"/signin"})}  className=" text-white bg-[#0a0a0a] px-2 py-1 rounded cursor-pointer">Logout</button>
            </div>
        </div>
    )
}