"use client"

import { getGroupList } from "@/services/group.service";
import { useQuery } from "@tanstack/react-query";

export function useGroupDetails(){
    return useQuery({
        queryKey:["group"],
        queryFn:getGroupList,
        staleTime:1000*60*5
    })
}