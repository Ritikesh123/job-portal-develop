import { useQuery } from "react-query";
import { getStudentProfile } from "@/services/OtherService";

const useGetOverview = (payload) => {
  const { isLoading, error, data } = useQuery(["getOverview", payload], () =>
    getStudentProfile(payload)
  );

  return { isLoading, error, data };
};

export default useGetOverview;
