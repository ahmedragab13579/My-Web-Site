import type { ArticleStatus } from "../Types/Enums";
import type { ChangeStatusRequest } from "../Types/Request";
import type { ArticleDto, PagedResult } from "../Types/Response";
import { axiosClient } from "./Shared";

export const articleService = {
  getArticles: async (pageNumber = 1, pageSize = 10) => {
    const response = await axiosClient.get<PagedResult<ArticleDto>>('/article', {
      params: { pageNumber, pageSize },
    });
    return response.data;
  },

  getAdminArticles: async (pageNumber = 1, pageSize = 10, status?: ArticleStatus) => {
    const response = await axiosClient.get<PagedResult<ArticleDto>>('/article/admin', {
      params: { pageNumber, pageSize, status },
    });
    return response.data;
  },

  getArticleBySlug: async (slug: string) => {
    const response = await axiosClient.get<ArticleDto>(`/article/${slug}`);
    return response.data;
  },

  createArticle: async (command: Record<string, any>) => {
    const response = await axiosClient.post<number>('/article', command);
    return response.data;
  },

  updateArticle: async (id: number, command: Record<string, any>) => {
    await axiosClient.put(`/article/${id}`, {...command,id});
  },

  deleteArticle: async (id: number) => {
    await axiosClient.delete(`/article/${id}`);
  },

  changeArticleStatus: async (id: number, request: ChangeStatusRequest) => {
    await axiosClient.patch(`/article/${id}/status`, request);
  },

  likeArticle: async (id: number) => {
    await axiosClient.post(`/article/${id}/like`);
  },
};