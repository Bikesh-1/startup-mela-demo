import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/services/request.service";
import { SendRequestPayload } from "@/types/request";

export const useSendRequest = (groupCode: string) => {
  return useMutation({
    mutationFn: (data: SendRequestPayload) =>
      sendRequest(groupCode, data),
  });
};