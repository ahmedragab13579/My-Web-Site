import { useQuery } from '@tanstack/react-query';
import { authService } from '../../API/authService';
import { queryKeys } from '../Keys/Keys';

export const useCurrentUser = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: () => authService.getMe(),
    retry: false,
    enabled,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false, 
    refetchOnMount: false,       
  });
};

export const useAdminProfile = (enabled = true) => {
  return useQuery({
    queryKey: queryKeys.auth.profile,
    queryFn: () => authService.getProfile(),
    staleTime: 5 * 60 * 1000,
    retry: false,
    enabled,
    refetchOnWindowFocus: false, 
    refetchOnMount: false,
  });
};