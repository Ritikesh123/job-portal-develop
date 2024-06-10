import { useQuery } from "react-query";
import { fetchMasterData } from "@/services/OtherService";

const useGetData = (queryKey, endpoint) => {
  return useQuery(queryKey, () => fetchMasterData(endpoint));
};

const useGetSkillsOptions = () => {
  const skillsOption = useGetData("skills", "get-skill-list");

  return { skillsOption };
};

export default useGetSkillsOptions;
