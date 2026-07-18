import { useQuery } from '@tanstack/react-query';
import { articleService } from '../../API/articleService';
import { queryKeys } from '../Keys/Keys';
import type { ArticleStatus } from '../../Types/Enums';

export const useArticles = (pageNumber = 1, pageSize = 10) => {
  return useQuery({
    queryKey: queryKeys.articles.list(pageNumber, pageSize),
    queryFn: () => articleService.getArticles(pageNumber, pageSize),
    staleTime: 5 * 60 * 1000, 
  });
};

export const useAdminArticles = (pageNumber = 1, pageSize = 10, status?: ArticleStatus) => {
  return useQuery({
    queryKey: queryKeys.articles.adminList(pageNumber, pageSize, status),
    queryFn: () => articleService.getAdminArticles(pageNumber, pageSize, status),
  });
};

export const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.articles.details(slug),
    queryFn: () => articleService.getArticleBySlug(slug),
    enabled: !!slug, 
  });
};