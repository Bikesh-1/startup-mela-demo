"use client"
import { useUserDetails } from '@/hooks/useUserDetails';
import { Clipboard } from 'lucide-react';
import Image from 'next/image';

export default function Welcomemsg() {

    const {
        data: userdetails,
        isPending,
        isError,
        error
    } = useUserDetails();

    if (isPending) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>{error.message}</p>
    }



    return (

        <div className="text-white">
            {userdetails ? (
                <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-linear-to-r from-[#0B0B14] to-[#131323] px-6 py-5 shadow-xl w-[40vw] max-w-4xl">
                    <div className="absolute -right-16 -top-12 h-64 w-64 rounded-full bg-purple-700/20 blur-2xl"></div>
                    <div className="relative z-10">
                        <p className="text-sm text-gray-400">
                            Welcome back,
                        </p>

                        <h2 className="mt-1 text-2xl font-bold tracking-wide">
                            {userdetails.name}{" "}
                            <span className="inline-block animate-wave"></span>
                        </h2>

                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                            <span>Customer ID:</span>

                            <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-white">
                                {userdetails.user.coustumerId}
                            </span>

                            <button
                                onClick={() =>
                                    navigator.clipboard.writeText(userdetails.user.coustumerId)
                                }
                                className="rounded-md p-1 hover:bg-white/10 transition text-white cursor-pointer"
                            >
                                <Clipboard size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="relative z-10 hidden md:block">
                        <Image
                            src="/wallet.png"
                            alt="logo"
                            width={80}
                            height={80}
                        />
                    </div>
                    <div className="absolute right-40 top-8 h-2 w-2 rounded-full bg-purple-400"></div>
                    <div className="absolute right-24 bottom-10 h-1.5 w-1.5 rounded-full bg-violet-300"></div>
                    <div className="absolute right-56 bottom-16 h-1 w-1 rounded-full bg-white"></div>
                </div>
            ) : (
                <p className="text-gray-400">Loading...</p>
            )}
        </div>
    )
}