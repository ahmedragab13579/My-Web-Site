import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../API/authService';
import { queryKeys } from '../Keys/Keys';
import type { 
  LoginRequest, 
  ForgotPasswordRequest, 
  ResetPasswordRequest, 
  ChangePasswordRequest 
} from '../../Types/Request';

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: LoginRequest) => authService.login(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear(); // مسح كل الكاش عند تسجيل الخروج
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (request: ForgotPasswordRequest) => authService.forgotPassword(request),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (request: ResetPasswordRequest) => authService.resetPassword(request),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (request: ChangePasswordRequest) => authService.changePassword(request),
  });
};
