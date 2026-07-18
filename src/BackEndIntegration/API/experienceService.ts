import type { ExperienceDto } from "../Types/Response";
import { axiosClient } from "./Shared";

export const experienceService = {
  getExperiences: async () => {
    const response = await axiosClient.get<ExperienceDto[]>('/experience');
    return response.data;
  },

  createExperience: async (command: Record<string, any>) => {
    const response = await axiosClient.post<number>('/experience', command);
    return response.data;
  },

  updateExperience: async (id: number, command: Record<string, any>) => {
    await axiosClient.put(`/experience/${id}`, {...command,id});
  },

  deleteExperience: async (id: number) => {
    await axiosClient.delete(`/experience/${id}`);
  },
};