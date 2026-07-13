"use client"
import { useEffect, useState } from "react";

type FriendList = {
    receiver: {
        coustumerId: string;
        userdetails: {
            name: string;
        };
    };
};

export default function FriendList() {
    const [FriendList, setFriendList] = useState<FriendList[]>([]);
    useEffect(() => {
        const getFriendList = async () => {
            try {
                const res = await fetch("/api/addfriends");

                const data = await res.json();
                if (res.ok) {
                    setFriendList(data.friendlist)
                } else {
                    console.log(data.message)
                }
            } catch (error) {
                console.log(error)
            }
        };
        getFriendList()
    }, [])
    return (
        <div className="w-80 rounded-2xl bg-black border border-zinc-800 p-5 font-mono shadow-lg shadow-[#4F47EA]/10">
    <h2 className="text-2xl font-black text-[#dadada] border-b border-zinc-800 pb-3 mb-4">
        Friend List
    </h2>

    <div className="space-y-3">
        {FriendList.map((friend) => (
            <div
                key={friend.receiver.coustumerId}
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 transition-all duration-300 hover:border-[#4F47EA] hover:bg-zinc-900"
            >
                <div>
                    <p className="text-white font-semibold text-sm">
                        {friend.receiver.userdetails.name}
                    </p>

                    <p className="text-xs text-zinc-400 mt-1">
                        {friend.receiver.coustumerId}
                    </p>
                </div>

                <div className="h-10 w-10 rounded-full bg-[#4F47EA]/15 border border-[#4F47EA]/40 flex items-center justify-center text-[#dadada] font-bold">
                    {friend.receiver.userdetails.name.charAt(0).toUpperCase()}
                </div>
            </div>
        ))}
    </div>
</div>
    )
}