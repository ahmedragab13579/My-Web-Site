import { useQuery } from '@tanstack/react-query';
import { contactService } from '../../API/contactService';
import { queryKeys } from '../Keys/Keys';

export const useContactMessages = (pageNumber = 1, pageSize = 10, isRead?: boolean) => {
  return useQuery({
    queryKey: queryKeys.contact.list({ pageNumber, pageSize, isRead }),
    queryFn: () => contactService.getMessages(pageNumber, pageSize, isRead),
    staleTime: 5 * 60 * 1000, 
  });
};