import Image from "next/image";

export default function Navbar(){
    return(
        <div className="absolute top-4 left-1/2 w-[90%] h-10  -translate-x-1/2 font-mono flex items-center justify-between">
            <div>
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={150}
                    height={150}
                />
            </div>
            <div className="flex items-center justify-center text-white bg-[#0a0a0a] px-8 py-1 gap-12 rounded-full h-10 ">
                <p>Home</p>
                <p>About</p>
                <p>How its work?</p>
                <p>Contact</p>
            </div>
            <div className="flex items-center justify-center gap-4">
                <button className=" text-white bg-[#0a0a0a] px-2 py-1 rounded cursor-pointer">Login</button>
                <button className="text-black px-2 py-1 rounded border border-[#0a0a0a]">Create account</button>
            </div>
        </div>
    )
}