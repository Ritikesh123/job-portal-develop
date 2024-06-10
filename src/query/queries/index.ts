import { searchJobs } from "@/services/OtherService";
import { useInfiniteQuery } from "react-query";

export const useSearchJobs = (data: {
  userId: string;
  login_token: string;
  jobRole: string;
  city: string;
  limit: number;
  offset: number;
}) => {
  if (!data.jobRole) {
    return { data: [] };
  }
  return useInfiniteQuery(
    ["search", data.jobRole],
    ({ pageParam = 0 }) => searchJobs({ ...data, offset: pageParam }),
    {
      // enabled: false,
      getNextPageParam: (lastPage, pages) => {
        return data.limit * pages.length;
      },
    }
  );
};
