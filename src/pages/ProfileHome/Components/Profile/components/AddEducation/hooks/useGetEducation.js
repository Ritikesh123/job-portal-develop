import { getStudentProfile } from "@/services/OtherService";
import { useQuery } from "react-query";

const useGetEducation = (payload) => {
  const { isLoading, error, data, refetch } = useQuery(
    ["getEducation", payload],
    () => getStudentProfile(payload)
  );
  return { data, isLoading, refetch, error };
};

export default useGetEducation;
