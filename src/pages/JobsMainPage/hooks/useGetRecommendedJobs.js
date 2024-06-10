import { getRecommendedJob } from "@/services/OtherService";

import { useQuery } from "react-query";

const useGetRecommendedJobs = (payload) => {
  const { data, isLoading, error } = useQuery(
    ["getRecommendedJobs", payload],
    () => getRecommendedJob(payload)
  );
  return { data, isLoading, error };
};

export default useGetRecommendedJobs;
