import { useQuery } from "react-query";
import { fetchMasterData } from "@/services/OtherService";

const useGetData = (queryKey, endpoint) => {
  return useQuery(queryKey, () => fetchMasterData(endpoint));
};

const useGetProfileOptions = () => {
  const DIOptions = useGetData("DI", "get-preference-category-list");
  const experienceOption = useGetData("experience", "experience-range");
  const hobbiesOption = useGetData("hobbies", "get-hobbies");

  return {
    DIOptions,
    experienceOption,
    hobbiesOption,
    // citiesOption,
  };
};

export default useGetProfileOptions;
