import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../../API/projectService';
import { queryKeys } from '../Keys/Keys';

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: Record<string, any>) => projectService.createProject(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, command }: { id: number; command: Record<string, any> }) => 
      projectService.updateProject(id, command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => projectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
    },
  });
};

export const useLikeProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => projectService.likeProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
    },
  });
};

export const useViewProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => projectService.viewProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
    },
  });
};