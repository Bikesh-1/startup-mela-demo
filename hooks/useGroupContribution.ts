"use client"

import { getContribution, getContributionGroupList } from "@/services/contribution.service";
import { useQuery } from "@tanstack/react-query";

export function useGroupContribution(groupCode:string){
    return useQuery({
        queryKey:["group",groupCode],
        queryFn: () => getContributionGroupList(groupCode),
        enabled: !!groupCode,
        staleTime: 1000 * 60 * 5,
    })
}

export function useContributionDetail(groupCode:string){
    return useQuery({
        queryKey:["contribution",groupCode],
        queryFn: () => getContribution(groupCode),
        enabled: !!groupCode,
        staleTime: 1000 * 60 * 5,
    })
}