import { useQuery } from "react-query";
import { fetchMasterData } from "@/services/OtherService";

const useGetData = (queryKey, endpoint) => {
  return useQuery(queryKey, () => fetchMasterData(endpoint));
};

const useGetEducationOptions = () => {
  const educationOption = useGetData("education", "get-education-list");

  return { educationOption };
};

export default useGetEducationOptions;
