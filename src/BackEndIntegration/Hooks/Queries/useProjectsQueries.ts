import { useQuery } from '@tanstack/react-query';
import { projectService } from '../../API/projectService';
import { queryKeys } from '../Keys/Keys';
import type { ProjectType } from '../../Types/Enums';

export const useProjects = (
  pageNumber = 1, 
  pageSize = 9, 
  isFeatured?: boolean, 
  skillId?: number, 
  type?: ProjectType
) => {
  return useQuery({
    queryKey: queryKeys.projects.list({ pageNumber, pageSize, isFeatured, skillId, type }),
    queryFn: () => projectService.getProjects(pageNumber, pageSize, isFeatured, skillId, type),
    staleTime: 5 * 60 * 1000, 
  });
};

export const useProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.projects.details(slug),
    queryFn: () => projectService.getProjectBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, 
  });
};