"use client";

import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/services/message.service";

export function useMessage(groupCode: string) {

    return useQuery({
        queryKey: ["messages", groupCode],
        queryFn: () => getMessages(groupCode),
        enabled: !!groupCode,
        staleTime: Infinity,
    });

}