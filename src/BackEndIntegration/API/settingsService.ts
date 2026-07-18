import type { SiteSettingsDto } from "../Types/Response";
import { axiosClient } from "./Shared";

export const settingsService = {
  getSettings: async () => {
    const response = await axiosClient.get<SiteSettingsDto>('/settings');
    return response.data;
  },

  updateSettings: async (command: Record<string, any>) => {
    await axiosClient.put('/settings', command);
  },
};