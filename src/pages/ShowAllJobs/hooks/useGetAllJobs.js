import { getAllJobs } from "@/services/JobService";
import { useInfiniteQuery } from "react-query";
import { useState, useEffect } from "react";

const useGetAllJobs = (endpoint, payload) => {
  const [jobs, setJobs] = useState([]);
  const queryKey = ["getAllJobs", endpoint, payload?.type, payload];
  const fetchedJob = useInfiniteQuery(
    queryKey,
    ({ pageParam = 0 }) => {
      return getAllJobs(endpoint, { ...payload, offset: pageParam });
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (payload.limit * pages.length < lastPage.totalRecords) {
          return payload.limit * pages.length;
        } else {
          return undefined;
        }
      },
    }
  );
  useEffect(() => {
    if (!fetchedJob?.isLoading) {
      let temp = [];
      fetchedJob?.data?.pages?.forEach((item) => {
        if (item) temp.push(...item?.data);
      });
      setJobs(temp);
    }
  }, [fetchedJob?.data, fetchedJob?.isLoading]);

  return { ...fetchedJob, jobs };
};
export default useGetAllJobs;
