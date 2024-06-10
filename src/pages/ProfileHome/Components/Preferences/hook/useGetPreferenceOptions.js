import { useQuery } from "react-query";
import { fetchMasterData } from "@/services/OtherService";

const useGetData = (queryKey, endpoint) => {
  return useQuery(queryKey, () => fetchMasterData(endpoint));
};

const useGetPreferenceOption = () => {
  const preferedJobOption = useGetData(
    "job-preference",
    "get-job-prefered-list"
  );

  return { preferedJobOption };
};

export default useGetPreferenceOption;
