import { useQuery } from "@tanstack/react-query";
import { getRequestDetails } from "@/services/request.service";

export const useRequestDetails = (
  groupCode: string,
  requestId: string
) => {
  return useQuery({
    queryKey: ["request", groupCode, requestId],
    queryFn: () => getRequestDetails(groupCode, requestId),
    enabled: !!groupCode && !!requestId,
  });
};