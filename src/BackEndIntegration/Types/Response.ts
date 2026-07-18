import type { AppMessageCodes, ArticleStatus, MessageStatus, ProjectType, SkillCategory } from "./Enums";

// ==================== Articles ====================
export interface ArticleSkillDto {
  id: number;
  name: string;
  category: SkillCategory;
}

export interface ArticleDto {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImageUrl: string | null;
  readingTimeInMinutes: number;
  viewsCount: number;
  likesCount: number;
  status: ArticleStatus;
  createdAt: string; // ISO Date String
  publishedAt: string | null; // ISO Date String
  updatedAt: string | null; // ISO Date String
  skills: ArticleSkillDto[];
}

// ==================== Auth ====================
export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface GetAdminProfileResponseDto {
  id: number;
  name: string;
  email: string;
  lastLoginAt: string | null; // ISO Date String
}

export interface GetMeResponseDto {
  userId: number;
  email: string | null;
  role: string | null;
  name: string | null;
  isAuthenticated: boolean;
}

// ==================== Contact Messages ====================
export interface ContactMessageDto {
  id: number;
  senderName: string;
  senderEmail: string;
  subject: string;
  content: string;
  isRead: boolean;
  isReplied: boolean;
  status: MessageStatus;
  sentAt: string; // ISO Date String
}

// ==================== Dashboard ====================
export interface TopPerformingItemDto {
  id: number;
  title: string;
  viewsCount: number;
  likesCount: number;
}

export interface DashboardSummaryDto {
  totalProjectViews: number;
  totalArticleViews: number;
  totalLikes: number;
  unreadMessagesCount: number;
  totalProjects: number;
  totalPublishedArticles: number;
  topPerformingProject: TopPerformingItemDto | null;
  topPerformingArticle: TopPerformingItemDto | null;
}
export interface ApiResult<T = void> {
  isSuccess: boolean;
  code: AppMessageCodes;
  error: string;
  data: T;
}

// الباكيجند بيرجع PagedResult بالشكل ده بالضبط
export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
// ==================== Experiences ====================
export interface ExperienceDto {
  id: number;
  title: string;
  organization: string;
  location: string | null;
  description: string;
  startDate: string; // ISO Date String
  endDate: string | null; // ISO Date String
  isCurrent: boolean;
}

// ==================== Projects ====================
export interface ProjectImageDto {
  id: number;
  imageUrl: string;
  caption: string | null;
  displayOrder: number;
}

export interface ProjectSkillDto {
  id: number;
  name: string;
  category: SkillCategory;
}

export interface ProjectDto {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  thumbnailUrl: string;
  liveDemoUrl: string | null;
  githubUrl: string | null;
  isFeatured: boolean;
  displayOrder: number;
  viewsCount: number;
  likesCount: number;
  type: ProjectType;
  createdAt: string; // ISO Date String
  updatedAt: string | null; // ISO Date String
  gallery: ProjectImageDto[];
  skills: ProjectSkillDto[];
}

// ==================== Settings ====================
export interface SiteSettingsDto {
  siteTitle: string;
  heroSubtitle: string;
  aboutMeText: string;
  resumeUrl: string | null;
  contactEmail: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
}

// ==================== Skills ====================
export interface SkillDetailsDto {
  id: number;
  name: string;
  category: SkillCategory;
  displayOrder: number;
  iconUrl: string | null;
}

// ==================== Uploads ====================
export interface UploadImageResponseDto {
  url: string;
  fileName: string;
  sizeInBytes: number;
  publicId: string;
}