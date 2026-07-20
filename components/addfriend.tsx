"use client"
import { useFriendList } from "@/hooks/useFriendList";
import { createFriend } from "@/services/friend.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { error } from "next/dist/build/output/log";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Addfriend() {

    const [coustumerId, setcoustumerId] = useState("");
    const [loading, setLoading] = useState(false);

    const {data: FriendList} = useFriendList();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createFriend,

        onSuccess:(data) =>{
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey:["friend"]
            })
        },

        onError:(error:Error) =>{
            toast.error(error.message)
        }

    })

    const handleaddingFriend = (e: React.FormEvent) => {
        e.preventDefault();

        mutation.mutate({
            coustumerId
        })
    }


    return (
        <div className="bg-black w-auto h-20 flex items-center justify-center flex-col p-4 rounded-2xl">
            <form className="text-sm flex items-center justify-center gap-4" onSubmit={handleaddingFriend}>
                <input
                    placeholder="Enter your friend usercode"
                    className="bg-[#0a0a0a] border w-80 py-3 px-4 rounded-xl text-[#dadada]"
                    value={coustumerId} type="text" onChange={(e) => setcoustumerId(e.target.value)} />
                <button
                    disabled={mutation.isPending}
                    className=" text-white bg-[#4F47EA] px-3 py-2 rounded-lg text-[15px] font-medium cursor-pointer flex items-center justify-center gap-2"
                    type="submit">
                        {mutation.isPending ? "Adding..." : "+ Add friend"} 
                        </button>
            </form>
        </div>
    )
}