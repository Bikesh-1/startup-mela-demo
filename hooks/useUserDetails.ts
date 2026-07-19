"use client"

import { getUserDetails } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useUserDetails(){
    return useQuery({
        queryKey:["profile"],
        queryFn: getUserDetails,
        staleTime:1000*60*5,
    })
}