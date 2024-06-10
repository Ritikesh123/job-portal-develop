import { getStudentProfile } from "@/services/OtherService";
import { useQuery } from "react-query";

const useGetProfileData = (payload) => {
  const { isLoading, error, data, refetch } = useQuery(
    ["getProfileData", payload],
    () => getStudentProfile(payload)
  );
  return { data, isLoading, refetch, error };
};

export default useGetProfileData;
