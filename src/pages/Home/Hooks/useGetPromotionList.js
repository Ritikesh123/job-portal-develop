import { useQuery } from "react-query";
import { fetchMasterData } from "@/services/OtherService";

const useGetPromotionList = () => {
  const { isLoading, error, data } = useQuery(["getPromotionList"], () =>
    fetchMasterData("promotion-list")
  );

  return { isLoading, error, data };
};

export default useGetPromotionList;
