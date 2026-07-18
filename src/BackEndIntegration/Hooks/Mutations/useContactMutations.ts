import { useMutation, useQueryClient } from '@tanstack/react-query';
import { contactService } from '../../API/contactService';
import { queryKeys } from '../Keys/Keys';
import type { ReplyRequest } from '../../Types/Request';

export const useSubmitContactMessage = () => {
  return useMutation({
    mutationFn: (command: Record<string, any>) => contactService.submitMessage(command),
  });
};

export const useReplyToMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: ReplyRequest }) => 
      contactService.replyToMessage(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contact.all });
    },
  });
};