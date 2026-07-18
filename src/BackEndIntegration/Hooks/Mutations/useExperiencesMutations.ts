import { useMutation, useQueryClient } from '@tanstack/react-query';
import { experienceService } from '../../API/experienceService';
import { queryKeys } from '../Keys/Keys';

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: Record<string, any>) => experienceService.createExperience(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.experiences.all });
    },
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, command }: { id: number; command: Record<string, any> }) => 
      experienceService.updateExperience(id, command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.experiences.all });
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => experienceService.deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.experiences.all });
    },
  });
};