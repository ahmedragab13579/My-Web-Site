import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { AuthResponseDto } from '../Types/Response';

const BASE_URL = 'https://ahmed-ragab.runasp.net/api';

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

let currentToken: string | null = null;
let onTokenRefreshCallback: ((token: string | null) => void) | null = null;

export const setSharedToken = (token: string | null) => {
  currentToken = token;
};

export const registerTokenRefreshListener = (callback: (token: string | null) => void) => {
  onTokenRefreshCallback = callback;
  return () => {
    if (onTokenRefreshCallback === callback) {
      onTokenRefreshCallback = null;
    }
  };
};

// Request Interceptor to attach JWT token
axiosClient.interceptors.request.use(
  (config) => {
    const token = currentToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Support both lower and upper case API path checks
    const isRefreshRequest = originalRequest.url?.toLowerCase().includes('/auth/refresh');

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshRequest) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers && token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axiosClient.post<AuthResponseDto>('/auth/refresh');
        const { accessToken } = response.data;
        
        // Update local memory token
        setSharedToken(accessToken);
        
        // Notify context
        if (onTokenRefreshCallback) {
          onTokenRefreshCallback(accessToken);
        }
        
        processQueue(null, accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return axiosClient(originalRequest);
      // جوه الـ catch (err) في ملف Interceptor
} catch (err) {
  const axiosError = err as AxiosError;
  
  if (axiosError.response && (axiosError.response.status === 400 || axiosError.response.status === 401)) {
    setSharedToken(null);
    if (onTokenRefreshCallback) {
      onTokenRefreshCallback(null);
    }
  }
  
  processQueue(err as AxiosError, null);
  return Promise.reject(err);
} finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);