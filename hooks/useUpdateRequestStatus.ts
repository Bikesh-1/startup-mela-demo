import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRequestStatus } from "@/services/request.service";
import { UpdateRequestPayload } from "@/types/request";

export const useUpdateRequestStatus = (
  groupCode: string,
  requestId: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateRequestPayload) =>
      updateRequestStatus(groupCode, requestId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requests", groupCode],
      });

      queryClient.invalidateQueries({
        queryKey: ["request", groupCode, requestId],
      });
    },
  });
};