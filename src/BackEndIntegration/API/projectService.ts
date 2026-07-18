import type { ProjectType } from "../Types/Enums";
import type { PagedResult, ProjectDto } from "../Types/Response";
import { axiosClient } from "./Shared";

export const projectService = {
  getProjects: async (
    pageNumber = 1, 
    pageSize = 9, 
    isFeatured?: boolean, 
    skillId?: number, 
    type?: ProjectType
  ) => {
    const response = await axiosClient.get<PagedResult<ProjectDto>>('/project', {
      params: { pageNumber, pageSize, isFeatured, skillId, type },
    });
    return response.data;
  },

  getProjectBySlug: async (slug: string) => {
    const response = await axiosClient.get<ProjectDto>(`/project/${slug}`);
    return response.data;
  },

  createProject: async (command: Record<string, any>) => {
    const response = await axiosClient.post<number>('/project', command);
    return response.data;
  },

  updateProject: async (id: number, command: Record<string, any>) => {
    await axiosClient.put(`/project/${id}`, {...command,id});
  },

  deleteProject: async (id: number) => {
    await axiosClient.delete(`/project/${id}`);
  },

  likeProject: async (id: number) => {
    await axiosClient.post(`/project/${id}/like`);
  },

  viewProject: async (id: number) => {
    await axiosClient.post(`/project/${id}/view`);
  },
};