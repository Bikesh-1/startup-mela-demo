"use client"

import { useEffect, useState } from "react";

type UserDetails = {
    name: string;
    user: {
        coustumerId: string;
    };
};

export default function Welcomemsg() {

    const [userdetails, setUserdetails] = useState<UserDetails | null>(null);


    useEffect(() => {
        const getUserdetails = async () => {
            try {
                const res = await fetch("/api/userdetails");

                const data = await res.json();
                if (res.ok) {
                    setUserdetails(data.userDetails)
                } else {
                    console.log(data.message)
                }
            } catch (error) {
                console.log(error)
            }
        };
        getUserdetails();
    }, [])

    return (
        <div className="font-mono">
            {userdetails ? (
                <div className="w-80 rounded-lg border border-gray-800 bg-black p-4 ">
                    <h2 className="text-xl font-bold text-white">
                        Welcome, <span className="text-[#dadada]">{userdetails.name}</span>
                    </h2>

                    <p className="text-sm text-gray-400">
                        Customer ID:{" "}
                        <span className="font-mono text-white">
                            {userdetails.user.coustumerId}
                        </span>
                    </p>
                </div>
            ) : (
                <p className="text-gray-400">Loading...</p>
            )}
        </div>
    )
}