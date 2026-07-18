import { useQuery } from '@tanstack/react-query';
import { settingsService } from '../../API/settingsService';
import { queryKeys } from '../Keys/Keys';

export const useSiteSettings = () => {
  return useQuery({
    queryKey: queryKeys.settings.all,
    queryFn: () => settingsService.getSettings(),
    staleTime: Infinity,
  });
};
