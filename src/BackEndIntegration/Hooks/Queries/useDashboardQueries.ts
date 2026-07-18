import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../API/dashboardService';
import { queryKeys } from '../Keys/Keys';

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.summary,
    queryFn: () => dashboardService.getSummary(),
    refetchInterval: 60 * 1000, // تحديث أوتوماتيكي للوحة التحكم كل دقيقة
  });
};
