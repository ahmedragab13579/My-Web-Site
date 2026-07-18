import { useMutation, useQueryClient } from '@tanstack/react-query';
import { articleService } from '../../API/articleService';
import { queryKeys } from '../Keys/Keys';
import type { ChangeStatusRequest } from '../../Types/Request';

export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: Record<string, any>) => articleService.createArticle(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
    },
  });
};

// 5. تعديل مقال
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, command }: { id: number; command: Record<string, any> }) => 
      articleService.updateArticle(id, command),
    onSuccess: () => {
      // تحديث القوائم وتحديث المقال نفسه في الكاش
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
    },
  });
};

// 6. تغيير حالة المقال (نشر / مسودة / أرشفة)
export const useChangeArticleStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: ChangeStatusRequest }) => 
      articleService.changeArticleStatus(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
    },
  });
};

// 7. حذف مقال
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => articleService.deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
    },
  });
};

// 8. الإعجاب بمقال
export const useLikeArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => articleService.likeArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.all });
    },
  });
};