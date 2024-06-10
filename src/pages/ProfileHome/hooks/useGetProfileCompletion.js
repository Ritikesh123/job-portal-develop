import { postData } from "@/services/OtherService";
import { useQuery } from "react-query";

const useGetProfileCompletion = (payload) => {
  const {
    data: percent,
    isLoading,
    error,
    refetch,
  } = useQuery(
    "profile-percent",
    () => postData("profile-complete-percentage", payload),
    {
      enabled: false,
    }
  );
  return { percent, isLoading, error, refetch };
};

export default useGetProfileCompletion;
