import { useQuery } from '@tanstack/react-query';
import { experienceService } from '../../API/experienceService';
import { queryKeys } from '../Keys/Keys';

export const useExperiences = () => {
  return useQuery({
    queryKey: queryKeys.experiences.all,
    queryFn: () => experienceService.getExperiences(),
    staleTime: 5 * 60 * 1000, 
  });
};