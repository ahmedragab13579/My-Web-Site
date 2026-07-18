import type { SkillCategory } from "../Types/Enums";
import type { SkillDetailsDto } from "../Types/Response";
import { axiosClient } from "./Shared";

export const skillService = {
  getSkills: async (category?: SkillCategory) => {
    const response = await axiosClient.get<SkillDetailsDto[]>('/skill', {
      params: { category },
    });
    return response.data;
  },

  createSkill: async (command: Record<string, any>) => {
    const response = await axiosClient.post<number>('/skill', command);
    return response.data;
  },

  updateSkill: async (id: number, command: Record<string, any>) => {
    await axiosClient.put(`/skill/${id}`, {...command,id});
  },

  deleteSkill: async (id: number) => {
    await axiosClient.delete(`/skill/${id}`);
  },
};