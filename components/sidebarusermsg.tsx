"use client"
import { LogOut } from 'lucide-react';
import { useUserDetails } from "@/hooks/useUserDetails";

export default function Sidebarmsg() {
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
        <div>
            {userdetails ? (
                <div className="border-t border-[#dadada] bg-black p-4 flex items-center justify-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#4F47EA]/15 border border-white flex items-center justify-center text-[#dadada] font-bold">
                        {userdetails.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-white">
                            <span>{userdetails.name}</span>
                        </h2>

                        <p className="text-sm text-gray-400">
                            <span className="font-mono text-white">
                                {userdetails.user.coustumerId}
                            </span>
                        </p>
                    </div>
                    <button className="text-white cursor-pointer">
                        <LogOut />
                    </button>
                    
                </div>
            ) : (
                <p className="text-gray-400">Loading...</p>
            )}
        </div>
    )
}