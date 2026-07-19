"use client"

import { getFriendList } from "@/services/friend.service";
import { useQuery } from "@tanstack/react-query";


export function useFriendList(){
    return useQuery({
        queryKey:["friend"],
        queryFn:getFriendList,
        staleTime:5000,
    })
}