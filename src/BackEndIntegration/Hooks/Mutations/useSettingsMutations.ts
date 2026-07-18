import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '../../API/settingsService';
import { queryKeys } from '../Keys/Keys';

export const useUpdateSiteSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: Record<string, any>) => settingsService.updateSettings(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.all });
    },
  });
};
