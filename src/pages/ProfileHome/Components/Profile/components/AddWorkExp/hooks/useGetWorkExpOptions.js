import { useQuery } from "react-query";
import { fetchMasterData } from "@/services/OtherService";

const useGetData = (queryKey, endpoint) => {
  return useQuery(queryKey, () => fetchMasterData(endpoint));
};

const useGetWorkExpOptions = () => {
  const experienceOption = useGetData("experience", "experience-range");

  return {};
};

export default useGetWorkExpOptions;
