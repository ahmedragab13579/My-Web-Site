import type { ArticleStatus } from "./Enums";

// ==================== Auth Requests ====================
export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// ==================== Contact Messages Requests ====================
export interface ReplyRequest {
  replyContent: string;
}

// ==================== Article Requests ====================
export interface ChangeStatusRequest {
  status: ArticleStatus;
}