import type { ReplyRequest } from "../Types/Request";
import type { ContactMessageDto, PagedResult } from "../Types/Response";
import { axiosClient } from "./Shared";

export const contactService = {
  submitMessage: async (command: Record<string, any>) => {
    await axiosClient.post('/contact', command);
  },

  getMessages: async (pageNumber = 1, pageSize = 10, isRead?: boolean) => {
    const response = await axiosClient.get<PagedResult<ContactMessageDto>>('/contact/messages', {
      params: { pageNumber, pageSize, isRead },
    });
    return response.data;
  },

  replyToMessage: async (id: number, request: ReplyRequest) => {
    await axiosClient.post(`/contact/messages/${id}/reply`, {request});
  },
};