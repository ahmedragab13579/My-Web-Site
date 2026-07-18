import { useMutation, useQueryClient } from '@tanstack/react-query';
import { skillService } from '../../API/skillService';
import { queryKeys } from '../Keys/Keys';

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: Record<string, any>) => skillService.createSkill(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.skills.all });
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, command }: { id: number; command: Record<string, any> }) => 
      skillService.updateSkill(id, command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.skills.all });
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => skillService.deleteSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.skills.all });
    },
  });
};