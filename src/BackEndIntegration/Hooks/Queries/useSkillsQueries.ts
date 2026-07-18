import { useQuery } from '@tanstack/react-query';
import { skillService } from '../../API/skillService';
import { queryKeys } from '../Keys/Keys';
import type { SkillCategory } from '../../Types/Enums';

export const useSkills = (category?: SkillCategory) => {
  return useQuery({
    queryKey: queryKeys.skills.list(category),
    queryFn: () => skillService.getSkills(category),
    staleTime: 10 * 60 * 1000,
  });
};