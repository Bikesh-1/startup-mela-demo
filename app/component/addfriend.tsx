"use client"
import React, { useState } from "react";
import { toast } from "sonner";

export default function Addfriend() {

    const [coustumerId, setcoustumerId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleaddingFriend = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/addfriends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    coustumerId
                }),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(data.message)
            }
            else {
                toast.error(data.error)
            }
        } catch {
            toast.error("An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-black w-auto h-20 flex items-center justify-center flex-col p-4 rounded-2xl">
            <form className="text-sm flex items-center justify-center gap-4" onSubmit={handleaddingFriend}>
                <input
                    placeholder="Enter your friend usercode"
                    className="bg-[#0a0a0a] border w-80 py-3 px-4 rounded-xl text-[#dadada]"
                    value={coustumerId} type="text" onChange={(e) => setcoustumerId(e.target.value)} />
                <button
                    disabled={loading}
                    className=" text-white bg-[#4F47EA] px-4 py-3 rounded cursor-pointer"
                    type="submit">{loading ? "Adding..." : "+ Add friend"} </button>
            </form>
        </div>
    )
}