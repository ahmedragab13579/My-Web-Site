import type { DashboardSummaryDto } from "../Types/Response";
import { axiosClient } from "./Shared";

export const dashboardService = {
  getSummary: async () => {
    const response = await axiosClient.get<DashboardSummaryDto>('/dashboard/summary');
    return response.data;
  },
};