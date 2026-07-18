import type{ AuthResponseDto, GetAdminProfileResponseDto, GetMeResponseDto } from '../Types/Response';
import type { 
  LoginRequest, 
  ForgotPasswordRequest, 
  ResetPasswordRequest, 
  ChangePasswordRequest 
} from '../Types/Request';
import { axiosClient } from './Shared';

export const authService = {
  login: async (request: LoginRequest) => {
    const response = await axiosClient.post<AuthResponseDto>('/auth/login', request);
    return response.data;
  },

  refresh: async () => {
    const response = await axiosClient.post<AuthResponseDto>('/auth/refresh');
    return response.data;
  },

  logout: async () => {
    await axiosClient.post('/auth/logout');
  },

  forgotPassword: async (request: ForgotPasswordRequest) => {
    await axiosClient.post('/auth/forgot-password', request);
  },

  resetPassword: async (request: ResetPasswordRequest) => {
    await axiosClient.post('/auth/reset-password', request);
  },

  changePassword: async (request: ChangePasswordRequest) => {
    await axiosClient.post('/auth/change-password', request);
  },

  getMe: async () => {
    const response = await axiosClient.get<GetMeResponseDto>('/auth/me');
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosClient.get<GetAdminProfileResponseDto>('/auth/profile');
    return response.data;
  },
};