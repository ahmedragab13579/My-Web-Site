export const queryKeys = {
  articles: {
    all: ['articles'] as const,
    list: (pageNumber: number, pageSize: number) => ['articles', 'list', pageNumber, pageSize] as const,
    adminList: (pageNumber: number, pageSize: number, status?: any) => ['articles', 'adminList', pageNumber, pageSize, status] as const,
    details: (slug: string) => ['articles', 'details', slug] as const,
  },
  projects: {
    all: ['projects'] as const,
    list: (params: any) => ['projects', 'list', params] as const,
    details: (slug: string) => ['projects', 'details', slug] as const,
  },
  skills: {
    all: ['skills'] as const,
    list: (category?: any) => ['skills', 'list', category] as const,
  },
  experiences: {
    all: ['experiences'] as const,
  },
  contact: {
    all: ['contact'] as const,
    list: (params: any) => ['contact', 'list', params] as const,
  },
  dashboard: {
    summary: ['dashboard', 'summary'] as const,
  },
  settings: {
    all: ['settings'] as const,
  },
  auth: {
    me: ['auth', 'me'] as const,
    profile: ['auth', 'profile'] as const,
  },
};